import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { ForgotpasswordComponent } from './modules/forgotpassword/forgotpassword.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    'path': '',
    'children': [
      {
        'path': 'login',
        'component': LoginComponent,
      },
      {
        'path': 'register',
        'component': RegisterComponent,
      },
      {
        'path': 'logout',
        'component': LogoutComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent, ForgotpasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ]
})
export class AuthModule { }
