import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FoodPreference } from "../data/profileData.model";;
import { ProfileDataService } from "../data/profileData.service";

@Component({
  selector: 'app-food-preference',
  templateUrl: './food-preference.component.html',
  styleUrls: ['./food-preference.component.css']
})
export class FoodPreferenceComponent implements OnInit {
  data: any = {};



  foodPreference: FoodPreference;
  constructor(
    private router: Router,
    private profileDataService: ProfileDataService
  ) { }

  ngOnInit() {
    this.foodPreference = this.profileDataService.getFoodPreference();
  }

  save(): boolean {
    this.profileDataService.setFoodPreference(this.foodPreference, true);
    return true;
  }

  formValidHandler(): any {
    this.profileDataService.setFoodPreference(this.foodPreference, false);
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['/profile/fitness-level']);
    }
  }

  goToPrevious() {
    this.router.navigate(['/profile/blood-parameters']);
  }

}
