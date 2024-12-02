import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractorService } from '../../services/contractor.service';
import { Contractor } from '../../interfaces/contractor.interfaces';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-contractor-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contractor-list.component.html'
})
export class ContractorListComponent implements OnInit {
  contractors: Contractor[] = [];
  isLoading = false;
  error: string | null = null;
  showDialog = false;
  isSubmitting = false;
  selectedContractor: Contractor | null = null;
  contractorForm: FormGroup;

  constructor(
    private contractorService: ContractorService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {
    this.contractorForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadContractors();
  }

  loadContractors(): void {
    this.isLoading = true;
    this.contractorService.getContractors().subscribe({
      next: (response) => {
        this.contractors = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
        this.errorService.showError('Failed to load contractors');
      }
    });
  }

  openCreateDialog(): void {
    this.selectedContractor = null;
    this.contractorForm.reset();
    this.showDialog = true;
  }

  openEditDialog(contractor: Contractor): void {
    this.selectedContractor = contractor;
    this.contractorForm.patchValue({
      name: contractor.name,
      phone: contractor.phone
    });
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedContractor = null;
    this.contractorForm.reset();
  }

  onSubmit(): void {
    if (this.contractorForm.valid) {
      this.isSubmitting = true;
      const formData = this.contractorForm.value;

      const request = this.selectedContractor
        ? this.contractorService.updateContractor(this.selectedContractor.id, formData)
        : this.contractorService.createContractor(formData);

      request.subscribe({
        next: () => {
          this.loadContractors();
          this.closeDialog();
          this.isSubmitting = false;
          this.errorService.showInfo(
            `Contractor successfully ${this.selectedContractor ? 'updated' : 'created'}`
          );
        },
        error: (error) => {
          this.errorService.showError(
            `Failed to ${this.selectedContractor ? 'update' : 'create'} contractor`
          );
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteContractor(id: string): void {
    if (confirm('Are you sure you want to delete this contractor?')) {
      this.contractorService.deleteContractor(id).subscribe({
        next: () => {
          this.loadContractors();
          this.errorService.showInfo('Contractor successfully deleted');
        },
        error: (error) => {
          this.errorService.showError('Failed to delete contractor');
        }
      });
    }
  }
}