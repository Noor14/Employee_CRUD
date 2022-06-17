import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit, OnChanges {
  public employeeSearchForm: FormGroup;
  @Output() readonly search = new EventEmitter<any>();
  @Output() readonly resetSearch = new EventEmitter<any>();
  @Input('searchFormReset') resetForm: boolean = false;
  
  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.employeeSearchForm = this._formBuilder.group({
      email: [],
      company: [],
      fullName: [],
    })
  }

  ngOnChanges(): void{
    if(this.resetForm){
      console.log(this.resetForm);
      this.employeeSearchForm.reset()
    }
  }
  submit(): void{
    this.search.emit(this.employeeSearchForm.value)
  }
  reset(): void{
    this.employeeSearchForm.reset();
    this.resetSearch.emit();
  }
}
