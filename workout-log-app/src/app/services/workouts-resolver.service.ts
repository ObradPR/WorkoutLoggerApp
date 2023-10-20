import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';
import { Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkoutsResolver {
  userId: number;

  constructor(private userService: UserService) {}

  resolve: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> => {
    const userObj = this.userService.getCurrentUser();
    if (userObj != null) {
      return this.userService.getUser(userObj).pipe(
        switchMap((response: any) => {
          const userId = response.user.id_user;
          return this.userService.getUserWorkouts(userId);
        })
      );
    }
    console.log(this.userId);
  };
}
