import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  userId: number;

  constructor(private userService: UserService, private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean => {
    this.userService.getServiceUserId().subscribe((id: number) => {
      this.userId = id;
    });
    if (this.userId !== 0) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  };
}
