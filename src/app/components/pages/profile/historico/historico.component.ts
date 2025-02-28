import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../../../shared/services/history.service';
import { User } from '../../../../shared/models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  imports: [CommonModule]
})
export class HistoricoComponent implements OnInit {
  userId : any;
  actions: any[] = [];

  constructor(private historyService:HistoryService) {  
    this.userId = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).id
  }

  ngOnInit() {
    this.loadUserActions()
  }

  loadUserActions() {
    this.historyService.getUserHistory(this.userId).subscribe(
      (data) => {
        this.actions = data;
      },
      (error) => {
        console.error('Erro ao buscar histórico de ações:', error);
      }
    );
  }


  logAction(action:string, details:string) {
    const username = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).display_name

    this.historyService.saveAction(this.userId, username, action, details).subscribe(response => {
      console.log('Ação registrada:', response);
    });
  }


}
