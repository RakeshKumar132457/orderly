import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntityService } from '../../services/entity.service';
import { Entity } from '../../interfaces/entity.interfaces';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entity-list.component.html'
})
export class EntityListComponent implements OnInit {
  entities: Entity[] = [];
  isLoading = false;
  error: string | null = null;
  showDialog = false;
  isSubmitting = false;
  selectedEntity: Entity | null = null;
  entityForm: FormGroup;

  constructor(
    private entityService: EntityService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {
    this.entityForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEntities();
  }

  loadEntities(): void {
    this.isLoading = true;
    this.entityService.getEntities().subscribe({
      next: (response) => {
        this.entities = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
        this.errorService.showError('Failed to load entities');
      }
    });
  }

  openCreateDialog(): void {
    this.selectedEntity = null;
    this.entityForm.reset();
    this.showDialog = true;
  }

  openEditDialog(entity: Entity): void {
    this.selectedEntity = entity;
    this.entityForm.patchValue({
      name: entity.name
    });
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedEntity = null;
    this.entityForm.reset();
  }

  onSubmit(): void {
    if (this.entityForm.valid) {
      this.isSubmitting = true;
      const formData = this.entityForm.value;

      const request = this.selectedEntity
        ? this.entityService.updateEntity(this.selectedEntity.id, formData)
        : this.entityService.createEntity(formData);

      request.subscribe({
        next: () => {
          this.loadEntities();
          this.closeDialog();
          this.isSubmitting = false;
          this.errorService.showInfo(
            `Entity successfully ${this.selectedEntity ? 'updated' : 'created'}`
          );
        },
        error: (error) => {
          this.errorService.showError(
            `Failed to ${this.selectedEntity ? 'update' : 'create'} entity`
          );
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteEntity(id: string): void {
    if (confirm('Are you sure you want to delete this entity?')) {
      this.entityService.deleteEntity(id).subscribe({
        next: () => {
          this.loadEntities();
          this.errorService.showInfo('Entity successfully deleted');
        },
        error: (error) => {
          this.errorService.showError('Failed to delete entity');
        }
      });
    }
  }
}