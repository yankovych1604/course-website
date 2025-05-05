import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import {TutorCardComponent} from '../../../components/public/tutor-card/tutor-card.component';


@NgModule({
  declarations: [
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    TutorCardComponent,
  ]
})
export class AboutUsModule { }
