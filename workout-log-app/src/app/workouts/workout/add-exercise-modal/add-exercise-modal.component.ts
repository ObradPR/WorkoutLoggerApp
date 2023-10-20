import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-add-exercise-modal',
  templateUrl: './add-exercise-modal.component.html',
  styleUrls: ['./add-exercise-modal.component.css'],
})
export class AddExerciseModalComponent implements OnInit {
  @Output() modalCancelEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() addExerciseEmitter: EventEmitter<number> = new EventEmitter();
  searchText: string = '';
  exercises: Exercise[];
  filteredExercises: Exercise[] = [];
  isPopoverVisible = false;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(response => {
      this.exercises = response.exercises;
    });
  }

  filterExercises(): void {
    this.filteredExercises = this.exercises.filter((exercise: Exercise) => {
      return exercise.exercise_name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
    });
  }

  onAddExerciseCancel(){
    this.modalCancelEmitter.emit(false);
  }

  addExercise(exerciseId: number){
    this.addExerciseEmitter.emit(exerciseId);
    
    this.modalCancelEmitter.emit(false);
  }

  toggleInfoPopover(){
    this.isPopoverVisible = !this.isPopoverVisible;
  }
}
