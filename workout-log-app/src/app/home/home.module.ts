import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../routes/app-routing.module';

import { AdvertisementComponent } from './advertisement/advertisement.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogButtonsComponent } from './log-buttons/log-buttons.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdvertisementComponent,
    HomePageComponent,
    LogButtonsComponent,
    UserInfoComponent,
    WelcomeMessageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
