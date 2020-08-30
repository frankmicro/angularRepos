import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './level/level.component';
import { RouterModule, Routes } from '@angular/router';
import { Level2Component } from './level2/level2.component';

const routes: Routes = [
  {
    'path': '',
    'children': [
      {
        'path': '',
        'component': LevelComponent,
      },
      {
        'path' : 'level2',
        'component' : Level2Component,
      }
    ],
  },
];


@NgModule({
  declarations: [LevelComponent, Level2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LevelModule { }
