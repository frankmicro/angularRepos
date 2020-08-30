import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms/forms.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule as forms, ReactiveFormsModule } from '@angular/forms';
import { ServerService } from '@shared/services/server.service';

const routes: Routes = [
  {
    'path': '',
    'children': [
      {
        'path': '',
        'component': FormsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [FormsComponent],
  providers:[ServerService],
  imports: [
    CommonModule,
    forms,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
})
export class FormsModule { }
