import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ObstetricHistory } from "../data/profileData.model";;
import { ProfileDataService } from "../data/profileData.service";

@Component({
  selector: 'app-obstetric-history',
  templateUrl: './obstetric-history.component.html',
  styleUrls: ['./obstetric-history.component.css']
})
export class ObstetricHistoryComponent implements OnInit {

  regularPeriods: string = '';
  menopaused: string = '';

  obstetricHistory: ObstetricHistory;
  constructor(
    private router: Router,
    private profileDataService: ProfileDataService
  ) { }

  ngOnInit() {
    this.obstetricHistory = this.profileDataService.getObstetricHistory();
    this.regularPeriods = this.obstetricHistory['checkbox_14'][0];
    this.menopaused = this.obstetricHistory['checkbox_15'][0];
  }

  regularPeriodsChangeHandler() {
    this.obstetricHistory['checkbox_14'] = [this.regularPeriods];
  }

  menopausedChangeHandler() {
    this.obstetricHistory['checkbox_15'] = [this.menopaused];
  }

  save(): boolean {
    this.profileDataService.setObstetricHistory(this.obstetricHistory, true);
    return true;
  }

  formValidHandler(): any {
    this.profileDataService.setObstetricHistory(this.obstetricHistory, true);
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['/profile/habits']);
    }
  }

  goToPrevious() {
    this.router.navigate(['/profile/medical-history']);
  }

}
