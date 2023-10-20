import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Bodyweight } from 'src/app/models/bodyweight.model';
import { BodyweightService } from 'src/app/services/bodyweight.service';

@Component({
  selector: 'app-bodyweight-chart',
  templateUrl: './bodyweight-chart.component.html',
  styleUrls: ['./bodyweight-chart.component.css'],
})
export class BodyweightChartComponent implements OnInit {
  @Input() userWeights: Bodyweight;
  chart: any;
  bodyweightsArr: any;
  bodyweightDatesArr: any;
  chartCreated: boolean = false;
  chartTimespan: number = 0;

  constructor(private bodyweightService: BodyweightService) {}

  ngOnInit(): void {
    this.bodyweightService
      .getAllUserWeights()
      .subscribe((response: Bodyweight) => {
        this.userWeights = response;
        this.generateChart();
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
    this.bodyweightDatesArr = this.userWeights.weights.map(
      (item: any) => item.bodyweight_date
    );
    this.bodyweightDatesArr = this.bodyweightDatesArr
      .map((date: any) => {
        const dateObj = new Date(date);
        const modifiedDate = dateObj.toLocaleDateString('sr-RS');
        return modifiedDate;
      })
      .reverse();

    this.bodyweightsArr = this.userWeights.weights
      .map((item: any) => item.bodyweight)
      .reverse();

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
    this.bodyweightDatesArr = this.bodyweightDatesArr.slice(-value);
    this.bodyweightsArr = this.bodyweightsArr.slice(-value);
  }

  onChartTimespanChange(value: string) {
    this.chartTimespan = +value;
    this.generateChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: [...this.bodyweightDatesArr],
        datasets: [
          {
            label: 'Bodyweights',
            data: [...this.bodyweightsArr],
            backgroundColor: 'blue',
            tension: 0.4,
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
