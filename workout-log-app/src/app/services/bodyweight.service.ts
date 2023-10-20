import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bodyweight } from '../models/bodyweight.model';

@Injectable({
  providedIn: 'root',
})
export class BodyweightService {
  userWeights: BehaviorSubject<Bodyweight> = new BehaviorSubject<Bodyweight>(
    null
  );

  constructor() {}

  getAllUserWeights(): Observable<Bodyweight> {
    return this.userWeights.asObservable();
  }

  setAllUserWeights(userWeights: Bodyweight) {
    this.userWeights.next(userWeights);
  }
}
