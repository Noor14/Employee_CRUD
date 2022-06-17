import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { PageNotFoundModule } from 'src/app/components/page-not-found/page-not-found.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesModule } from '../../components/validation-messages/validation-messages.module';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeSearchComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgbModule,
    PageNotFoundModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationMessagesModule
  ]
})
export class EmployeeModule { }
