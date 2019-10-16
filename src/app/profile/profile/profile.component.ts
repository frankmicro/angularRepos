import { Component, OnInit } from '@angular/core';
import { Globals } from '../../helpers/globals';

import { ProfileDataService } from "../data/profileData.service";
import { SharedService } from "../../services/shared.service";

import { ObstetricHistory } from "../data/profileData.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showObstetricStep:boolean = false;

  constructor(
    private globals:Globals,
    private profileDataService: ProfileDataService,
    private _sharedService: SharedService
  ) { 
    this._sharedService.changeEmitted$.subscribe((event) => {
      switch (event.type) {
        case "HANDLE_OBSTETRIC_STEP_VISIBILITY":
          this.handleObstetricStepVisibility(event.data);
          break;
        case "SUBMIT_PROFILE_FORM":
          this.submitProfileForm();
          break;
      
        default:
          break;
      }
    });
  }

  ngOnInit() {
    this.getLocalStorage();
    this.globals.LoaderGlobal = false;
    console.log('initial step');
    //let profileData = this.getLocalStorage();
    if (this.globals.ProfileData != null) { 
       this.globals.Steps['1'] = this.globals.ProfileData['step1'];
       this.globals.Steps['2'] = this.globals.ProfileData['step2'];
       this.globals.Steps['3'] = this.globals.ProfileData['step3'];
       this.globals.Steps['4'] = this.globals.ProfileData['step4'];
       this.globals.Steps['5'] = this.globals.ProfileData['step5'];
       this.globals.Steps['6'] = this.globals.ProfileData['step6'];
       this.globals.Steps['7'] = this.globals.ProfileData['step7'];
       this.globals.Steps['8'] = this.globals.ProfileData['step8'];
    }
  }

  submitProfileForm() {
    this.profileDataService.saveProfileInfo();
  }

  handleObstetricStepVisibility(data: any) {
    this.showObstetricStep = data.showObstetricHistory;
    let dataToSet: ObstetricHistory;
    if (!this.showObstetricStep) {
      dataToSet = {
        'checkbox_14': [],
        'checkbox_15': [],
      }
    } else {
      dataToSet = {
        'checkbox_14': [],
        'checkbox_15': [],
      }
    }
    this.profileDataService.setObstetricHistory(dataToSet, false);
  }

  getLocalStorage()
  {
    this.profileDataService.getLocalStorage();
  }

}
