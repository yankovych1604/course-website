import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisteredUser, RegisterRequest, RegisterResponse } from '../../../_system/_interfaces/register';
import { RegisterService } from '../../../_system/_services/register/register.service';
import {TokenService} from '../../../_system/_services/token/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  public userToken!: string;
  public userData!: RegisteredUser;
  public registerRequest!: RegisterRequest;
  public registerResponse!: RegisterResponse;
  public formSubmitted: boolean = false;
  public isRegisterSuccess: boolean = true;
  public mismatchOnceShown: boolean = false;
  public isPasswordVisible: boolean = false;
  private registerErrorTimeoutId: any = null;
  public isConfirmPasswordVisible: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private registerService: RegisterService,
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґA-ZА-ЯІЇЄҐ']+$/u)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґA-ZА-ЯІЇЄҐ']+$/u)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w.]+@(gmail\.com|ukr\.net|icloud\.com)$/)
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^380\d{9}$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]
      ],
      confirmPassword: [
        '',
        Validators.required
      ],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.updateValueAndValidity({ onlySelf: false});
    });

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.registerForm.updateValueAndValidity({ onlySelf: false });

      if (this.mismatchOnceShown) {
        this.mismatchOnceShown = false;
      }
    });
  }

  getFieldErrors(field: string) {
    return this.registerForm.get(field)?.errors;
  }

  isFieldInvalid(field: string) {
    const control = this.registerForm.get(field);

    return control?.touched && control?.invalid;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.registerErrorTimeoutId) {
      clearTimeout(this.registerErrorTimeoutId);
      this.registerErrorTimeoutId = null;
    }

    if (this.registerForm.valid) {
      const { confirmPassword, ...formValue } = this.registerForm.value;
      this.registerRequest = formValue;

      this.registerService.register(this.registerRequest).subscribe({
        next: (data) => {
          if (data) {
            this.registerResponse = data;
            this.isRegisterSuccess = true;

            this.userData = this.registerResponse.user;
            this.userToken = this.registerResponse.token;

            this.tokenService.token = this.userToken;

            this.router.navigate(['']);
            this.registerForm.reset();

            this.formSubmitted = false;
            this.mismatchOnceShown = false;
          }
        },
        error: () => {
          this.isRegisterSuccess = false;

          this.registerErrorTimeoutId = setTimeout(() => {
            this.isRegisterSuccess = true;
            this.registerErrorTimeoutId = null;
          }, 3000);

          this.formSubmitted = false;
          this.mismatchOnceShown = false;
        }
      });
    } else {
      this.registerForm.markAllAsTouched();

      if (this.registerForm.errors?.['mismatch']) {
        this.mismatchOnceShown = true;
      }
    }
  }

  showPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  showConfirmPassword(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
