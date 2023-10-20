import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('passwordInput') passInput: ElementRef;
  @ViewChild('eyeIcon') eyeIcon: ElementRef;
  @ViewChild('registerMessage') regMessage: ElementRef; 
  registerForm: FormGroup;

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  numberRegex = /^[1-9][0-9]{1,2}(\.[1-9])?$/;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [];
  days: number[] = [];
  genders: any;
  userData: {};



  constructor(
    private dataService: DataService, private userService: UserService
    ){
    const currentDate = new Date().getFullYear();
    for(let i = (currentDate - 12); i >= 1940; i--){
      this.years.push(i);
    }

    for(let i = 1; i <= 31; i++){
      this.days.push(i);
    }
  }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormGroup({
        month: new FormControl(0, [this.notZeroValue, Validators.required]),
        day: new FormControl(0, [this.notZeroValue, Validators.required]),
        year: new FormControl(0, [this.notZeroValue, Validators.required]),
      }),
      height: new FormControl(null, [Validators.required, Validators.pattern(this.numberRegex)]),
      weight: new FormControl(null, [Validators.required, Validators.pattern(this.numberRegex)]),
      gender: new FormControl(null, [this.notZeroValue, Validators.required]),
      notification: new FormControl(false),
    });

    this.dataService.getData("genders/get-genders.php").subscribe((response: any) => {
      this.genders = response.genders;
    })
  }

  onSubmit(){
    this.userData = this.registerForm.value;
    this.userService.insertUser(this.userData).subscribe((response: any) => {
      
      // console.log(response);

      this.regMessage.nativeElement.innerText = response.message;

      setTimeout(() => {
        this.regMessage.nativeElement.innerText = '';
      }, 5000);
    });
    this.registerForm.reset();
  }

  // Custom Validators
  notZeroValue(control: FormControl): { [s: string]: boolean } | null{
    const value = control.value;

    if(value == 0){
      return { notZero: true }
    }
    else{
      return null;
    }
  }


  
  updateDayValidity(){
    const monthControl = this.registerForm.get('dateOfBirth.month');
    const dayControl = this.registerForm.get('dateOfBirth.day');

    if(monthControl && dayControl){
      const month = monthControl.value;
      const day = dayControl.value;

      const maxDays = new Date(new Date().getFullYear(), month, 0).getDate();

      dayControl.setErrors((day > maxDays || day == 0) ? { invalidDay: true } : null);
    }
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
