import { Component } from '@angular/core';
import { _isClickEvent } from 'chart.js/dist/helpers/helpers.core';
import { DisplayContentService } from 'src/app/services/display-content.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-workouts-main',
  templateUrl: './workouts-main.component.html',
  styleUrls: ['./workouts-main.component.css'],
})
export class WorkoutsMainComponent{
  makingWorkout: boolean = false;
  messageModalVisible: boolean = false;
  messageModal: string = '';
  selTemplateValue: string = '0';
  userTemplatesArr: any = [];
  userId: number;

  constructor(
    private dCService: DisplayContentService,
    private userService: UserService,
  ) {}

  onAddWorkout() {
    this.dCService.setServiceMakingWorkout(true);
    this.dCService.getServiceMakingWorkout().subscribe(state => {
      this.makingWorkout = state;

      if (state == false) {
        this.displayMessageModal('Workout Added');
      }
    });
  }

  displayMessageModal(message: string) {
    this.messageModal = message;
    this.messageModalVisible = true;

    setTimeout(() => {
      this.messageModalVisible = false;
      this.messageModal = '';
    }, 2000);
  }
}
