import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LinechartComponent } from './linechart/linechart.component';
import { AssessmentComponent } from "./assessment/assessment.component";
import { MedalhistoryComponent } from './medalhistory/medalhistory.component';
import { DailyblogComponent } from './dailyblog/dailyblog.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AvatarComponent } from './avatar/avatar.component';
import { AuthGuard } from './auth.guard';
import { NotificationComponent } from './notification/notification.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: LinechartComponent, canActivate: [AuthGuard] },
  { path: 'notification/assessment', component: AssessmentComponent, canActivate: [AuthGuard] },
  { path: 'notification/notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'medalhistory', component: MedalhistoryComponent, canActivate: [AuthGuard] },
  { path: 'dailyblog', component: DailyblogComponent, canActivate: [AuthGuard] },
  { path: 'instructions', component: InstructionsComponent, canActivate: [AuthGuard] },
  { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
  { path: 'avatar', component: AvatarComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }