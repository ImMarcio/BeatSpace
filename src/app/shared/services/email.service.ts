import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8081/api/email/send-email';  // URL da sua API Spring Boot

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, text: string): Observable<any> {
    const emailRequest = { to, subject, text };
    return this.http.post(this.apiUrl, emailRequest);
  }

}
