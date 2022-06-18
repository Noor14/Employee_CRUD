import { PlatformLocation } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { convertObjectToQueryString, pagination } from 'src/app/constants/lib';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employeeList: any[];
  public page = pagination.page;
  public pageSize: any = pagination.limit;
  public totalEmployees:number;
  public pagination = {
    _limit: pagination.limit,
    _page: pagination.page
  }
  private searchObject: any;
  public employeeSearchReset: boolean = false;
  public perPage: string = pagination.limit;
  constructor(
    private readonly _modalService: NgbModal,
    private readonly _toastr: ToastrService,
    private readonly _location: PlatformLocation,
    private readonly _employeeService: EmployeeService) {
      this._location.onPopState(() => this._modalService.dismissAll())
    }

  ngOnInit(): void {
    this.getAllEmployee(this.pagination);
  }

  getAllEmployee(obj: any){
    this.perPage = this.pageSize = obj._limit;
    const queryString = convertObjectToQueryString(obj);
    this._employeeService.retrieveAllRecords(queryString).subscribe({
      next: (res: any) => {
       this.totalEmployees = res.allEmployees.length;
       this.employeeList = res.employees.length && res.employees.sort((objA:any, objB: any) => objB?.id - objA?.id) || [];
       this.page = 1;
      },
      error: (error: HttpErrorResponse) => {
        this._toastr.error('Error: Please try again later');
      }
    });
  }
  resetEmployeeSearch(): void{
    this.searchObject = null;
    this.getAllEmployee(this.pagination);
  }

  searchEmployee(obj?: any, limit: any = pagination.limit){
    let queryString;
    if(obj){
      this.searchObject = obj;
      queryString = convertObjectToQueryString(obj);
    }
    const filteredQueryString = convertObjectToQueryString({
        _limit: limit,
        _page: pagination.page,
        ...obj
    });
    this.page = 1;
    this._employeeService.retrieveFilteredRecords(queryString, filteredQueryString).subscribe({
      next: (res: any) => {
       this.totalEmployees = res.allEmployees.length;
       this.employeeList = res.employees.length && res.employees.sort((objA:any, objB: any) => objB?.id - objA?.id) || [];
      },
      error: (error: HttpErrorResponse) => {
        this._toastr.error('Error: Please try again later');
      }
    })
  }

  getEmployeeByCriteria(obj?: any){
    const object = {
      _limit: pagination.limit,
      _page: pagination.page,
      ...(obj && obj),
      ...(this.searchObject && this.searchObject)
    }
    const queryString = convertObjectToQueryString(object);
    this._employeeService.getEmployeesByFilter(queryString).subscribe(
      {
        next: (res: any) => {
          this.employeeList = res.length && res.sort((objA:any, objB: any) => objB?.id - objA?.id) || [];
        },
        error: (error: HttpErrorResponse) => {
         this._toastr.error('Error: Please try again later');
        }
    });
  }

  limitChange(value: string): void{
    this.searchEmployee(this.searchObject, value)
    this.pageSize = value;
    this.page = 1;
  }

  paginate(){
    const obj = {
      _page: this.page,
    };
    this.getEmployeeByCriteria(obj);
  }


  openDialog(id: number): void{
    const modalRef = this._modalService.open(ConfirmDialogComponent, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
    modalRef.componentInstance.data = {
      title: 'Confirmation',
      message: 'Are you sure, You want to delete this employee?',
    };
    modalRef.result.then(
      (res) => {
        if (res) {
          this.removeEmployee(id);
        }
      },(reason) => {
        console.log(reason);
      });
  }

  removeEmployee(id: number): void{
    this._employeeService.deleteEmployee(id).subscribe({
      next: () => {
        if(this.searchObject){
          this.employeeSearchReset = true;
        }
        this.resetEmployeeSearch()
        this._toastr.success('Deleted successfully')
      },
      error: (error: HttpErrorResponse) => {
        this._toastr.error('Error: Please try again later');
      }
    })
  }

}
