import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../routes/app-routing.module';

import { WorkoutsMainComponent } from './workouts-main/workouts-main.component';
import { WorkoutsListComponent } from './workouts-main/workouts-list/workouts-list.component';
import { AddWorkoutsComponent } from './workouts-main/add-workouts/add-workouts.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutResolver } from '../services/workout-resolver.service';
import { EditWorkoutComponent } from './workout/edit-workout/edit-workout.component';
import { AddExerciseModalComponent } from './workout/add-exercise-modal/add-exercise-modal.component';
import { AddSetModalComponent } from './workout/add-set-modal/add-set-modal.component';
import { EditSetModalComponent } from './workout/edit-set-modal/edit-set-modal.component';
import { WorkoutsResolver } from '../services/workouts-resolver.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WorkoutsMainComponent,
    WorkoutsListComponent,
    AddWorkoutsComponent,
    WorkoutComponent,
    EditWorkoutComponent,
    AddExerciseModalComponent,
    AddSetModalComponent,
    EditSetModalComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [WorkoutResolver, WorkoutsResolver],
})
export class WorkoutsModule {}
