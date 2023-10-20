import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Measurement } from 'src/app/models/measurement.model';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-measurements-chart',
  templateUrl: './measurements-chart.component.html',
  styleUrls: ['./measurements-chart.component.css'],
})
export class MeasurementsChartComponent implements OnInit {
  userMeasurements: Measurement;
  chart: any;
  arrNeck: any;
  arrChest: any;
  arrWaist: any;
  arrRArm: any;
  arrLArm: any;
  arrRForearm: any;
  arrLForearm: any;
  arrRLeg: any;
  arrLLeg: any;
  arrRCalf: any;
  arrLCalf: any;
  measurementsDateArr: any;
  chartCraeted: boolean = false;
  chartTimespan: number = 0;

  constructor(private measurementService: MeasurementService) {}

  ngOnInit(): void {
    this.measurementService
      .getAllUserMeasurement()
      .subscribe((response: Measurement) => {
        this.userMeasurements = response;
        this.generateChart();
      });
  }

  generateChart() {
    if (this.chartCraeted === false) {
      this.chartCraeted = true;
    } else if (this.chartCraeted === true) {
      this.chart.destroy();
    }
    this.createArrForChart(this.chartTimespan);
    this.createChart();
  }

  createArrForChart(value: number) {
    this.measurementsDateArr = this.userMeasurements.measurements.map(
      (item: any) => item.body_measurement_date
    );

    this.measurementsDateArr = this.measurementsDateArr
      .map((date: any) => {
        const dateObj = new Date(date);
        const modifiedDate = dateObj.toLocaleDateString('sr-RS');
        return modifiedDate;
      })
      .reverse();

    this.arrChest = this.userMeasurements.measurements
      .map((item: any) => item.chest_circumference)
      .reverse();
    this.arrNeck = this.userMeasurements.measurements
      .map((item: any) => item.neck_circumference)
      .reverse();
    this.arrWaist = this.userMeasurements.measurements
      .map((item: any) => item.waist_circumference)
      .reverse();
    this.arrRArm = this.userMeasurements.measurements
      .map((item: any) => item.right_arm_circumference)
      .reverse();
    this.arrLArm = this.userMeasurements.measurements
      .map((item: any) => item.left_arm_circumference)
      .reverse();
    this.arrRForearm = this.userMeasurements.measurements
      .map((item: any) => item.right_forearm_circumference)
      .reverse();
    this.arrLForearm = this.userMeasurements.measurements
      .map((item: any) => item.left_forearm_circumference)
      .reverse();
    this.arrRLeg = this.userMeasurements.measurements
      .map((item: any) => item.right_leg_circumference)
      .reverse();
    this.arrLLeg = this.userMeasurements.measurements
      .map((item: any) => item.left_leg_circumference)
      .reverse();
    this.arrRCalf = this.userMeasurements.measurements
      .map((item: any) => item.right_calf_circumference)
      .reverse();
    this.arrLCalf = this.userMeasurements.measurements
      .map((item: any) => item.left_calf_circumference)
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
    this.measurementsDateArr = this.measurementsDateArr.slice(-value);
    this.arrChest = this.arrChest.slice(-value);
    this.arrNeck = this.arrNeck.slice(-value);
    this.arrWaist = this.arrWaist.slice(-value);
    this.arrRArm = this.arrRArm.slice(-value);
    this.arrLArm = this.arrLArm.slice(-value);
    this.arrRForearm = this.arrRForearm.slice(-value);
    this.arrLForearm = this.arrLForearm.slice(-value);
    this.arrRLeg = this.arrRLeg.slice(-value);
    this.arrLLeg = this.arrLLeg.slice(-value);
    this.arrRCalf = this.arrRCalf.slice(-value);
    this.arrLCalf = this.arrLCalf.slice(-value);
  }

  onChartTimespanChange(value: number) {
    this.chartTimespan = +value;
    this.generateChart();
  }

  createChart() {
    this.chart = new Chart('MyChartMeasurements', {
      type: 'line',
      data: {
        labels: [...this.measurementsDateArr],
        datasets: [
          {
            label: 'Chest',
            data: [...this.arrChest],
            backgroundColor: 'blue',
            tension: 0.3,
            spanGaps: true,
            borderColor: 'blue'
          },
          {
            label: 'Neck',
            data: [...this.arrNeck],
            backgroundColor: 'darkblue',
            borderColor: 'darkblue',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Waist',
            data: [...this.arrWaist],
            backgroundColor: 'orange',
            borderColor: 'orange',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Right Arm',
            data: [...this.arrRArm],
            backgroundColor: 'red',
            borderColor: 'red',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Left Arm',
            data: [...this.arrLArm],
            backgroundColor: 'yellow',
            borderColor:'yellow',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Right Forearm',
            data: [...this.arrRForearm],
            backgroundColor: 'golden',
            borderColor: 'golden',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Left Forearm',
            data: [...this.arrLForearm],
            backgroundColor: 'silver',
            borderColor: 'silver',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Right Leg',
            data: [...this.arrRLeg],
            backgroundColor: 'cyan',
            borderColor: 'cyan',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Left Leg',
            data: [...this.arrLLeg],
            backgroundColor: 'green',
            borderColor: 'green',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Right Calf',
            data: [...this.arrRCalf],
            backgroundColor: 'lightgreen',
            borderColor: 'lightgreen',
            tension: 0.3,
            spanGaps: true,
          },
          {
            label: 'Left Calf',
            data: [...this.arrLCalf],
            backgroundColor: 'pink',
            borderColor: 'pink',
            tension: 0.3,
            spanGaps: true,
          },
        ],
      },
      options: {
        aspectRatio: 0.75,
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
