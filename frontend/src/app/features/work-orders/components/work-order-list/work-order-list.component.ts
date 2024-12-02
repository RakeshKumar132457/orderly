import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkOrderService } from '../../services/work-order.service';
import { ContractorService } from '../../../contractors/services/contractor.service';
import { LocationService } from '../../../locations/services/location.service';
import { WorkOrder, WorkOrderLocation } from '../../interfaces/work-order.interfaces';
import { Contractor } from '../../../contractors/interfaces/contractor.interfaces';
import { Location } from '../../../locations/interfaces/location.interfaces';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-work-order-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work-order-list.component.html'
})
export class WorkOrderListComponent implements OnInit {
  workOrders: WorkOrder[] = [];
  contractors: Contractor[] = [];
  availableLocations: Location[] = [];
  isLoading = false;
  error: string | null = null;
  showDialog = false;
  isSubmitting = false;
  selectedWorkOrder: WorkOrder | null = null;
  workOrderForm: FormGroup;

  constructor(
    private workOrderService: WorkOrderService,
    private contractorService: ContractorService,
    private locationService: LocationService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {
    this.workOrderForm = this.fb.group({
      contractorId: ['', Validators.required],
      paymentTerms: ['', [Validators.required, Validators.min(0)]],
      dueDate: ['', Validators.required],
      locations: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadWorkOrders();
    this.loadContractors();
    this.loadLocations();
  }

  get locationControls() {
    return (this.workOrderForm.get('locations') as FormArray).controls;
  }

  get locationsFormArray() {
    return this.workOrderForm.get('locations') as FormArray;
  }

  loadWorkOrders(): void {
    this.isLoading = true;
    this.workOrderService.getWorkOrders().subscribe({
      next: (response) => {
        this.workOrders = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
        this.errorService.showError('Failed to load work orders');
      }
    });
  }

  loadContractors(): void {
    this.contractorService.getContractors().subscribe({
      next: (response) => {
        this.contractors = response.data;
      },
      error: (error) => {
        this.errorService.showError('Failed to load contractors');
      }
    });
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (response) => {
        this.availableLocations = response.data.filter(loc => loc.state === 'READY');
      },
      error: (error) => {
        this.errorService.showError('Failed to load locations');
      }
    });
  }

  createLocationFormGroup() {
    return this.fb.group({
      locationId: ['', Validators.required],
      rate: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addLocation(): void {
    this.locationsFormArray.push(this.createLocationFormGroup());
  }

  removeLocation(index: number): void {
    this.locationsFormArray.removeAt(index);
  }

  openCreateDialog(): void {
    this.selectedWorkOrder = null;
    this.workOrderForm.reset();
    this.locationsFormArray.clear();
    this.addLocation(); // Add at least one location
    this.showDialog = true;
  }

  openEditDialog(workOrder: WorkOrder): void {
    this.selectedWorkOrder = workOrder;
    this.locationsFormArray.clear();

    this.workOrderForm.patchValue({
      contractorId: workOrder.contractorId,
      paymentTerms: workOrder.paymentTerms,
      dueDate: new Date(workOrder.dueDate).toISOString().split('T')[0]
    });

    workOrder.locations.forEach(location => {
      this.locationsFormArray.push(this.fb.group({
        locationId: [location.locationId, Validators.required],
        rate: [location.rate, [Validators.required, Validators.min(0)]],
        quantity: [location.quantity, [Validators.required, Validators.min(1)]]
      }));
    });

    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedWorkOrder = null;
    this.workOrderForm.reset();
    this.locationsFormArray.clear();
  }

  onSubmit(): void {
    if (this.workOrderForm.valid) {
      this.isSubmitting = true;
      const formData = this.workOrderForm.value;

      // Ensure the date is in ISO format
      formData.dueDate = new Date(formData.dueDate).toISOString();

      const request = this.selectedWorkOrder
        ? this.workOrderService.updateWorkOrder(this.selectedWorkOrder.id, formData)
        : this.workOrderService.createWorkOrder(formData);

      request.subscribe({
        next: () => {
          this.loadWorkOrders();
          this.closeDialog();
          this.isSubmitting = false;
          this.errorService.showInfo(
            `Work order successfully ${this.selectedWorkOrder ? 'updated' : 'created'}`
          );
        },
        error: (error) => {
          this.errorService.showError(
            `Failed to ${this.selectedWorkOrder ? 'update' : 'create'} work order`
          );
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteWorkOrder(id: string): void {
    if (confirm('Are you sure you want to delete this work order?')) {
      this.workOrderService.deleteWorkOrder(id).subscribe({
        next: () => {
          this.loadWorkOrders();
          this.errorService.showInfo('Work order successfully deleted');
        },
        error: (error) => {
          this.errorService.showError('Failed to delete work order');
        }
      });
    }
  }
}