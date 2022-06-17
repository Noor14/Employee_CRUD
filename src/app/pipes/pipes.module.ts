import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderPipe } from './gender.pipe';
import { ReplaceByPipe } from './replace-by.pipe';



@NgModule({
  declarations: [GenderPipe, ReplaceByPipe],
  exports: [GenderPipe, ReplaceByPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
