import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const currUser = this.userService.getCurrentUser();
    if (currUser != null) {
      this.userService.getUser(currUser).subscribe((response: any) => {
        if (response != undefined) {
          const idUser = response.user.id_user;
          this.userService.setServiceUserId(idUser);
          const userInfo = response.user;
          userInfo.bodyFat = response.bf.body_fat_percentage;
          userInfo.workoutsCount = response.wCount.workoutsCount;
          this.userService.setServiceUserInfo(userInfo);
        }
      });
    }
    else{
      this.router.navigate(['/account']);
    }
  }
}
