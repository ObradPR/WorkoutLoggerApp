import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Measurement } from 'src/app/models/measurement.model';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-user-measurements',
  templateUrl: './user-measurements.component.html',
  styleUrls: ['./user-measurements.component.css'],
})
export class UserMeasurementsComponent implements OnInit {
  @Input() last7Measurements: Measurement;
  @Output() refreshStatsEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private measurementService: MeasurementService) {}

  ngOnInit(): void {}

  onDeleteMeasurement(userId: number, date: string) {
    const obj = {
      userId: userId,
      date: date,
    };

    this.measurementService
      .deleteMeasurement(obj)
      .subscribe((response: any) => {
        this.refreshStatsEmitter.emit();
      });
  }
}
