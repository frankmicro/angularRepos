import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Globals } from '../helpers/globals';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from "ngx-custom-validators";
import { AlphaComma } from '../helpers/must-match.validator';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
 
export class DashboardComponent implements OnInit {
  private showChallengeModal:boolean = false;
  private googleSyncModal:boolean = false;
  private data:any = [];
  private bonusMedals:any = [];
  private dailyChallenge:any = [];
  private totalStages:any = [];
  private stages:Object = this.globals.Stages;
  private stageHistory:number = null;
  private noOfPerson:number = 0;
  private stageTopper:Object;
  private dayWiseBlog:Object = {};
  private blogContent:any;
  private challengeData:any = [];
  private challengeObj:Object = {};
  private notificationId:number;
  protected butLoader:boolean = false;
  private waterInTake: number = 0;
  private subscription: ISubscription;

  challengeForm: FormGroup;
  isReadonlyFields = false;
  challengeFields = [];

  constructor(
    private apiService: ApiService,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.globals.LoaderGlobal = true;

    this.subscription = this.apiService.getDashboard().subscribe((res)=> {
      let response = res['response'].success;
      let arr = [];
      for (let i = 0; i < Object.keys(this.globals.DashboardClasses).length; i++) {
        let obj = {};
        let index = response.dailySyncData[i].value.indexOf(" ");  // Gets the first index where a space occours
        let value = response.dailySyncData[i].value.substr(0, index); // Gets the first part
        let unit = response.dailySyncData[i].value.substr(index + 1);
        
        obj['title'] = response.dailySyncData[i].title;
        obj['value'] = value;
        obj['unit'] = unit;
        obj['class'] = "sprite "+ this.globals.DashboardClasses[i+1];
        arr.push(obj);
      }
      this.dailyChallenge = arr;
      this.bonusMedals = response.bonusMedals; 
      this.stageHistory = response.stageHistory;
      this.noOfPerson = response.noOfPerson;
      this.stageTopper = response.stageTopper;
      this.dayWiseBlog = response.getDayWiseBlog;
      this.blogContent = response.getDayWiseBlog.content.substr(0, 70)+'...';
      this.globals.LoaderGlobal = false;
    });

    this.challengeForm = new FormGroup({});
  }

  ngDoCheck() { //gets called on every change detection
    let arr = [];
    for(let i=1;i<=this.stages;i++) {
      arr.push(i);
    }
    this.totalStages = arr;
  }

  openChallengePopup() {
    this.apiService.getChallengeFileds().subscribe((res) => {
       if(res.status==200)
       {
         this.challengeData=res.data;
         console.log(this.challengeData);
         this.challengeFields = this.formatFormFields(this.challengeData);

      let group = {};
      this.challengeFields.forEach(input_template => {
        let value = '';
        let validatorsRules = [];
        input_template.validation_rules.forEach(rule => {
          let ruleArr = rule.split(':');
          switch (ruleArr[0].trim()) {
            case "required":
              validatorsRules.push(Validators.required);
              break;
            case "decimal":
              validatorsRules.push(CustomValidators.number);
              break;
            case "numericOnly":
              validatorsRules.push(CustomValidators.digits);
              break;
            case "maxlength":
              validatorsRules.push(CustomValidators.rangeLength([1, ruleArr[1]]));
              break;
            case "range":
              validatorsRules.push(CustomValidators.number);
              if (ruleArr[1] !== undefined) {
                let rangeValues = ruleArr[1].replace(/[\[\]']+/g, '').split(',');
                validatorsRules.push(CustomValidators.min(rangeValues[0]));
                validatorsRules.push(CustomValidators.max(rangeValues[1]));
              }
              break;
            case "alphaComma":
              validatorsRules.push(AlphaComma(input_template.input_name.toString()));
              break;
          }
        });

        group[input_template.input_name] = new FormControl(value, validatorsRules);
      })
      this.challengeForm = new FormGroup(group);
        this.showChallengeModal = true;
        if(this.challengeData.length){          
    	      let cut=this.challengeData.length-1;
            this.notificationId=this.challengeData[cut].notification_id;
        }
       }else{

       }
       
    });
  }


  savedailyChallenge()
  {
    let formValues = this.challengeForm.value;


  /*	let apiObj= {
		    "api":true,
    		"notification_id" : this.notificationId,
        "user_id" : this.userId,
	   }
  
    var obj = Object.assign(formValues, apiObj);
    console.log(obj);*/
  	this.butLoader=true;
  	this.apiService.savedailyChallenge(formValues,this.notificationId).subscribe((res) => {
       console.log(res);
       if(res.code==200){
         Swal.fire('Success', res.message, 'success')
          	this.closeModel();
       	}else{
       		Swal.fire('Error', res.message, 'error')
       	}
       	this.butLoader=false;
       
    });
  }

  closeModel()
  {
    this.showChallengeModal = false;
  }

  
  get formControls() {
    return this.challengeForm.controls;
  }

  formatFormFields(formFields) {
    let newFields = formFields.map(field => {
      let validationMessages = {};
      field.validation_rules.forEach(rule => {
        let ruleArr = rule.split(':');
        switch (ruleArr[0].trim()) {
          case "required":
            validationMessages['required'] = 'This field is required';
            break;
          case "decimal":
            validationMessages['number'] = 'Please enter a correct number, format 0.00';
            break;
          case "numericOnly":
            validationMessages['digits'] = 'Please only enter numeric values (0-9)';
            break;
          case "maxlength":
            validationMessages['rangeLength'] = 'Please enter only ' + ruleArr[1] + ' digits';
            break;
          case "range":
            let rangeValues = ruleArr[1].replace(/[\[\]']+/g, '').split(',');
            validationMessages['number'] = 'Please enter a correct number, format 0.00';
            validationMessages['min'] = 'The field range is from ' + rangeValues[0] + ' to ' + rangeValues[1];
            validationMessages['max'] = 'The field range is from ' + rangeValues[0] + ' to ' + rangeValues[1];
            break;
          case "alphaComma":
            validationMessages['alphaComma'] = 'Letters and Commas(,) only please';
            break;
        }
      });
      field.validation_messages = validationMessages;
      return field;
    });
    return newFields;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
