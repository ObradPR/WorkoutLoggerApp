import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Measurement } from '../models/measurement.model';
import { UserService } from '../services/user.service';
import { MeasurementService } from '../services/measurement.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css'],
})
export class MeasurementsComponent implements OnInit {
  @ViewChild('noMeasurementsMessage') noMeasureMess: ElementRef;
  userMeasurements: Measurement = { id: 0, measurements: [] };
  last7Measurements: Measurement = { id: 0, measurements: [] };
  measurementsStatsVisible = false;
  addMeasureModal = false;

  constructor(
    private userService: UserService,
    private measurementService: MeasurementService
  ) {}

  ngOnInit(): void {
    this.userService.getServiceUserId().subscribe((id: number) => {
      if (id != 0) {
        this.userMeasurements.id = id;
        this.last7Measurements.id = id;
        this.refreshPage(id);
      }
    });
  }

  refreshPage(userId: number) {
    this.userService.getUserMeasurements(userId).subscribe((response: any) => {
      if (response.message) {
        this.noMeasureMess.nativeElement.innerText = response.message;
        this.userMeasurements.measurements = [];
        this.last7Measurements.measurements = [];
        this.measurementsStatsVisible = false;
        return;
      }
      this.noMeasureMess.nativeElement.innerText = '';

      this.userMeasurements.measurements = response.measurements;
      this.measurementService.setAllUserMeasurements(this.userMeasurements);

      this.last7Measurements.measurements = response.measurements.slice(0, 7);

      this.measurementsStatsVisible = true;
    });
  }

  onAddMeasurement() {
    this.addMeasureModal = true;
  }

  closeModal(value: boolean) {
    this.addMeasureModal = value;
  }
}
