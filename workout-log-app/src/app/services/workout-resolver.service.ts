import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkoutResolver {
    constructor(private userService: UserService){}

    resolve: ResolveFn<any> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> => {
        return this.userService.getSingleWorkout(+route.params.id);
    }
}