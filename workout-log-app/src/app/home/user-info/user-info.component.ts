import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  idUser: number;
  userData: {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getServiceUserId().subscribe((id: number) => {
      this.idUser = id;
    });

    // Ovo treba da bude kompleksniji upit da bi se dohvatile vrednost trenutnog bodyweighta(koji ce se menjati i u tabeli users kako se dodaje u tabelu bodyweights), bodyfata, trenutnog cilja i broju workouta
    // Ali zasad cu najjednostavnije odraditi pa kad uradim workouts, bodyweights i goals template onda cu se vratiti ovde
    this.userService.getServiceUserInfo().subscribe((data: any) => {
      this.userData = data;
    });
  }
}
