import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IntroResponse } from '../../_interfaces/intro';

@Injectable({
  providedIn: 'root'
})
export class IntroService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL

  private api = {
    intro: `${this.resourceUrl}intro`
  }

  constructor(
    private http: HttpClient,
  ) { }

  getIntroData(url: string): Observable<IntroResponse> {
    return this.http.get<IntroResponse>(`${this.api.intro}?url=${url}`);
  }
}
