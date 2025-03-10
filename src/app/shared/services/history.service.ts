import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserAction } from '../models/UserAction';



@Injectable({
  providedIn: 'root'
})
export class HistoryService {
 private apiUrl = 'http://localhost:8081/api/historico'

constructor(private http: HttpClient) { }
  // Salvar ação do usuário
  saveAction(userId:string, username: string, action: string, details?: string): Observable<void> {
    const userAction: UserAction = { userId, username, action, details };
    return this.http.post<void>(this.apiUrl, userAction);
  }

  // Buscar histórico do usuário
  getUserHistory(userId: string): Observable<UserAction[]> {
    return this.http.get<UserAction[]>(`${this.apiUrl}/${userId}`);
  }
}
