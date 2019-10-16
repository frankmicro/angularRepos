import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Data } from "../class/data";
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  data: Data[];
  Category:any = [];
  Points:any = [];
  Linechart:any = []; 

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getChartData().subscribe((result: Data[]) => {
      result.forEach(x => {
        this.Category.push(x.category);
        this.Points.push(x.value);
      });
      this
      this.Linechart = new Chart('canvas', {
        type: 'bar',
        theme:'light',
        data: {
          labels: this.Category,
          
          datasets: [
            {
              data: this.Points,
              borderColor: '0000FF',
              backgroundColor: "#0000FF",
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Stage Points',
            position:'left',
            fontColor:'white'
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: { beginAtZero: true },
              stacked: true,
            }],
          },
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          }
        }
      });
      //this.Linechart.
    });
  }  
}


