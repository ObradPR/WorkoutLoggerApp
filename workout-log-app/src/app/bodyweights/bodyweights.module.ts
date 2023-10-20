import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../routes/app-routing.module';
import { BodyweightsComponent } from './bodyweights.component';
import { UserWeightsComponent } from './user-weights/user-weights.component';
import { SharedModule } from '../shared/shared.module';
import { UserAverageStatsComponent } from './user-average-stats/user-average-stats.component';
import { BodyweightChartComponent } from './bodyweight-chart/bodyweight-chart.component';




@NgModule({
  declarations: [
    BodyweightsComponent,
    UserWeightsComponent,
    UserAverageStatsComponent,
    BodyweightChartComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: []
})
export class BodyweightsModule { }
