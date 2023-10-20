import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passInput: ElementRef;
  @ViewChild('eyeIcon') eyeIcon: ElementRef;
  @ViewChild('loginMessage') logMessage: ElementRef; 
  loginForm: FormGroup;

  userData: {};

  constructor(
    private userService: UserService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    this.userData = this.loginForm.value;
    this.userService.getUser(this.userData).subscribe((response: any) => {
      if(response.user){ 
        console.log(response);     
        const idUser = response.user.id_user;
        this.userService.setServiceUserId(idUser);
        const userInfo = response.user;
        this.userService.setServiceUserInfo(userInfo);

        // Setting account identifier in localstorage
        this.userService.setUserInLS(response.user.username);
      }

      this.logMessage.nativeElement.innerText = response.message;

      setTimeout(() => {
        this.logMessage.nativeElement.innerText = '';

        this.router.navigate(['']);
      }, 1000);
    });
    this.loginForm.reset();
  }

  onTogglePassword(){
    if(this.passInput.nativeElement.type === 'password'){
      this.passInput.nativeElement.type = 'text';
      this.eyeIcon.nativeElement.className = 'fa-solid fa-eye';
    }
    else{
      this.passInput.nativeElement.type = 'password';
      this.eyeIcon.nativeElement.className = 'fa-solid fa-eye-slash';
    }

  }
}
