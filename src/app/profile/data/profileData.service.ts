import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Globals } from '../../helpers/globals';
import { Router } from "@angular/router";
import {EncrDecrService} from '../../services/encr-decr.service';
import { AuthService } from '../../auth.service';

import {
    ProfileData,
    PersonalInfo,
    MedicalHistory,
    ObstetricHistory,
    Habits,
    Measurements,
    BloodParameters,
    FoodPreference,
    FitnessLevel
} from "./profileData.model";
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Injectable({
    providedIn: 'root'
})
export class ProfileDataService {

    private profileData: ProfileData = new ProfileData();
    private isPersonalInfoFormValid: boolean = false;
    private isMedicalHistoryFormValid: boolean = false;
    private isObstetricHistoryFormValid: boolean = false;
    private isHabitsFormValid: boolean = false;
    private isMeasurementsFormValid: boolean = false;
    private isBloodParametersFormValid: boolean = false;
    private isFoodPreferenceFormValid: boolean = false;
    private isFitnessLevelFormValid: boolean = false;

    constructor(
        private apiService: ApiService,
        private globals:Globals,
        private router: Router,
        private EncrDecr: EncrDecrService,
        private authService: AuthService
      ) { }

    getPersonalInfo(): PersonalInfo {
        // Return the PersonalInfo data
        var personalInfo: PersonalInfo = {
            ['1']: this.profileData['1'],
            ['2']: this.profileData['2'],
            ['3']: this.profileData['3'],
            ['4']: this.profileData['4'],
            ['5']: this.profileData['5'],
            ['6']: this.profileData['6'],
            ['checkbox_7']: this.profileData['checkbox_7'],
            ['9']: this.profileData['9'],
            ['8']: this.profileData['8'],
            ['10']: this.profileData['10'],
        };
        return personalInfo;
    }

    setPersonalInfo(data: PersonalInfo, stepManipulation: boolean) {
        // Update the PersonalInfo data only when the PersonalInfo Form had been validated successfully
        this.isPersonalInfoFormValid = true;
        this.profileData['1'] = data['1'];
        this.profileData['2'] = data['2'];
        this.profileData['3'] = data['3'];
        this.profileData['4'] = data['4'];
        this.profileData['5'] = data['5'];
        this.profileData['6'] = data['6'];
        this.profileData['checkbox_7'] = data['checkbox_7'];
        this.profileData['9'] = data['9'];
        this.profileData['8'] = data['8'];
        this.profileData['10'] = data['10'];
        if (stepManipulation) {
            this.profileData['step2'] = true;
        }
        this.setLocalStorage();

    }

    getMedicalHistory(): MedicalHistory {
        // Return the MedicalHistory data
        var medicalHistory: MedicalHistory = {
            ['checkbox_11']: this.profileData['checkbox_11'],
            ['checkbox_12']: this.profileData['checkbox_12'],
            ['13']: this.profileData['13'],
        };
        return medicalHistory;
    }

    setMedicalHistory(data: MedicalHistory, stepManipulation: boolean, step:number) {
        // Update the MedicalHistory data only when the MedicalHistory Form had been validated successfully
        this.isMedicalHistoryFormValid = true;
        this.profileData['checkbox_11'] = data['checkbox_11'];
        this.profileData['checkbox_12'] = data['checkbox_12'];
        this.profileData['13'] = data['13'];
        if (stepManipulation) {
            if (step == 3) {
                this.profileData['step3'] = true;
            } else {
                this.profileData['step4'] = true;
            }
        }
        this.setLocalStorage();
    }

    getObstetricHistory(): ObstetricHistory {
        // Return the ObstetricHistory data
        var obstetricHistory: ObstetricHistory = {
            ['checkbox_14']: this.profileData['checkbox_14'],
            ['checkbox_15']: this.profileData['checkbox_15'],
        };
        return obstetricHistory;
    }

    setObstetricHistory(data: ObstetricHistory, stepManipulation:boolean) {
        // Update the ObstetricHistory data only when the ObstetricHistory Form had been validated successfully
        this.isObstetricHistoryFormValid = true;
        this.profileData['checkbox_14'] = data['checkbox_14'];
        this.profileData['checkbox_15'] = data['checkbox_15'];
        if (stepManipulation) {
            this.profileData['step4'] = true;
        }
        this.setLocalStorage();
    }

    getHabits(): Habits {
        // Return the Habits data
        var habits: Habits = {
            ['16']: this.profileData['16'],
            ['18']: this.profileData['18'],
            ['19']: this.profileData['19'],
            ['20']: this.profileData['20'],
            ['21']: this.profileData['21'],
            ['22']: this.profileData['22'],
        };
        return habits;
    }

    setHabits(data: Habits, stepManipulation: boolean) {
        // Update the Habits data only when the Habits Form had been validated successfully
        this.isHabitsFormValid = true;
        this.profileData['16'] = data['16'];
        this.profileData['18'] = data['18'];
        this.profileData['19'] = data['19'];
        this.profileData['20'] = data['20'];
        this.profileData['21'] = data['21'];
        this.profileData['22'] = data['22'];
        if (stepManipulation) {
            this.profileData['step5'] = true;
        }
        this.setLocalStorage();
    }

    getMeasurements(): Measurements {
        // Return the Measurements data
        var measurements: Measurements = {
           // step_5_q_1: this.profileData.step_5_q_1,
            ["23"]: this.profileData['23'],
            ["24"]: this.profileData['24'],
            ["25"]: this.profileData['25']
        };
        return measurements;
    }

    setMeasurements(data: Measurements, stepManipulation: boolean ) {
        // Update the Measurements data only when the Measurements Form had been validated successfully
        this.isMeasurementsFormValid = true;
        this.profileData['23'] = data['23'];
        this.profileData['24'] = data['24'];
        this.profileData['25'] = data['25'];
        if (stepManipulation) {
            this.profileData['step6'] = true;
        }
        this.setLocalStorage();

    }

    getBloodParameters(): BloodParameters {
        // Return the BloodParameters data
        var bloodParameters: BloodParameters = {
            ["26"]: this.profileData['26'],
            ["28"]: this.profileData['28'],
            ["33"]: this.profileData['33'],
            ["34"]: this.profileData['34'],
            ["35"]: this.profileData['35'],
            ["36"]: this.profileData['36'],
            ["37"]: this.profileData['37'],
            ["38"]: this.profileData['38']
        }; 
        return bloodParameters;
    }

    setBloodParameters(data: BloodParameters, stepManipulation: boolean) {
        // Update the BloodParameters data only when the BloodParameters Form had been validated successfully
        this.isBloodParametersFormValid = true;
        this.profileData['26'] = data['26'];
        this.profileData['28'] = data['28'];
        this.profileData['33'] = data['33'];
        this.profileData['34'] = data['34'];
        this.profileData['35'] = data['35'];
        this.profileData['36'] = data['36'];
        this.profileData['37'] = data['37'];
        this.profileData['38'] = data['38'];
        if (stepManipulation) {
            this.profileData['step7'] = true;
        }
        this.setLocalStorage();
    }

    getFoodPreference(): FoodPreference {
        // Return the FoodPreference data
        var foodPreference: FoodPreference = {
        ['29']: this.profileData['29']
        }
        return foodPreference;
    }

    setFoodPreference(data: FoodPreference, stepManipulation: boolean) {
        // Update the FoodPreference data only when the FoodPreference Form had been validated successfully
       this.isFoodPreferenceFormValid = true;
       this.profileData['29'] = data['29'];
        if (stepManipulation) {
            this.profileData['step8'] = true;
        }
       this.setLocalStorage();
    }

    getFitnessLevel(): FitnessLevel {
        // Return the FitnessLevel data
        var fitnessLevel: FitnessLevel = {
            ['30']:this.profileData['30'],
            ['31']:this.profileData['31'],
            ['32']:this.profileData['32'],
            ['40']:this.profileData['40']
        };
        return fitnessLevel;
    }

    setFitnessLevel(data: FitnessLevel) {
        // Update the FitnessLevel data only when the FitnessLevel Form had been validated successfully
        this.isFitnessLevelFormValid = true;
        this.profileData['30'] = data['30'];
        this.profileData['31'] = data['31'];
        this.profileData['32'] = data['32'];
        this.profileData['40'] = data['40'];
        this.setLocalStorage();
    }

    getProfileData(): ProfileData {
        // Return the entire Form Data
        return this.profileData;
    }

    resetProfileData(): ProfileData {
        // Return the form data after all this.* members had been reset
        this.profileData.clear();
        this.isPersonalInfoFormValid = this.isMedicalHistoryFormValid = this.isObstetricHistoryFormValid = this.isHabitsFormValid = this.isMeasurementsFormValid = this.isBloodParametersFormValid = this.isFoodPreferenceFormValid = this.isFitnessLevelFormValid = false;
        return this.profileData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalInfoFormValid &&
               this.isMedicalHistoryFormValid &&
               this.isObstetricHistoryFormValid &&
               this.isHabitsFormValid &&
               this.isMeasurementsFormValid &&
               this.isBloodParametersFormValid &&
               this.isFoodPreferenceFormValid &&
               this.isFitnessLevelFormValid;
    }

    setLocalStorage()
    {   
        localStorage.setItem('profileData',this.EncrDecr.set(JSON.stringify(this.profileData)));  
    }

    getLocalStorage()
    {   
        let isProfileData=localStorage.getItem('profileData');
        if(isProfileData) {
            this.profileData =JSON.parse(this.EncrDecr.get(localStorage.getItem('profileData')));
        }
        return isProfileData;
    }
    
    //save user profile
    saveProfileInfo()
    {
        this.globals.LoaderGlobal=true;
        this.apiService.saveProfileInfo(this.profileData).subscribe((res) => {
            if(res.status=="success"){
                Swal.fire('Success', 'Successfully Saved the profile!', 'success');
                localStorage.removeItem('profileData');  
                let userData = this.authService.userDetails();

                // Change value
                userData.is_profile = 2

                // Save the new item with updated value
                this.authService.updateUserFlags(userData);

                this.globals.Flags.IsProfileFlag = 2;
                
                this.router.navigate(['/dashboard']);
            }else{
                 Swal.fire('Error', "Profile is not saved", 'error');
            }
            this.globals.LoaderGlobal=false;
         });
    }


    updateSteps(step : string) {
        this.globals.Steps[step] = true;
    }

    validationError(error:boolean, step:number) {
        if (error) {
            this.globals.Steps = {
                '1': false,
                '2': false,
                '3': false,
                '4': false,
                '5': false,
                '6': false,
                '7': false,
                '8': false,
            }
            this.globals.Steps[step] = true;
        } else {
            let stepsArr =this.isProfileData();
            if (stepsArr) {
                this.globals.Steps['1'] = stepsArr.step1;
                this.globals.Steps['2'] = stepsArr.step2;
                this.globals.Steps['3'] = stepsArr.step3;
                this.globals.Steps['4'] = stepsArr.step4;
                this.globals.Steps['5'] = stepsArr.step5;
                this.globals.Steps['6'] = stepsArr.step6;
                this.globals.Steps['7'] = stepsArr.step7;
                this.globals.Steps['8'] = stepsArr.step8;
            }
        }
        //this.globals.Steps[self] = true;
    }

    isProfileData() {
        return JSON.parse(this.EncrDecr.get(localStorage.getItem('profileData')));
    }

    setProfileDataObj(Data)
    {
        this.profileData=Data;
        this.profileData['step1'] = true;
        this.profileData['step2'] = true;
        this.profileData['step3'] = true;
        this.profileData['step4'] = true;
        this.profileData['step5'] = true;
        this.profileData['step6'] = true;
        this.profileData['step7']= true;
        this.profileData['step8']= true;
        this.setLocalStorage();
    }


}