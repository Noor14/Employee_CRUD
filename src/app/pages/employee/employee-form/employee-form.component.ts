import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, filter, tap, map } from 'rxjs';
import { regexPattern, validateAllFormFields } from '../../../constants/lib';
import { EmployeeService } from '../employee.service';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
const now = moment();

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  public alphaRegex = regexPattern.alphaRegex
  public employeeForm: FormGroup;
  private _unsubscribeAll: Subject<void>;
  public employeeId: number;
  public maxDate: NgbDateStruct = { year: now.year(), month: now.month() + 1, day: now.date()};
  public minDate: NgbDateStruct = { year: now.year()-30, month: 1, day: 1};
  public employeeFound: boolean | undefined;
  constructor(
    private readonly _employeeService: EmployeeService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _toastr: ToastrService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder) { 
      this._unsubscribeAll = new Subject();
    }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      filter((res: any) => !!res && res?.id),
      map((res:any) => res.id),
      tap((id: number) => {
        this.employeeId = id;
        this.employeeById(id)
      }),
      takeUntil(this._unsubscribeAll)
     )
     .subscribe();

    // Create Employee Form When you need to create a new record
    !this.employeeId && this.createEmployeeForm();
  }

  // get Employee Detail By ID
  employeeById(id: number): void{
    this._employeeService.getEmployeeById(id).subscribe({
      next: (res: any) => {
        this.employeeFound = true;
        // Create Employee Form When you checked employee is exist
        this.createEmployeeForm();
        res.dob = {
          year: moment(res.dob).year(), 
          month: moment(res.dob).month()+1, 
          day: moment(res.dob).date() 
        }
        this.employeeForm.patchValue(res);
      },
      error: (error: HttpErrorResponse) => {
        (error.status == 404)? this.employeeFound = false : 
        this._toastr.error('Error: Please try again later');
      }
    })
  }

  // create Employee Form
  createEmployeeForm(): void{
    this.employeeForm = this._formBuilder.group({
      dob: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(regexPattern.emailRegex)]],
      phone: ['', [Validators.required]],
      gender: [true, [Validators.required]],
      company: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.pattern(regexPattern.alphaRegex)]],
      position: ['', [Validators.required]]
    })
  }

  submit(): void{
    if(this.employeeForm.valid){
      const date = `${this.employeeForm.value.dob.day}/${this.employeeForm.value.dob.month}/${this.employeeForm.value.dob.year}`;
      const obj = {
        ...this.employeeForm.value,
        dob: moment(date, "DD/MM/YYYY")
      }
      this.employeeId? this.updateEmployee(obj): this.createEmployee(obj);
    }else{
      validateAllFormFields(this.employeeForm)
    }
  }

  // update employee Record
  updateEmployee(obj: any): void{
    this._employeeService.updateEmployee(obj, this.employeeId).subscribe({
      next: (res: any) => {
        this.employeeForm.reset();
        this._toastr.success('Updated successfully');
        this._router.navigate(['/employee-list']);
      },
      error: (error: HttpErrorResponse) => {
        this._toastr.error('Error: Please try again later');
      }
    })
  }

  // Create new employee Record
  createEmployee(obj: any): void{
    this._employeeService.addEmployee(obj).subscribe({
      next: (res: any) => {
        this.employeeForm.reset();
        this._toastr.success('Added successfully');
        this._router.navigate(['/employee-list']);
      },
      error: (error: HttpErrorResponse) => {
        this._toastr.error('Error: Please try again later');
      }
    })
  }
  ngOnDestroy(): void{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
