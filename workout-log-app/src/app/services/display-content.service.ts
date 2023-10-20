import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayContentService {
  private makingWorkout: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);

  getServiceMakingWorkout(): Observable<boolean | null> {
    return this.makingWorkout.asObservable();
  }
  setServiceMakingWorkout(state: boolean | null) {
    this.makingWorkout.next(state);
  }
}
