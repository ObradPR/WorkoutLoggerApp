import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bodyweight } from 'src/app/models/bodyweight.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-weights',
  templateUrl: './user-weights.component.html',
  styleUrls: ['./user-weights.component.css'],
})
export class UserWeightsComponent implements OnInit {
  @Input() userWeightsFor5: Bodyweight;
  @Output() refreshStatsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() emitBodyweight: EventEmitter<any> = new EventEmitter();
  addWeightForm: FormGroup;
  userId: number;
  weights = [];

  numberRegex = /^[1-9]([0-9]{1,2})?(\.[1-9]{1,2})?$/;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.userWeightsFor5.id;

    this.addWeightForm = new FormGroup({
      bodyweight: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numberRegex),
      ]),
      bodyfat: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numberRegex),
      ]),
    });
  }

  onSubmit() {
    const bodyLog = this.addWeightForm.value;
    bodyLog.userId = this.userId;

    this.userService.addWeight(bodyLog).subscribe((response: any) => {
      this.addWeightForm.reset();
      this.refreshStatsEmitter.emit();
      this.emitBodyweight.emit();
    });
  }

  onDeleteBodyweight(userId: number, date: string) {
    const obj = {
      userId: userId,
      date: date,
    };

    this.userService.deleteBodyweight(obj).subscribe((response: any) => {
      this.refreshStatsEmitter.emit();
    });
  }
}
