import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Exercise } from 'src/app/models/exercise.model';
import { MuscleGroup } from 'src/app/models/muscle-groups.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-exercises-main',
  templateUrl: './exercises-main.component.html',
  styleUrls: ['./exercises-main.component.css'],
})
export class ExercisesMainComponent implements OnInit {
  userId: number;
  muscleGroups: MuscleGroup[];
  exercises: Exercise[];
  exercisesMG: [];
  filteredExercises: Exercise[] = [];
  searchExercisesText: string = '';
  selectedMuscleGroup: number = 0;
  recordsVisible: boolean = false;
  maxweightsArr: any;
  uniqueDatesArr: any = [];
  chartCreated: boolean = false;
  chartTimespan: number = 0;
  chart: any;

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getServiceUserId().subscribe((id: number) => {
      this.userId = id;
    });
    this.exerciseService.getExercises().subscribe((response: any) => {
      this.muscleGroups = response.muscleGroups;
      this.exercises = response.exercises;
      this.exercisesMG = response.exercisesMG;
    });
  }

  filterExercisesByInput(): void {
    this.updateFilteredExercises();
  }

  onMGChange() {
    this.updateFilteredExercises();
  }

  updateFilteredExercises() {
    if (this.selectedMuscleGroup == 0 && this.searchExercisesText == '') {
      this.filteredExercises = [];
    } else if (this.selectedMuscleGroup == 0) {
      this.filteredExercises = this.exercises.filter((exercise: Exercise) => {
        return exercise.exercise_name
          .toLowerCase()
          .includes(this.searchExercisesText.toLowerCase());
      });
    } else if (this.searchExercisesText == '') {
      this.filteredExercises = this.exercises.filter((exercise: any) => {
        return this.exercisesMG.some((exerciseMG: any) => {
          return (
            exerciseMG.id_exercise == exercise.id_exercise &&
            exerciseMG.muscle_group_id == +this.selectedMuscleGroup
          );
        });
      });
    } else {
      this.filteredExercises = this.exercises.filter((exercise: any) => {
        return (
          exercise.exercise_name
            .toLowerCase()
            .includes(this.searchExercisesText.toLowerCase()) &&
          this.exercisesMG.some((exerciseMG: any) => {
            return (
              exerciseMG.id_exercise == exercise.id_exercise &&
              exerciseMG.muscle_group_id == +this.selectedMuscleGroup
            );
          })
        );
      });
    }
  }

  onExerciseSelected(id: number) {
    const obj = {
      userId: this.userId,
      exerciseId: id,
    };
    this.exerciseService.getUserExerciseSets(obj).subscribe((response: any) => {
      const sets = response.userSets;

      if (sets != undefined) {
        const filteredArr = sets.map(obj => {
          return {
            reps: obj.reps,
            weight: parseFloat(obj.weight),
            workout_date: obj.workout_date,
          };
        });

        const maxWeights = [];

        filteredArr.forEach(set => {
          const date = set.workout_date;
          const weight = set.weight;

          if (!this.uniqueDatesArr.includes(date)) {
            this.uniqueDatesArr.push(date);
            maxWeights[date] = weight;
          } else {
            if (weight > maxWeights[date]) {
              maxWeights[date] = weight;
            }
          }
        });
        this.uniqueDatesArr = this.uniqueDatesArr.map((date: any) => {
          const dateObj = new Date(date);
          const modifiedDate = dateObj.toLocaleDateString('sr-RS');
          return modifiedDate;
        });
        this.maxweightsArr = Object.values(maxWeights);

        // Generate chart
        this.recordsVisible = true;
        setTimeout(() => {
          this.generateChart();
        }, 200);
      }
    });
  }

  generateChart() {
    if (this.chartCreated === false) {
      this.chartCreated = true;
    } else if (this.chartCreated === true) {
      this.chart.destroy();
    }
    this.createArrForChart(this.chartTimespan);
    this.createChart();
  }

  createArrForChart(value: number) {
    if (value === 0) {
      return;
    } else if (value === 7) {
      this.recreateChartArrs(value);
    } else if (value === 30) {
      this.recreateChartArrs(value);
    } else if (value === 365) {
      this.recreateChartArrs(value);
    }
  }

  recreateChartArrs(value: number) {
    this.uniqueDatesArr = this.uniqueDatesArr.slice(-value);
    this.maxweightsArr = this.maxweightsArr.slice(-value);
  }

  onChartTimespanChange(value: string) {
    this.chartTimespan = +value;
    this.generateChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('MyChartExer', {
      type: 'line',
      data: {
        labels: [...this.uniqueDatesArr],
        datasets: [
          {
            label: 'Lifted weights',
            data: [...this.maxweightsArr],
            backgroundColor: 'blue',
            tension: 0.3,
            borderColor: 'lightblue',
          },
        ],
      },
      options: {
        aspectRatio: 1,
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
