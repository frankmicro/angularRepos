import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Habits, PersonalInfo } from "../data/profileData.model";;
import { ProfileDataService } from "../data/profileData.service";

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {
  
  previousStepUrl: string = '/profile/medical-history';
  showDrinkInputs: boolean = false;
  showSmokeInputs: boolean = false;
  habits: Habits;
  personalInfo: PersonalInfo;

  constructor(
    private router: Router,
    private profileDataService: ProfileDataService
  ) { }

  ngOnInit() {
    this.habits = this.profileDataService.getHabits();
    this.showDrinkInputs = this.habits['16'] === "Yes";
    this.showSmokeInputs = this.habits['20'] === "Yes";

    this.personalInfo = this.profileDataService.getPersonalInfo();
    if (this.personalInfo['3'] === "Female") {
      this.previousStepUrl = '/profile/obstetric-history';
    }
  }

  doUDrinkChangeHandler() {
    this.showDrinkInputs = this.habits['16'] === "Yes";
    this.resetDrinkFields();
  }

  doUSmokeChangeHandler() {
    this.showSmokeInputs = this.habits['20'] === "Yes";
    this.resetSmokeFields();
  }

  resetDrinkFields() {
    this.habits['18'] = '';
    this.habits['19'] = '';
  }

  resetSmokeFields() {
    this.habits['21'] = '';
  }

  save(): boolean {
    this.profileDataService.setHabits(this.habits, true);
    return true;
  }

  formValidHandler(): any {
    this.profileDataService.setHabits(this.habits, false);
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['/profile/measurements']);
    }
  }

  goToPrevious() {
    this.router.navigate([this.previousStepUrl]);
  }

}
