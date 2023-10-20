import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routes/app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { BodyweightsModule } from './bodyweights/bodyweights.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ExercisesModule } from './exercises/exercises.module';
import { MeasurementsModule } from './measurements/measurements.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    WorkoutsModule,
    ExercisesModule,
    BodyweightsModule,
    MeasurementsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
