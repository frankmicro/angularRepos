import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BloodParameters } from "../data/profileData.model";
import { ProfileDataService } from "../data/profileData.service";

@Component({
  selector: 'app-blood-parameters',
  templateUrl: './blood-parameters.component.html',
  styleUrls: ['./blood-parameters.component.css']
})
export class BloodParametersComponent implements OnInit {
  data: any = {};
  bloodParameters: BloodParameters;
  constructor(
    private router: Router,
    private profileDataService: ProfileDataService
  ) { }

  ngOnInit() {
    this.bloodParameters = this.profileDataService.getBloodParameters();
  }

  save(): boolean {
    this.profileDataService.setBloodParameters(this.bloodParameters, true);
    return true;
  }

  formValidHandler(): any {
    this.profileDataService.setBloodParameters(this.bloodParameters, false);
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['/profile/food-preference']);
    }
  }

  goToPrevious() {
        this.router.navigate(['/profile/measurements']);
  }

}
