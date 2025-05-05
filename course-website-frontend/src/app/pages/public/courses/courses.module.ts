import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursespageCardComponent } from '../../../components/public/coursespage-card/coursespage-card.component';


@NgModule({
  declarations: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CoursespageCardComponent,
  ]
})
export class CoursesModule { }
