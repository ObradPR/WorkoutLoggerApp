import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExercisesMainComponent } from './exercises-main/exercises-main.component';



@NgModule({
  declarations: [
    ExercisesMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ExercisesModule { }
