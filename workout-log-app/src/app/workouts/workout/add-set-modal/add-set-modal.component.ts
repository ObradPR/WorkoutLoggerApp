import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-add-set-modal',
  templateUrl: './add-set-modal.component.html',
  styleUrls: ['./add-set-modal.component.css'],
})
export class AddSetModalComponent implements OnInit {
  @Output() modalCancelEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() addSetRefreshEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() exerciseIdForSet: number;
  addSetForm: FormGroup;
  setObj: any;

  weightRegex = /^(0\.\d{1,2}|[1-9]\d{0,2})(\.\d{1,2})?$/;
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

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.addSetForm = new FormGroup({
      addWeight: new FormControl(0, [
        Validators.required,
        Validators.pattern(this.weightRegex),
      ]),
      addReps: new FormControl(0, [
        Validators.required,
        Validators.pattern(this.repsRegex),
      ]),
      addRpe: new FormControl(0, [Validators.required, this.notZeroValue]),
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

  onAddSetSubmit() {
    this.route.params.subscribe(params => {
      this.setObj = this.addSetForm.value;
      this.setObj.addRpe = this.setObj.addRpe - 1;
      this.setObj.workoutId = +params.id;
      this.setObj.exerciseId = this.exerciseIdForSet;

      this.exerciseService.addSet(this.setObj).subscribe((response: any) => {
        this.addSetRefreshEmitter.emit(true);

        this.modalCancelEmitter.emit(false);
      });
    });
  }

  onAddSetCancel() {
    this.modalCancelEmitter.emit(false);
  }
}
