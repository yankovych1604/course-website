import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  { path: '', component: ScheduleComponent },
  { path: ':course/:module', component: ScheduleComponent },
  { path: ':course/filter/:period', component: ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
