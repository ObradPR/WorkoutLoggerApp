import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { HomePageComponent } from '../home/home-page/home-page.component';
import { LoginRegisterComponent } from '../auth/login-register/login-register.component';
import { WorkoutsMainComponent } from '../workouts/workouts-main/workouts-main.component';
import { WorkoutComponent } from '../workouts/workout/workout.component';
import { WorkoutResolver } from '../services/workout-resolver.service';
import { WorkoutsResolver } from '../services/workouts-resolver.service';
import { ExercisesMainComponent } from '../exercises/exercises-main/exercises-main.component';
import { BodyweightsComponent } from '../bodyweights/bodyweights.component';
import { MeasurementsComponent } from '../measurements/measurements.component';
import { AuthGuard } from '../services/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'account', component: LoginRegisterComponent },
  {
    path: 'workouts',
    component: WorkoutsMainComponent,
    resolve: { workouts: WorkoutsResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'workouts/:id',
    component: WorkoutComponent,
    resolve: { workout: WorkoutResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'exercises',
    component: ExercisesMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bodyweights',
    component: BodyweightsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'measurements',
    component: MeasurementsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
