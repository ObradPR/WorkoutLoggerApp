import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private dataService: DataService) {}

  getExercises(): Observable<any> {
    return this.dataService.getData('exercises/get-exercises.php');
  }

  addSet(setObj: {}): Observable<any>{
    return this.dataService.postData(setObj, 'exercises/insert-set.php');
  }

  editSet(editedObj: {}): Observable<any>{
    return this.dataService.postData(editedObj, 'exercises/update-set.php');
  }

  deleteSet(setObj: {setId: number, workoutId: number}): Observable<any>{
    return this.dataService.postData(setObj, 'exercises/delete-set.php');
  }

  getUserExerciseSets(obj: {userId: number, exerciseId: number}): Observable<any>{
    return this.dataService.postData(obj, 'exercises/get-user-exercise-sets.php');
  }
}
