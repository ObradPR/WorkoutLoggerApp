import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-edit-set-modal',
  templateUrl: './edit-set-modal.component.html',
  styleUrls: ['./edit-set-modal.component.css'],
})
export class EditSetModalComponent implements OnInit {
  @Output() modalCancelEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() editSetRefreshEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() setObj: any;
  @Input() workoutId: number;
  editSetForm: FormGroup;
  editedSet: any;

  weightRegex = /^(0\.\d{2}|[1-9]\d{0,2})(\.\d{2})?$/;
  repsRegex = /^[1-9][0-9]?$/;

  rpes = [
    { key: 0, value: "I don't even feel it" },
    { key: 1, value: '' },
    { key: 2, value: 'Really Light' },
    { key: 3, value: 'Somewhat Light' },
    { key: 4, value: 'Light' },
    { key: 5, value: '' },
    { key: 6, value: 'Somewhat Heavy' },
    { key: 7, value: 'Heavy' },
    { key: 8, value: 'Really Heavy' },
    { key: 9, value: 'Almost Maximum' },
    { key: 10, value: 'Absolute Maximum' },
  ];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.editSetForm = new FormGroup({
      editWeight: new FormControl(this.setObj.weight, [
        Validators.required,
        Validators.pattern(this.weightRegex),
      ]),
      editReps: new FormControl(this.setObj.reps, [
        Validators.required,
        Validators.pattern(this.repsRegex),
      ]),
      editRpe: new FormControl(this.setObj.rpe + 1, [
        Validators.required,
        this.notZeroValue,
      ]),
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

  onEditSetCancel() {
    this.modalCancelEmitter.emit(false);
  }

  onEditSetSubmit() {
    this.editedSet = this.editSetForm.value;
    this.editedSet.editRpe = this.editedSet.editRpe - 1;
    this.editedSet.setId = this.setObj.id_set;
    this.editedSet.workoutId = this.workoutId;

    this.exerciseService.editSet(this.editedSet).subscribe((response: any) => {
      this.emitEmitterEvent();
    });
  }

  onSetDelete(){
    this.exerciseService.deleteSet({setId: this.setObj.id_set, workoutId: this.workoutId}).subscribe((response: any) =>{
      this.emitEmitterEvent();
    })
  }

  emitEmitterEvent(){
    this.editSetRefreshEmitter.emit(true);

    this.modalCancelEmitter.emit(false);
  }
}
