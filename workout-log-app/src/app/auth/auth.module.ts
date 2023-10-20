import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../routes/app-routing.module';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ContactComponent } from './login-register/contact/contact.component';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';



@NgModule({
  declarations: [
    LoginRegisterComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class AuthModule { }
