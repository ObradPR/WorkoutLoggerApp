import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css'],
})
export class EditWorkoutComponent implements OnInit {
  @Output() refreshPageEmitter: EventEmitter<any> = new EventEmitter();
  @Input() workoutInfo: any;
  @ViewChild('editWorkoutMessage') editWorkoutMessage: ElementRef;
  editWorkoutForm: FormGroup;
  editMode: boolean = false;

  editedWorkout: {} | any;
  year: number;
  date: number;
  month: number;

  numberRegex = /^[1-9]([0-9]{1,2})?$/;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const date = new Date(this.workoutInfo.workout_date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    this.year = date.getFullYear();
    this.date = date.getDate();
    this.month = date.getMonth() + 1;

    this.editWorkoutForm = new FormGroup({
      editName: new FormControl(
        this.workoutInfo.workout_name,
        Validators.required
      ),
      editDuration: new FormControl(this.workoutInfo.duration, [
        Validators.required,
        Validators.pattern(this.numberRegex),
      ]),
      editHours: new FormControl(hours, [
        Validators.required,
        Validators.pattern(this.numberRegex),
      ]),
      editMinutes: new FormControl(minutes, Validators.required),
    });
  }

  onEditWorkout() {
    this.editMode = true;
  }

  onEditWorkoutCancel() {
    this.editMode = false;
  }

  onEditWorkoutSubmit(){
    this.route.params.subscribe(params => {

      this.editedWorkout = this.editWorkoutForm.value;
      this.editedWorkout.id = +params.id;
      this.editedWorkout.date = this.date;
      this.editedWorkout.year = this.year;
      this.editedWorkout.month = this.month;
    })

    this.userService.editSingleWorkout(this.editedWorkout).subscribe(response => {
      this.editWorkoutMessage.nativeElement.innerText = response.message;

      setTimeout(() => {
        this.editMode = false;  

        this.editWorkoutMessage.nativeElement.innerText = '';

        this.refreshPageEmitter.emit();
      }, 1000);
    })
  }
}
