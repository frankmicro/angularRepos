import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FitnessLevel } from "../data/profileData.model";;
import { ProfileDataService } from "../data/profileData.service";
import { SharedService } from "../../services/shared.service";
 
@Component({
  selector: 'app-fitness-level',
  templateUrl: './fitness-level.component.html',
  styleUrls: ['./fitness-level.component.css']
})
export class FitnessLevelComponent implements OnInit {
  data: any = {};
  
  fitnessLevel: FitnessLevel;
  constructor(
    private router: Router,
    private profileDataService: ProfileDataService,
    private _sharedService: SharedService
  ) { }

  ngOnInit() {
    this.fitnessLevel = this.profileDataService.getFitnessLevel();
  }

  save(): boolean {
    this.profileDataService.setFitnessLevel(this.fitnessLevel);
    return true;
  }

  formValidHandler(): any {
    this.profileDataService.setFitnessLevel(this.fitnessLevel);
  }

  finishAndSave() {
    if (this.save()) {
      let event = {
        type: "SUBMIT_PROFILE_FORM",
        data: {}
      };
      this._sharedService.emitChange(event);
    }
  }

  goToPrevious() {
    this.router.navigate(['/profile/food-preference']);
  }

}
