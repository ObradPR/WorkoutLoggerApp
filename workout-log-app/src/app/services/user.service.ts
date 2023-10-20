import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private userInfo: BehaviorSubject<any> = new BehaviorSubject<any>({});
    private currentUser: string | null;

    constructor(private dataService: DataService) {
        this.loadCurrentUser();
    }

    private loadCurrentUser(){
        const storedUser = localStorage.getItem('username');
        this.currentUser = storedUser ? storedUser : null;
    }

    getCurrentUser(): any {
        if(this.currentUser == null){
            return null;
        }
        return {
            username: this.currentUser,
            password: '',
        }
    }

    setUserInLS(username: string){
        const usernameLS = username;
        localStorage.setItem('username', usernameLS);

        this.loadCurrentUser();
    }
    removeUserFromLS(){
        localStorage.removeItem('username');
        this.id.next(0);
        this.userInfo.next({});
    }

    getServiceUserId(): Observable<number>{
        return this.id.asObservable();
    }
    setServiceUserId(id: number){
        this.id.next(id);
    }

    getServiceUserInfo(): Observable<any>{
        return this.userInfo.asObservable();
    }
    setServiceUserInfo(userObj: any){
        this.userInfo.next(userObj);
    }

    insertUser(userData: {}): Observable<any>{
        return this.dataService.postData(userData, 'users/insert-user.php');
    }

    sendContact(contactData: {}): Observable<any>{
        return this.dataService.postData(contactData, 'users/send-contact.php');
    }

    getUser(userData: {}): Observable<any>{
        return this.dataService.postData(userData, 'users/login-user.php');
    }

    insertWorkout(userWorkout: {}): Observable<any>{
        return this.dataService.postData(userWorkout, 'workouts/insert-workout.php');
    }

    getUserWorkouts(userId: number): Observable<any>{
        return this.dataService.postData(userId, 'workouts/get-user-workouts.php');
    }

    removeUserWorkout(workoutId: number): Observable<any>{
        return this.dataService.postData(workoutId, 'workouts/remove-user-workout.php');
    }

    getSingleWorkout(workoutId: number): Observable<any>{
        return this.dataService.postData(workoutId, 'workouts/get-single-workout.php');
    }

    editSingleWorkout(workout: {}): Observable<any>{
        return this.dataService.postData(workout, 'workouts/edit-single-workout.php');
    }

    addExerciseToWorkout(workoutId: number, exerciseId: number){
        return this.dataService.postData({workout: workoutId, exercise: exerciseId}, 'workouts/insert-exercise.php');
    }  

    deleteExercise(workoutId: number, exerciseId: number){
        return this.dataService.postData({workout: workoutId, exercise: exerciseId}, 'workouts/delete-exercise.php');
    }

    addTotalIntoWorkouts(total: {}): Observable<any>{
        return this.dataService.postData(total, 'workouts/update-total.php');
    }

    getUserBodyweights(userId: number) : Observable<any>{
        return this.dataService.postData(userId, 'bodyweights/get-user-bodyweights.php')
    }

    addWeight(bodyLog: {userId: number, bodyweight: number, bodyfat: number}): Observable<any>{
        return this.dataService.postData(bodyLog, 'bodyweights/insert-user-bodyweight.php');
    }

    deleteBodyweight(obj: {userId: number; date: string}): Observable<any>{
        return this.dataService.postData(obj, 'bodyweights/delete-user-bodyweight.php');
    }

    getUserMeasurements(userId: number): Observable<any>{
        return this.dataService.postData(userId, 'measurements/get-user-measurements.php')
    }
}