import { Component , inject} from "@angular/core";
import { Employee } from '../../services/types/Employee';
import '@angular/localize/init';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CreateFormGroupArgs, KENDO_GRID } from "@progress/kendo-angular-grid";
import { KENDO_DIALOG } from "@progress/kendo-angular-dialog";
import {
  cancelIcon,
  pencilIcon,
  plusIcon,
  saveIcon,
  SVGIcon,
  trashIcon,
} from "@progress/kendo-svg-icons";
import { RouterOutlet } from "@angular/router";
import { EmployeeServiceService } from '../../services/employee-service.service';
import e from "express";
import { get } from "http";
import { Observable, Subject } from "rxjs";
import { KENDO_BUTTONS, } from "@progress/kendo-angular-buttons";

@Component({
  selector: 'app-employepage',
  standalone: true,
  imports: [ReactiveFormsModule, KENDO_GRID, KENDO_DIALOG, KENDO_BUTTONS],
  template: `
    <h4>Employee Management</h4>
    <p>Manage your employees using the grid below.</p>

    <kendo-grid
      [kendoGridReactiveEditing]="createFormGroup"
      [kendoGridBinding]="employees"
      [removeConfirmation]="removeConfirmation"
      [pageSize]="5"
      [pageable]="true"
      [sortable]="true"
      [navigable]="true"
    >
      <ng-template kendoGridToolbarTemplate>
        <button kendoGridAddCommand [svgIcon]="svgAdd">Add new</button>
      </ng-template>
      <kendo-grid-column
        field="firstName"
        title="First Name"
      ></kendo-grid-column>
      <kendo-grid-column
        field="lastName"
        title="Last Name"
      ></kendo-grid-column>
      <kendo-grid-column
        field="email"
        title="Email"
      ></kendo-grid-column>
      <kendo-grid-command-column [width]="220">
        <ng-template kendoGridCellTemplate let-isNew="isNew">
          <button kendoGridEditCommand [primary]="true" >Edit</button>
          <button kendoGridRemoveCommand>Remove</button>
          <button kendoGridSaveCommand  (click)="Save(isNew)" [disabled]="formGroup.invalid">
            {{ isNew ? "Add" : "Update" }}
          </button>
          <button kendoGridCancelCommand>
            {{ isNew ? "Discard changes" : "Cancel" }}
          </button>
        </ng-template>
      </kendo-grid-command-column>
    </kendo-grid>
      @if (itemToRemove) {
    <kendo-dialog title="Please confirm" (close)="confirmRemove(false)">
      <p style="margin: 30px; text-align: center;">
        Are you sure you want to delete product {{ itemToRemove.email }}?
      </p>
      <kendo-dialog-actions>
        <button kendoButton (click)="confirmRemove(false)">No</button>
        <button
          kendoButton
          themeColor="primary"
          (click)="confirmRemove(true)"
          [primary]="true"
        >
          Yes
        </button>
      </kendo-dialog-actions>
    </kendo-dialog>
      }
  `,
})
export class EmployepageComponent {
  public employees: Employee[] = [];
  public itemToRemove: Employee | null = null;
  public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();

  public svgAdd: SVGIcon = plusIcon;
  public svgEdit: SVGIcon = pencilIcon;
  public svgRemove: SVGIcon = trashIcon;
  public svgSave: SVGIcon = saveIcon;
  public svgCancel: SVGIcon = cancelIcon;
  public formBuilder = new FormBuilder();


  private employeeApi = inject(EmployeeServiceService);


  constructor(formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
    this.formBuilder = formBuilder;
    this.fetchEmployees();
  }

  public formGroup: FormGroup = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  });


  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? {} as Employee : args.dataItem;

    this.formGroup = this.formBuilder.group({
      firstName: [item.firstName, Validators.required],
      lastName: [item.lastName, Validators.required],
      email: [item.email, [Validators.required, Validators.email]],
    });
    return this.formGroup;
  }


   public fetchEmployees() {
    this.employeeApi.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error("Error fetching employees", error);
      },
    });
  }
  
  public Save(isNew : boolean) {
    console.log("Adding = true, updating = false", isNew);

    if (isNew) {
      this.employeeApi.addEmployee(this.formGroup.value).subscribe({
        next: (data) => {
          console.log("Employee added successfully", data);
        },
        error: (error) => {
          console.error("Error adding employee", error);
        },
      });
  }
    else {
        this.employeeApi.updateEmployee(this.formGroup.value).subscribe({
        next: (data) => {
          console.log("Employee updated successfully", data);
        },
        error: (error) => {
          console.error("Error adding employee", error);
        },
      });
    }
}
  
   public OnRemove(dataItem: Employee) {
    console.log("Removing employee", dataItem);
    this.employeeApi.deleteEmployeeByEmail(dataItem).subscribe({
      next: (data) => {
        console.log("Employee removed successfully", data);
      },
      error: (error) => {
        console.error("Error removing employee", error);
      },
    }); 
  }

    public confirmRemove(shouldRemove: boolean): void {
    this.removeConfirmationSubject.next(shouldRemove);
    if (shouldRemove && this.itemToRemove) {
      this.OnRemove(this.itemToRemove);
    }
    this.itemToRemove = null;
  }

  public removeConfirmation = (dataItem: Employee): Subject<boolean> => {
    this.itemToRemove = dataItem;

    return this.removeConfirmationSubject;
  }
}
