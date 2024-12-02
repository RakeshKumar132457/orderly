import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Location } from '../../interfaces/location.interfaces';
import { ErrorService } from '../../../../core/services/error.service';
import { EntityService } from '../../../entities/services/entity.service';
import { Entity } from '../../../entities/interfaces/entity.interfaces';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  entities: Entity[] = [];
  isLoading = false;
  error: string | null = null;
  showDialog = false;
  isSubmitting = false;
  selectedLocation: Location | null = null;
  locationForm: FormGroup;

  constructor(
    private locationService: LocationService,
    private entityService: EntityService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      entityId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLocations();
    this.loadEntities();
  }

  loadLocations(): void {
    this.isLoading = true;
    this.locationService.getLocations().subscribe({
      next: (response) => {
        this.locations = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
        this.errorService.showError('Failed to load locations');
      }
    });
  }

  loadEntities(): void {
    this.entityService.getEntities().subscribe({
      next: (response) => {
        this.entities = response.data;
      },
      error: (error) => {
        this.errorService.showError('Failed to load entities');
      }
    });
  }

  openCreateDialog(): void {
    this.selectedLocation = null;
    this.locationForm.reset();
    this.showDialog = true;
  }

  openEditDialog(location: Location): void {
    this.selectedLocation = location;
    this.locationForm.patchValue({
      name: location.name,
      entityId: location.entityId
    });
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedLocation = null;
    this.locationForm.reset();
  }

  onSubmit(): void {
    if (this.locationForm.valid) {
      this.isSubmitting = true;
      const formData = this.locationForm.value;

      const request = this.selectedLocation
        ? this.locationService.updateLocation(this.selectedLocation.id, formData)
        : this.locationService.createLocation(formData);

      request.subscribe({
        next: () => {
          this.loadLocations();
          this.closeDialog();
          this.isSubmitting = false;
          this.errorService.showInfo(
            `Location successfully ${this.selectedLocation ? 'updated' : 'created'}`
          );
        },
        error: (error) => {
          this.errorService.showError(
            `Failed to ${this.selectedLocation ? 'update' : 'create'} location`
          );
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteLocation(id: string): void {
    if (confirm('Are you sure you want to delete this location?')) {
      this.locationService.deleteLocation(id).subscribe({
        next: () => {
          this.loadLocations();
          this.errorService.showInfo('Location successfully deleted');
        },
        error: (error) => {
          this.errorService.showError('Failed to delete location');
        }
      });
    }
  }

  markAsComplete(location: Location): void {
    if (confirm('Are you sure you want to mark this location as complete?')) {
      this.locationService.markAsComplete(location.id).subscribe({
        next: () => {
          this.loadLocations();
          this.errorService.showInfo('Location marked as complete');
        },
        error: (error) => {
          this.errorService.showError('Failed to mark location as complete');
        }
      });
    }
  }
}