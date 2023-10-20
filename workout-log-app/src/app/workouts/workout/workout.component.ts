import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit, AfterViewInit {
  @ViewChild(EditWorkoutComponent) editWorkoutInstance: EditWorkoutComponent;
  workout: any;
  addExerciseModalVisible = false;
  addSetModalVisible = false;
  exerciseIdForSet: number;
  editSetModalVisible = false;
  setObj: number;
  totalVolume: number = 0;
  totalSets: number = 0;
  totalReps: number = 0;
  messageModalVisible = false;
  modalMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const workoutInfo = this.route.snapshot.data.workout;

      this.displayWorkout(
        workoutInfo.workout,
        workoutInfo.exercises,
        workoutInfo.sets
      );
    });
  }

  ngAfterViewInit(): void {
    this.editWorkoutInstance.refreshPageEmitter.subscribe(() => {
      this.refreshDisplay();
    });
  }

  displayWorkout(workout: any, exercises: any, sets: any): void {
    if (workout) {
      this.workout = workout; // Workout object
      const exercisesArr = exercises; // Array of exercise objects
      const setsArr = sets; // Array of set objects

      this.workout.exercises = [];

      exercisesArr.forEach((exercise: any) => {
        this.workout.exercises.push(exercise);
      });

      this.workout.exercises.forEach((exercise: any) => {
        const exerciseId = exercise.exercise_id;
        const exerciseSets = setsArr.filter(
          (set: any) => set.exercise_id === exerciseId
        );

        exercise.sets = exerciseSets;
      });

      this.totalReps = workout.total_reps;
      this.totalSets = workout.total_sets;
      this.totalVolume = workout.total_volume;
    }
  }

  onAddExercise() {
    this.addExerciseModalVisible = true;
  }

  refreshDisplay() {
    this.userService
      .getSingleWorkout(this.workout.id_workout)
      .subscribe((data: any) => {
        this.displayWorkout(data.workout, data.exercises, data.sets);
      });

    this.displayMessageModal('Successfully done');
  }

  handelEmitterCancel(value: boolean) {
    this.addExerciseModalVisible = value;
    this.addSetModalVisible = value;
    this.editSetModalVisible = value;
  }

  addExercise(exerciseId: number) {
    this.userService
      .addExerciseToWorkout(this.workout.id_workout, exerciseId)
      .subscribe((response: any) => {
        this.refreshDisplay();

        this.displayMessageModal(response.message);
      });
  }

  onDeleteExercise(exerciseId: number) {
    this.userService
      .deleteExercise(this.workout.id_workout, exerciseId)
      .subscribe((response: any) => {
        this.refreshDisplay();
      });
  }

  onAddSet(exerciseId: number) {
    this.addSetModalVisible = true;
    this.exerciseIdForSet = exerciseId;
  }

  onEditSet(set: any) {
    this.setObj = set;
    this.editSetModalVisible = true;
  }

  displayMessageModal(message: string) {
    this.modalMessage = message;
    this.messageModalVisible = true;

    setTimeout(() => {
      this.messageModalVisible = false;
      this.modalMessage = '';
    }, 4000);
  }
}
