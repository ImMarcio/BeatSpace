import { Component, Input, OnInit } from '@angular/core';
import { HistoryService } from '../../../../shared/services/history.service';
import { User } from '../../../../shared/models/User';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  imports: [CommonModule, MatIconModule, ButtonModule, DialogModule ]
})
export class HistoricoComponent implements OnInit {
  @Input() userId : string = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).id
  user : User;
  actions: any[] = [];
  mostrarPopup: boolean = false;

  constructor(private historyService:HistoryService) {  
    this.user = (JSON.parse(localStorage.getItem("current_user") ?? "") as User)
  }

  confirmarExclusao() {
      this.mostrarPopup = true;
  }

  // deletarHistorico() {
  //     console.log("Histórico deletado!"); // Aqui vai a lógica para deletar
      
  // }

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

  deletarRegistro(actionId:number){
  
    this.historyService.deleteUserAction(this.userId,actionId).subscribe(Response => {
      console.log("Ação removida")
    })
  }

  deleteAllActions(){
    this.historyService.deleteAllUserActions(this.userId).subscribe(Response => {
      console.log("Todas Ações removidas")
      this.mostrarPopup = false;
      this.loadUserActions()
    })
  }

}
