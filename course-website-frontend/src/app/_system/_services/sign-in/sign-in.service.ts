import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInRequest, SignInResponse } from '../../_interfaces/sign-in';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL;

  private api = {
    signIn: `${this.resourceUrl}sign-in`
  }

  constructor(
    private http: HttpClient,
  ) { }

  signIn(credentials: SignInRequest): Observable<SignInResponse | null> {
    return this.http.post<SignInResponse>(`${this.api.signIn}`, credentials);
  }
}
