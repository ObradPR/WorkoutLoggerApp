import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MeasurementsComponent } from './measurements.component';
import { AppRoutingModule } from '../routes/app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MeasurementsChartComponent } from './measurements-chart/measurements-chart.component';
import { UserMeasurementsComponent } from './user-measurements/user-measurements.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';



@NgModule({
  declarations: [
    MeasurementsComponent,
    MeasurementsChartComponent,
    UserMeasurementsComponent,
    AddMeasurementComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MeasurementsModule { }
