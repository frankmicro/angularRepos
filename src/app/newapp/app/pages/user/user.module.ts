import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  {
    'path': '',
    'children': [
      {
        'path': '',
        'component': UserComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    
  ]
})
export class UserModule { }
