import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bodyweight } from 'src/app/models/bodyweight.model';
import { BodyweightService } from 'src/app/services/bodyweight.service';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-user-average-stats',
  templateUrl: './user-average-stats.component.html',
  styleUrls: ['./user-average-stats.component.css'],
})
export class UserAverageStatsComponent implements OnInit {
  @Input() userWeights: Bodyweight;
  @Output() refreshStatsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() refreshGoal: EventEmitter<string> = new EventEmitter();
  @Output() emitGoal: EventEmitter<any> = new EventEmitter();
  addGoalForm: FormGroup;
  goalTypes: any;
  averageFor7: number;
  averageFor30: number;
  averageFor365: number;

  numberRegex = /^[1-9]([0-9]{1,2})?(\.[1-9]{1,2})?$/;

  constructor(
    private goalService: GoalService,
    private bodyweightService: BodyweightService
  ) {}

  ngOnInit(): void {
    this.bodyweightService.getAllUserWeights().subscribe((response: any) => {
      this.userWeights.weights = response.weights;
      this.calculateAverages(this.userWeights.weights);
    });

    this.goalService.getGoalTypes().subscribe(response => {
      this.goalTypes = response.goalTypes;
    });

    this.addGoalForm = new FormGroup({
      bodyweight: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numberRegex),
      ]),
      bodyfat: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numberRegex),
      ]),
      goalType: new FormControl(0, [Validators.required, this.notZeroValue]),
    });
  }

  calculateAverages(weights: any) {
    const for7 = weights.slice(0, 7);
    const for30 = weights.slice(0, 30);
    const for365 = weights.slice(0, 365);

    const sum7 = for7.reduce((sum, obj) => sum + +obj.bodyweight, 0);
    const sum30 = for30.reduce((sum, obj) => sum + +obj.bodyweight, 0);
    const sum365 = for365.reduce((sum, obj) => sum + +obj.bodyweight, 0);

    this.averageFor7 = +(sum7 / for7.length).toFixed(2);
    this.averageFor30 = +(sum30 / for30.length).toFixed(2);
    this.averageFor365 = +(sum365 / for365.length).toFixed(2);
  }

  onSubmit() {
    const bodyLog = this.addGoalForm.value;
    bodyLog.userId = this.userWeights.id;

    //cuvanje goala za promenu na sajtu da ne saljem request
    const newGoal = this.goalTypes.find(
      a => a.id_goal_type === +this.addGoalForm.value.goalType
    ).goal_type_name;

    this.goalService.addUserGoal(bodyLog).subscribe((response: any) => {
      this.addGoalForm.reset();
      this.refreshStatsEmitter.emit();
      this.refreshGoal.emit(newGoal);
      this.emitGoal.emit();
    });
  }

  notZeroValue(control: FormControl): { [s: string]: boolean } | null {
    const value = control.value;

    if (value == 0) {
      return { notZero: true };
    } else {
      return null;
    }
  }
}
