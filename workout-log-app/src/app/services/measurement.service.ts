import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Measurement } from '../models/measurement.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  userMeasurements: BehaviorSubject<Measurement> =
    new BehaviorSubject<Measurement>(null);

  constructor(private dataService: DataService) {}

  getAllUserMeasurement(): Observable<Measurement> {
    return this.userMeasurements.asObservable();
  }

  setAllUserMeasurements(userMeasurements: Measurement) {
    this.userMeasurements.next(userMeasurements);
  }

  addMeasurement(obj: {}): Observable<any> {
    return this.dataService.postData(obj, 'measurements/add-measurement.php');
  }

  deleteMeasurement(obj: { userId: number; date: string }): Observable<any> {
    return this.dataService.postData(
      obj,
      'measurements/delete-measurement.php'
    );
  }
}
