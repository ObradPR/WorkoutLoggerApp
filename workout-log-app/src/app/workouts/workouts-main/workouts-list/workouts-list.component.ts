import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayContentService } from 'src/app/services/display-content.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css'],
})
export class WorkoutsListComponent implements OnInit {
  userId: number;
  workouts: any;
  exercises: any;
  sets: any;
  workoutsLogged: boolean = false;

  constructor(
    private userService: UserService,
    private dCService: DisplayContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userObj = this.userService.getCurrentUser();

    if (userObj != null) {
      this.userService.getUser(userObj).subscribe((response: any) => {
        this.userId = response.user.id_user;
        this.userService.setServiceUserId(this.userId);
        this.loadWorkouts();
      });
    }

    this.dCService.getServiceMakingWorkout().subscribe(state => {
      if (state == false) {
        this.refreshWorkouts();
      }
    });
  }

  loadWorkouts(): void {
    this.route.params.subscribe((params: any) => {
      const data = this.route.snapshot.data.workouts;
      if (!data.message) {
        this.workoutsLogged = true;

        this.workouts = data.workouts; // Array of workout objects
        this.exercises = data.exercises; // Array of exercise objects
        this.sets = data.sets; // Array of set objects

        this.displayWorkouts(this.workouts, this.exercises, this.sets);
      } else {
        this.workoutsLogged = false;
      }
    });
  }

  displayWorkouts(workouts: [], exercises: [], sets: []) {
    if (workouts === undefined || workouts.length > 0) {
      this.workouts = workouts.reverse();
      this.exercises = exercises;
      this.sets = sets;

      // Create a map to store exercises by workout ID
      const workoutExercisesMap = new Map<number, any[]>();

      // Populate the map with exercises grouped by workout ID
      exercises.forEach((exercise: any) => {
        const workoutId = exercise.workout_id;
        if (!workoutExercisesMap.has(workoutId)) {
          workoutExercisesMap.set(workoutId, []);
        }
        workoutExercisesMap.get(workoutId).push(exercise);
      });

      // Iterate over the workouts and merge the exercise and set data
      this.workouts.forEach((workout: any) => {
        const workoutId = workout.id_workout;

        if (workoutExercisesMap.has(workoutId)) {
          workout.exercises = workoutExercisesMap.get(workoutId);

          workout.exercises.forEach((exercise: any) => {
            const exerciseId = exercise.exercise_id;
            const exerciseSets = sets.filter(
              (set: any) =>
                set.exercise_id === exerciseId && set.workout_id === workoutId
            );
            exercise.sets = exerciseSets;
          });
        } else {
          workout.exercises = [];
        }
      });

      this.workoutsLogged = true;
    } else if (!workouts) {
      this.workoutsLogged = false;
      return;
    }
  }

  refreshWorkouts() {
    this.userService.getUserWorkouts(this.userId).subscribe((response: any) => {
      if (response.message) {
        this.workoutsLogged = false;
        return;
      }
      this.displayWorkouts(
        response.workouts,
        response.exercises,
        response.sets
      );
    });
  }

  onWorkoutRemove(event: MouseEvent) {
    const workoutId = +(event.target as HTMLButtonElement).id;

    this.userService.removeUserWorkout(workoutId).subscribe((response: any) => {
      this.refreshWorkouts();
    });
  }

  onWorkoutClick(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
