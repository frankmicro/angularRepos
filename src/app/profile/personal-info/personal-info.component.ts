import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PersonalInfo } from "../data/profileData.model";
import { ProfileDataService } from "../data/profileData.service";
import { SharedService } from "../../services/shared.service";
import { ApiService } from '../../services/api.service';
import { Globals } from '../../helpers/globals';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  isFormValid: boolean = false;
  dobObject: any = '';
  goalsInvalid: boolean = true;
  showErrorMsgGoalsForcefully: boolean = false;
  goalOptions: any = [
    { id: 'inch_loss', name: 'Inch Loss', value: 'Inch Loss', checked: false },
    { id: 'disease', name: 'Disease Management', value: 'Disease Management', checked: false },
    { id: 'healthy', name: 'Healthy Eating', value: 'Healthy Eating', checked: false },
    { id: 'all_of_above', name: 'All of the Above', value: 'All of the Above', checked: false }
  ];
  private userData: any = {};

  private personalInfo: PersonalInfo;
  constructor(
    private router: Router,
    private profileDataService: ProfileDataService,
    private _sharedService: SharedService,
    private apiService: ApiService,
    private globals:Globals,
    private AuthService: AuthService,
  ) { }

  ngOnInit() {
    this.activate();
  }

  ngDoCheck() {
    console.log(this.globals.Steps);
  }
 
  activate() {
    //Temp
    //if local storage is empty then 
    if(!this.profileDataService.getLocalStorage()){
      //get the data from server
      if(this.AuthService.isProfile()==2){
        this.globals.LoaderGlobal=true;
        this.apiService.getProfileData().subscribe((res) => {
          if(res){
            if(res.status==200){
              this.profileDataService.setProfileDataObj(res.data);
              this.bootstrapComponent();
            }
          }
          this.globals.LoaderGlobal=false;
        });
      }
    }
    this.bootstrapComponent();
    this.userData=this.AuthService.userDetails();
  }

  bootstrapComponent() {
    this.personalInfo = this.profileDataService.getPersonalInfo();
    this.goalOptions
      .map(opt => {
        return opt.checked = this.personalInfo['checkbox_7'].includes(opt.value);
      });
    this.goalsInvalid = (this.personalInfo['checkbox_7'].length < 1);
    if (this.personalInfo['1'] !== "" && this.personalInfo['1'] !== null) {
      let dobArr = this.personalInfo['1'].split('-');
      while (dobArr[1].charAt(0) === '0') {
        dobArr[1] = dobArr[1].substr(1);
      }
      while (dobArr[2].charAt(0) === '0') {
        dobArr[2] = dobArr[2].substr(1);
      }
      this.dobObject = {
        year: parseInt(dobArr[0]),
        month: parseInt(dobArr[1]),
        day: parseInt(dobArr[2])
      };
    }
    this.obstetricStepVisibilityHandler(this.personalInfo['3']);
  }

  dobSelectHandler() {
    let year = this.dobObject.year;
    let month = this.dobObject.month < 10 ? '0' + this.dobObject.month : this.dobObject.month;
    let day = this.dobObject.day < 10 ? '0' + this.dobObject.day : this.dobObject.day;
    let date = year + '-' + month + '-' + day;
    this.personalInfo['1'] = date;

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let age = currentYear - year;
    this.personalInfo['2'] = age + ' years';
  }

  goalOptionChangeHandler(option) {
    if (option.id === "all_of_above") {
      this.goalOptions.map(opt => {return opt.checked = option.checked;});
    }
    if (!option.checked) {
      this.goalOptions
        .map(opt => {
          if (opt.id === "all_of_above") {
            opt.checked = false;
          }
          return opt;
        });
    }

    this.personalInfo['checkbox_7'] = this.selectedGoalOptions();
    this.goalsInvalid = (this.personalInfo['checkbox_7'].length < 1);
    debugger;
    if(this.goalsInvalid) {
      debugger;
      this.profileDataService.validationError(true, 1);
    } else {
      this.profileDataService.validationError(false, 1);
    }
    
  }

  selectedGoalOptions() {
    return this.goalOptions
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  genderChangeHandler() {
    this.obstetricStepVisibilityHandler(this.personalInfo['3']);
  }

  obstetricStepVisibilityHandler(gender: string) {
    let showObstetricHistory = this.personalInfo['3'] === "Female";
    let event = {
      type: "HANDLE_OBSTETRIC_STEP_VISIBILITY",
      data: {
        'showObstetricHistory': showObstetricHistory
      }
    };
    this._sharedService.emitChange(event);
  }

  save(): boolean {
    this.profileDataService.setPersonalInfo(this.personalInfo, true);
    return true;
  }

  formValidHandler(): any {
    this.profileDataService.setPersonalInfo(this.personalInfo, false);
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['/profile/medical-history']);
    }
  }
}

// user_id: 48
// 1: 1993 - 07 - 03
// 2: 26 years
// 3: Male
// 5: Yes
// 4: engineer
// 6: 9
// checkbox_7[]: Inch Loss
// checkbox_7[]: Disease Management
// checkbox_7[]: Healthy Eating
// checkbox_7[]: All of the Above
// 9: 7
// 10: 30
// checkbox_11[]: None of the above
// checkbox_12[]: Other Please Mention
// checkbox_12[]: other food allergy
// 13: Once in three months
// checkbox_14[]: Yes
// checkbox_15[]: Yes
// 16: No
// 18:
// 19:
// 20: Yes
// 21: 4
// 22: 4
// 23: 32
// 24: 55
// 25: 180
// 26: 9.78
// 33: 4.3
// 34: 15.2
// 35: 12.3
// 36: 2.74
// 37: 0.02
// 38: 2.74
// 28: 15.2
// 29: Non Vegetarian
// 30: 30
// 31: 300
// 32: 20