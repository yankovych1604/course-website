import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SignInComponent,
  ],
    imports: [
        CommonModule,
        SignInRoutingModule,
        ReactiveFormsModule
    ]
})
export class SignInModule { }
