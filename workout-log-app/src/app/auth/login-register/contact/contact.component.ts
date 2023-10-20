import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactMessage') contactMessage: ElementRef;
  contactForm: FormGroup;

  contactData: {};

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    this.contactData = this.contactForm.value;
    this.userService.sendContact(this.contactData).subscribe((response: any) => {
      
      // console.log(response);

      this.contactMessage.nativeElement.innerText = response.message;

      setTimeout(() => {
        this.contactMessage.nativeElement.innerText = '';
      }, 5000);
    });
    this.contactForm.reset();
  }
}
