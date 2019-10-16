import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileRoutingModule } from './profile-routing.module';

import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { ObstetricHistoryComponent } from './obstetric-history/obstetric-history.component';
import { HabitsComponent } from './habits/habits.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { BloodParametersComponent } from './blood-parameters/blood-parameters.component';
import { FoodPreferenceComponent } from './food-preference/food-preference.component';
import { FitnessLevelComponent } from './fitness-level/fitness-level.component';
import { DecimaNumberDirectiveDirective } from './directive/decimal-number.directive';
import { OnlyAlphabetsDirective } from './directive/only-alphabets.directive';

@NgModule({
  declarations: [NavigationComponent, ProfileComponent, PersonalInfoComponent, MedicalHistoryComponent, ObstetricHistoryComponent, HabitsComponent, MeasurementsComponent, BloodParametersComponent, FoodPreferenceComponent, FitnessLevelComponent, DecimaNumberDirectiveDirective, OnlyAlphabetsDirective],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
