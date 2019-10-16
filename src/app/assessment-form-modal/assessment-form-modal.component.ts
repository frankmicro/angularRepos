import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbCalendarGregorian } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from "../services/api.service";
import { group } from '@angular/animations';
import { CustomValidators } from "ngx-custom-validators";
import { AlphaComma } from '../helpers/must-match.validator';
import { AuthService } from "../auth.service";
import Swal from 'sweetalert2';
import { Globals } from '../helpers/globals';

@Component({
  selector: 'app-assessment-form-modal',
  templateUrl: './assessment-form-modal.component.html',
  styleUrls: ['./assessment-form-modal.component.css']
})
export class AssessmentFormModalComponent implements OnInit {

  @Input() assessment: any;
  formFields: any = [];
  fields: any = [];
  assessmentForm: FormGroup;
  isReadonlyFields: boolean = false;
  hideSaveBtn: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.isReadonlyFields = (this.assessment.flag === 1);
    this.hideSaveBtn = (this.assessment.flag === 1 || this.assessment.flag === 2);
    this.assessmentForm = new FormGroup({});
    this.apiService.getAssessmentFormData(this.assessment.id, this.assessment.flag).subscribe((res) => {
      this.formFields = res.data;
      this.formFields = this.formatFormFields(this.formFields);
      let group = {};
      this.formFields.forEach(input_template => {
        let value = '';
        if (input_template.input_type == 'radio_button' || input_template.input_type == 'select') {
          let selectedOptionArr = input_template.values.filter((input) => { return input.is_selected === 1 });
          let selectedOption = selectedOptionArr.length > 0 ? selectedOptionArr[0] : null;
          value = selectedOption !== null ? selectedOption.title : '';
        } else {
          value = input_template.answers && input_template.answers !== null ? input_template.answers : '';
        }

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
              validatorsRules.push(AlphaComma(input_template.id.toString()));
              break;
          }
        });

        group[input_template.id] = new FormControl(value, validatorsRules);
        console.log(validatorsRules);
      })
      this.assessmentForm = new FormGroup(group);
    });
  }

  get formControls() {
    return this.assessmentForm.controls;
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  submitAssessment() {
    this.globals.LoaderGlobal = true;
    let formValues = this.assessmentForm.value;
    console.log(formValues);
    let answers = [];
    for (let key in formValues) {
      let answerObj = {
        'questionId' : key,
        'content' : formValues[key]
      };
      answers.push(answerObj);
    }

    let user = this.authService.decrypt();

    let payload = {
      "userId": user.id,
      "stageId": this.assessment.id,
      "answers" : answers
    };

    this.apiService.saveAssessment(payload).subscribe((res) => {
      if (res.status === 200) {
        this.assessment.flag = 1;
        this.closeModal();
        Swal.fire('Success', 'Successfully Saved the assessment!', 'success');
      } else {
        console.log(res.response.message);
        Swal.fire('Error', "Assessment is not saved", 'error');
      }
      this.globals.LoaderGlobal = false;
    });
  }

}