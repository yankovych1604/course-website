import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserResponse } from '../../../../_system/_interfaces/user';
import { UserStateService } from '../../../../_system/_services/user-state/user-state.service';
import { Subscription } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-info',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    NgxMaskDirective
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
  standalone: true,
  providers: [
    provideNgxMask()
  ]
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  public userId: string = '';
  public userForm!: FormGroup;
  public userData!: UserResponse;
  public successTimeoutId: any;
  public noChangesTimeoutId: any;
  public noChangesWarning: boolean = false;
  public showSuccessMessage: boolean = false;
  public currentUserSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userStateService: UserStateService,
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.userData = user;
        this.userId = this.userData.id;

        this.initForm()
      }
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: [
        this.userData.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґA-ZА-ЯІЇЄҐ']+$/u)
        ]
      ],
      lastName: [
        this.userData.lastName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґA-ZА-ЯІЇЄҐ']+$/u)
        ]
      ],
      email: [
        this.userData.email,
        [
          Validators.required,
          Validators.pattern(/^[\w.]+@(gmail\.com|ukr\.net|icloud\.com)$/)
        ]
      ],
      phone: [
        this.userData.phone,
        [
          Validators.required,
          Validators.pattern(/^380\d{9}$/)
        ]
      ]
    });
  }

  getFieldErrors(field: string) {
    return this.userForm.get(field)?.errors;
  }

  isFieldInvalid(field: string) {
    const control = this.userForm.get(field);

    return control?.touched && control?.invalid;
  }

  closeAllSnackbars(): void {
    if (this.noChangesTimeoutId) {
      clearTimeout(this.noChangesTimeoutId);
      this.noChangesTimeoutId = null;
    }

    if (this.successTimeoutId) {
      clearTimeout(this.successTimeoutId);
      this.successTimeoutId = null;
    }

    this.noChangesWarning = false;
    this.showSuccessMessage = false;
  }

  onSubmit() {
    if (!this.userForm.dirty) {
      this.noChangesWarning = true;

      if (this.noChangesTimeoutId) {
        clearTimeout(this.noChangesTimeoutId);
      }

      this.noChangesTimeoutId = setTimeout(() => {
        this.noChangesWarning = false;
        this.noChangesTimeoutId = null;
      }, 3000);

      return;
    }

    if (this.userForm.valid) {
      const updatedData = this.userForm.value;

      this.userStateService.updateUserData(this.userId, updatedData).subscribe(data => {
        this.userData = data;
        this.showSuccessMessage = true;

        if (this.successTimeoutId) {
          clearTimeout(this.successTimeoutId);
        }

        this.successTimeoutId = setTimeout(() => {
          this.showSuccessMessage = false;
          this.successTimeoutId = null;
        }, 3000);

        this.userForm.markAsPristine();
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
