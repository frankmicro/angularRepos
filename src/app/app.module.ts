import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from "./interceptor/httpconfig.interceptor";
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ImageCropperModule } from 'ngx-image-cropper';
import { Globals } from './helpers/globals';

import { AppRoutingModule } from './app-routing.module';
import { StudentModule } from './student/student.module';
import { ProfileModule } from './profile/profile.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { LinechartComponent } from './linechart/linechart.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssessmentFormModalComponent } from './assessment-form-modal/assessment-form-modal.component';
import { MedalhistoryComponent } from './medalhistory/medalhistory.component';
import { DailyblogComponent } from './dailyblog/dailyblog.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AvatarComponent } from './avatar/avatar.component';
import { NotificationComponent } from './notification/notification.component';
import { DecimaNumberDirectiveDirective } from './decima-number-only.directive';
import { FooterComponent } from './footer/footer.component';
import {EncrDecrService} from './services/encr-decr.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ForgotComponent,
    HeaderComponent,
    DashboardComponent,
    LinechartComponent,
    AssessmentComponent,
    AssessmentFormModalComponent,
    MedalhistoryComponent,
    DailyblogComponent,
    InstructionsComponent,
    ChangepasswordComponent,
    AvatarComponent,
    NotificationComponent,
    DecimaNumberDirectiveDirective,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    StudentModule,
    ProfileModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule,
    ImageCropperModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfigInterceptor, multi: true
    },
    [Title, ApiService, Globals,EncrDecrService]
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AssessmentFormModalComponent
  ],
})
export class AppModule { }