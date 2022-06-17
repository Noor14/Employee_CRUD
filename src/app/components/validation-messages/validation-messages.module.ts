import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './validation-messages.component';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    ValidationMessagesComponent
  ],
  exports: [
    ValidationMessagesComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class ValidationMessagesModule { }
