import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { MedicalHistory } from "../data/profileData.model";
import { PersonalInfo } from "../data/profileData.model";
import { ProfileDataService } from "../data/profileData.service";


@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  nextStepUrl: string = '/profile/habits';

  ailmentsInvalid: boolean = true;
  allergiesInvalid: boolean = true;

  ailmentOptions: any = [
    { id: 'gas_bloating', name: 'Gas/Bloating', value: 'Gas/Bloating', checked: false },
    { id: 'thyroid', name: 'Thyroid(quantify)', value: 'Thyroid(quantify)', checked: false },
    { id: 'constipation', name: 'Constipation', value: 'Constipation', checked: false },
    { id: 'high_blood_pressure', name: 'High Blood Pressure', value: 'High Blood Pressure', checked: false },
    { id: 'cardiac_issues', name: 'Cardiac Issues', value: 'Cardiac Issues', checked: false },
    { id: 'knee_pain', name: 'Knee Pain', value: 'Knee Pain', checked: false },
    { id: 'diabetes_mellitus', name: 'Diabetes Mellitus(quantify)', value: 'Diabetes Mellitus(quantify)', checked: false },
    { id: 'kidney', name: 'Kidney', value: 'Kidney', checked: false },
    { id: 'back_pain', name: 'Back Pain(Upper/Lower)', value: 'Back Pain(Upper/Lower)', checked: false },
    { id: 'high_cholestrol', name: 'High Cholestrol(quantify)', value: 'High Cholestrol(quantify)', checked: false },
    { id: 'polycystic_ovarian_disease', name: 'Polycystic Ovarian Disease(PCOD)', value: 'Polycystic Ovarian Disease(PCOD)', checked: false },
    { id: 'none_of_above', name: 'None of the above', value: 'None of the above', checked: false },
  ];

  allergyOptions: any = [
    { id: 'dairy', name: 'Dairy', value: 'Dairy', checked: false },
    { id: 'nuts', name: 'Nuts', value: 'Nuts', checked: false },
    { id: 'gluten', name: 'Gluten', value: 'Gluten', checked: false },
    { id: 'none', name: 'None', value: 'None', checked: false },
    { id: 'other_please_mention', name: 'Other Please Mention', value: 'Other Please Mention', checked: false },
  ];

  showOtherAllergyField: boolean = false;
  otherFoodAllergy: string = '';

  private medicalHistory: MedicalHistory;
  private personalInfo: PersonalInfo;
  constructor(
    private router: Router,
    private profileDataService: ProfileDataService
  ) { }

  ngOnInit() {
    this.activate();
  }

  activate() {
    this.medicalHistory = this.profileDataService.getMedicalHistory();
    this.ailmentOptions
      .map(opt => {
        return opt.checked = this.medicalHistory['checkbox_11'].includes(opt.value);
      });
    
    this.ailmentsInvalid = (this.medicalHistory['checkbox_11'].length < 1);

    this.allergyOptions
      .map(opt => {
        return opt.checked = this.medicalHistory['checkbox_12'].includes(opt.value);
      });
    
    this.allergiesInvalid = (this.medicalHistory['checkbox_12'].length < 1);

    if (this.medicalHistory['checkbox_12'].includes('Other Please Mention')) {
      this.showOtherAllergyField = true;
      this.otherFoodAllergy = this.medicalHistory['checkbox_12'][this.medicalHistory['checkbox_12'].length - 1];
    }

    this.personalInfo = this.profileDataService.getPersonalInfo();
    if (this.personalInfo['3'] === "Female") {
      this.nextStepUrl = '/profile/obstetric-history';
    }
  }

  ailmentOptionChangeHandler(option) {
    if (option.id === "none_of_above" && option.checked) {
      this.ailmentOptions
        .map(opt => {
          if (opt.id !== "none_of_above") {
            opt.checked = false;
          }
          return opt;
        });
    } else if (option.id !== "none_of_above" && option.checked) {
      this.ailmentOptions
        .map(opt => {
          if (opt.id === "none_of_above") {
            opt.checked = false;
          }
          return opt;
        });
    }

    this.medicalHistory['checkbox_11'] = this.selectedAilmentOptions();
    this.ailmentsInvalid = (this.medicalHistory['checkbox_11'].length < 1);

    if (this.ailmentsInvalid) {
      this.profileDataService.validationError(true, 2);
    } else {
      this.profileDataService.validationError(false, 2);
    }
  }

  selectedAilmentOptions() {
    return this.ailmentOptions
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  allergyOptionChangeHandler(option) {
    if (option.id === "other_please_mention") {
      this.showOtherAllergyField = option.checked;
      this.otherFoodAllergy = '';
    } else if (option.id === "none") {
      this.allergyOptions
        .map(opt => {
          if (opt.id !== "none") {
            opt.checked = false;
          }
          return opt;
        });
      this.showOtherAllergyField = false;
      this.otherFoodAllergy = '';
    }

    if (option.id !== "none" && option.checked) {
      this.allergyOptions
        .map(opt => {
          if (opt.id === "none") {
            opt.checked = false;
          }
          return opt;
        });
    }

    this.medicalHistory['checkbox_12'] = this.selectedAllergyOptions();
    this.allergiesInvalid = (this.medicalHistory['checkbox_12'].length < 1);

    if (this.allergiesInvalid) {
      this.profileDataService.validationError(true, 2);
    } else {
      this.profileDataService.validationError(false, 2);
    }
  }

  otherFoodAllergyChangeHandler() {
    this.medicalHistory['checkbox_12'] = this.selectedAllergyOptions();
  }

  selectedAllergyOptions() {
    let allergyArr = this.allergyOptions
      .filter(opt => opt.checked)
      .map(opt => opt.value);
    
    if (this.otherFoodAllergy !== "") {
      allergyArr.push(this.otherFoodAllergy);
    }

    return allergyArr;
  }

  save(): boolean {
    this.personalInfo = this.profileDataService.getPersonalInfo();
    if (this.personalInfo['3'] === "Female") { 
      this.profileDataService.setMedicalHistory(this.medicalHistory, true, 3);
    } else {
      this.profileDataService.setMedicalHistory(this.medicalHistory, true, 4);
    }
    
    return true;
  }

  formValidHandler(): any { 
    if (this.personalInfo['3'] === "Female") { 
      this.profileDataService.setMedicalHistory(this.medicalHistory, false, 3);
    } else {
      this.profileDataService.setMedicalHistory(this.medicalHistory, false, 4);
    }
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate([this.nextStepUrl]);
    }
  }

  goToPrevious() {
    this.router.navigate(['/profile/personal-info']);
  }

}