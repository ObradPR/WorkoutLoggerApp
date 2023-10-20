import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Bodyweight } from '../models/bodyweight.model';
import { BodyweightService } from '../services/bodyweight.service';

@Component({
  selector: 'app-bodyweights',
  templateUrl: './bodyweights.component.html',
  styleUrls: ['bodyweights.component.css'],
})
export class BodyweightsComponent implements OnInit {
  @ViewChild('noBodyweightsMessage') noBodyweightsMess: ElementRef;
  userWeights: Bodyweight = { id: 0, weights: [] };
  userWeightsFor5: Bodyweight = { id: 0, weights: [] };
  weightStatsVisible = false;
  pageRendered = false;
  messageModalVisible = false;
  modalMessage: string = '';

  currentGoal: any = '';
  currentWeight: any = '';
  currentBodyfat: any = '';
  goalWeight: any = '';
  goalBodyfat: any = '';

  constructor(
    private userService: UserService,
    private bodyweightService: BodyweightService
  ) {}

  ngOnInit(): void {
    this.userService.getServiceUserId().subscribe((id: number) => {
      if (id != 0) {
        this.userWeights.id = id;
        this.userWeightsFor5.id = id;

        this.refreshPage(id);
      }
    });
  }

  refreshPage(userId: number) {
    this.userService.getUserBodyweights(userId).subscribe((response: any) => {
      this.pageRendered = true;
      if (response.message) {
        this.noBodyweightsMess.nativeElement.innerText = response.message;
        this.weightStatsVisible = false;
        this.userWeights.weights = [];
        this.userWeightsFor5.weights = [];
        this.currentBodyfat = 0;
        this.currentWeight = 0;
        return;
      }
      this.noBodyweightsMess.nativeElement.innerText = '';
      this.userWeights.weights = response.bodyweights;
      this.bodyweightService.setAllUserWeights(this.userWeights);

      this.userWeightsFor5.weights = response.bodyweights.slice(0, 5);

      this.displayUserStats(response.goal, this.userWeightsFor5.weights);

      this.weightStatsVisible = true;
    });
  }

  displayUserStats(goal: any, weights: any) {
    this.currentGoal = goal.goal_type_name;
    this.goalWeight = goal.target_weight;
    this.goalBodyfat = goal.target_bodyfat_percentage;

    this.currentWeight = weights;

    this.currentBodyfat = this.currentWeight[0].body_fat_percentage;
    this.currentWeight = this.currentWeight[0].bodyweight;
  }

  refreshGoal(goal: any) {
    this.currentGoal = goal;
  }

  displayMessageModal(message: string) {
    this.modalMessage = message;
    this.messageModalVisible = true;

    setTimeout(() => {
      this.messageModalVisible = false;
      this.modalMessage = '';
    }, 4000);
  }

  addBodyweightEmitterHandler() {
    this.displayMessageModal('Bodyweight added!');
  }

  addGoalEmitterHandler() {
    this.displayMessageModal('Goal added!');
  }
}
