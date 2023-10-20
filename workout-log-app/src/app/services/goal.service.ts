import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private dataService: DataService) {}

  getGoalTypes(): Observable<any> {
    return this.dataService.getData('goals/get-goal-types.php');
  }

  addUserGoal(obj: {}): Observable<any>{
    return this.dataService.postData(obj, 'goals/add-user-goal.php')
  }
}
