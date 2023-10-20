import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  idUser: number = 0;

  constructor(
    private userService: UserService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.userService.getServiceUserId().subscribe((id: number) => {
      this.idUser = id;
    });
  }

  onLogOut(){
    this.userService.removeUserFromLS();

    this.router.navigate(['']);
  }
}
