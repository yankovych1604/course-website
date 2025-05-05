import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../../_interfaces/certificates';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private resourceUrl = environment.BACKEND_PRIVATE_URL;

  private api = {
    certificates: `${this.resourceUrl}certificates`,
  }

  constructor(
    private http: HttpClient,
  ) { }

  createCertificate(data: { userId: string, courseId: string, programId: string }): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.api.certificates}`, data);
  }

  getCertificatesByIds(ids: string[]): Observable<Certificate[]> {
    return this.http.post<Certificate[]>(`${this.api.certificates}/certificates-data`, { ids });
  }
}
