import { NgModule } from '@angular/core';
import { authGuard } from '../../../_system/_guards/auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
  { path: '', component: AccountComponent, children: [
      {
        path: 'info',
        canActivate: [authGuard],
        loadComponent: () => import('./account-info/account-info.component').then((m) => m.AccountInfoComponent),
      },
      {
        path: 'courses',
        canActivate: [authGuard],
        loadComponent: () => import('./account-courses/account-courses.component').then((m) => m.AccountCoursesComponent),
      },
      {
        path: 'certificates',
        canActivate: [authGuard],
        loadComponent: () => import('./account-certificates/account-certificates.component').then((m) => m.AccountCertificatesComponent),
      },
      {
        path: 'reviews',
        canActivate: [authGuard],
        loadComponent: () => import('./account-reviews/account-reviews.component').then((m) => m.AccountReviewsComponent),
      },
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'info'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
