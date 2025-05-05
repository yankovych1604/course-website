import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutors } from '../../_interfaces/tutors';

@Injectable({
  providedIn: 'root'
})
export class TutorsService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL;

  private api = {
    tutors: `${this.resourceUrl}tutors`
  }

  constructor(
    private http: HttpClient,
  ) { }

  getAllTutors(): Observable<Tutors[]> {
    return this.http.get<Tutors[]>(`${this.api.tutors}`)
  }

  getOneTutor(id: string): Observable<Tutors> {
    return this.http.get<Tutors>(`${this.api.tutors}?id=${id}`);
  }
}
