import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DisplayContentService } from 'src/app/services/display-content.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-workouts',
  templateUrl: './add-workouts.component.html',
  styleUrls: ['./add-workouts.component.css'],
})
export class AddWorkoutsComponent implements OnInit {
  newWorkoutForm: FormGroup;

  numberRegex = /^[1-9]([0-9]{1,2})?$/;

  userInfo: any;
  workoutTemplates: {};
  userWorkout: any;

  constructor(
    private dCService: DisplayContentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.newWorkoutForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      duration: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numberRegex),
      ]),
      workoutStartTime: new FormControl(null, Validators.required),
    });

    this.userService.getServiceUserInfo().subscribe((data: any) => {
      this.userInfo = data;
    });
  }

  onNewWorkoutSubmit() {
    this.userWorkout = this.newWorkoutForm.value;
    this.userWorkout.userId = this.userInfo.id_user;
    this.userWorkout.userBodyweight = this.userInfo.user_bodyweight;

    this.userService
      .insertWorkout(this.userWorkout)
      .subscribe((response: any) => {
        this.dCService.setServiceMakingWorkout(false);
      });
  }

  onWorkoutCancel() {
    this.dCService.setServiceMakingWorkout(null);
  }
}
