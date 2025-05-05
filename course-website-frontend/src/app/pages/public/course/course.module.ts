import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { IntroBlockComponent } from '../../../components/public/intro-block/intro-block.component';
import { TopicItemComponent } from '../../../components/public/topic-item/topic-item.component';
import { CourseModuleComponent } from "../../../components/public/course-module/course-module.component";
import { CourseStatsComponent } from '../../../components/public/course-stats/course-stats.component';
import { CourseBenefitsComponent } from "../../../components/public/course-benefits/course-benefits.component";
import { CourseStepsComponent } from "../../../components/public/course-steps/course-steps.component";
import { FaqItemComponent } from '../../../components/public/faq-item/faq-item.component';

@NgModule({
  declarations: [
    CourseComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    IntroBlockComponent,
    TopicItemComponent,
    CourseModuleComponent,
    CourseStatsComponent,
    CourseBenefitsComponent,
    CourseStepsComponent,
    FaqItemComponent,
  ]
})
export class CourseModule { }
