import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleItemComponent } from '../../../components/private/schedule-item/schedule-item.component';


@NgModule({
  declarations: [
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    ScheduleItemComponent,
  ]
})
export class ScheduleModule { }
