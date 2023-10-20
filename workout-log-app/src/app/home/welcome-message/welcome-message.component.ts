import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.css']
})
export class WelcomeMessageComponent implements OnInit {
  idUser: number;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getServiceUserId().subscribe((id: number) => {
      this.idUser = id;
    })
  }
}
