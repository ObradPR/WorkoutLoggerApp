import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MeasurementService } from 'src/app/services/measurement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css'],
})
export class AddMeasurementComponent implements OnInit {
  @Output() modalCancelEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() addMeasurementRefreshEmitter: EventEmitter<any> =
    new EventEmitter();
  @ViewChild('invalidValues') invalidValues: ElementRef;
  addMeasurementForm: FormGroup;
  userId: number;

  measurementRegex = /^(0\.\d{1,2}|[1-9]\d{0,2})(\.\d{1,2})?$/;

  constructor(
    private measurementService: MeasurementService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.addMeasurementForm = new FormGroup({
      addNeck: new FormControl(null, Validators.pattern(this.measurementRegex)),
      addChest: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addWaist: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addRightLeg: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addLeftLeg: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addRightArm: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addLeftArm: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addRightCalf: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addLeftCalf: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addRightForearm: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
      addLeftForearm: new FormControl(
        null,
        Validators.pattern(this.measurementRegex)
      ),
    });

    this.userService.getServiceUserId().subscribe((id: number) => {
      this.userId = id;
    });
  }

  onAddMeasurementCancel() {
    this.addMeasurementForm.reset();
    this.modalCancelEmitter.emit(false);
  }

  onAddMeasurementSubmit() {
    if (this.checkingForNullProperties(this.addMeasurementForm.value)) {
      this.invalidValues.nativeElement.innerText =
        'All the values are invalid!';
    } else {
      this.invalidValues.nativeElement.innerText = '';

      const measurObj = this.addMeasurementForm.value;
      measurObj.userId = this.userId;

      this.measurementService
        .addMeasurement(measurObj)
        .subscribe((response: any) => {
          this.addMeasurementRefreshEmitter.emit();
          this.modalCancelEmitter.emit(false);
        });
    }
  }

  checkingForNullProperties(obj: {}): boolean {
    let allNull = true;
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== null) {
        allNull = false;
        break;
      }
    }
    return allNull;
  }
}
