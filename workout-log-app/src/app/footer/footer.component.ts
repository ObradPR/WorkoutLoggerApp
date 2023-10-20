import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentDate: number;
  date: Date;
  idUser: number = 0;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.date = new Date();
    this.currentDate = this.date.getFullYear();

    this.userService.getServiceUserId().subscribe((id: number) => {
      this.idUser = id;
    });
  }
}
