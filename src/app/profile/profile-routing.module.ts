import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';

import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { ObstetricHistoryComponent } from './obstetric-history/obstetric-history.component';
import { HabitsComponent } from './habits/habits.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { BloodParametersComponent } from './blood-parameters/blood-parameters.component';
import { FoodPreferenceComponent } from './food-preference/food-preference.component';
import { FitnessLevelComponent } from './fitness-level/fitness-level.component';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: 'personal-info',
                component: PersonalInfoComponent
            },
            {
                path: 'medical-history',
                component: MedicalHistoryComponent
            },
            {
                path: 'obstetric-history',
                component: ObstetricHistoryComponent
            },
            {
                path: 'habits',
                component: HabitsComponent
            },
            {
                path: 'measurements',
                component: MeasurementsComponent
            },
            {
                path: 'blood-parameters',
                component: BloodParametersComponent
            },
            {
                path: 'food-preference',
                component: FoodPreferenceComponent
            },
            {
                path: 'fitness-level',
                component: FitnessLevelComponent
            },
            { path: '**', redirectTo: 'personal-info' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }