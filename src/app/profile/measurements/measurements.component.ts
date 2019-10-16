import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Measurements } from "../data/profileData.model";;
import { ProfileDataService } from "../data/profileData.service";

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {
  data:any = [];

  measurements: Measurements;
  constructor(
    private router: Router,
    private profileDataService: ProfileDataService
  ) { }

  ngOnInit() {
    this.measurements = this.profileDataService.getMeasurements();
  }

  save(): boolean {
    this.profileDataService.setMeasurements(this.measurements, true);
    return true;
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['/profile/blood-parameters']);
    }
  }

  formValidHandler(): any {
    this.profileDataService.setMeasurements(this.measurements, false);
  }

  goToPrevious() {
      this.router.navigate(['/profile/habits']);
  }

}
