import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AssessmentFormModalComponent } from "../assessment-form-modal/assessment-form-modal.component";
import { Globals } from '../helpers/globals';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  private assessments: any = [];
  private subscription: ISubscription;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.LoaderGlobal = true;
    this.subscription = this.apiService.getAssessments().subscribe((res) => {
      let response = res['response'].success;
      this.assessments = response.data;
      this.globals.LoaderGlobal = false;
    });
  }

  openAssessmentFormModal(assessment) {
    if(assessment.flag === 3 || assessment.flag === 2) {
      return false;
    }

    const assessModal = this.modalService.open(AssessmentFormModalComponent);
    assessModal.componentInstance.assessment = assessment;
    assessModal.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
