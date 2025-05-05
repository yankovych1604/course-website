import { Routes } from '@angular/router';
import { authGuard } from './_system/_guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/public/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./pages/public/course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/public/courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/public/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/public/reviews/reviews.module').then(m => m.ReviewsModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/public/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/public/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/private/account/account.module').then(m => m.AccountModule),
    canActivate: [authGuard]
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/private/schedule/schedule.module').then(m => m.ScheduleModule),
    canActivate: [authGuard]
  }
];
