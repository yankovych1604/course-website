import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../../_interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL;

  private api = {
    register: `${this.resourceUrl}register`
  }

  constructor(
    private http: HttpClient,
  ) { }

  register(userData: RegisterRequest): Observable<RegisterResponse | null> {
    return this.http.post<RegisterResponse>(`${this.api.register}`, userData);
  }
}
