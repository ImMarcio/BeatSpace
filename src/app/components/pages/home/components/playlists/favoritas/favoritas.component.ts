import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Playlist } from '../../../../../../shared/models/Playlist';
import { SpotifyService } from '../../../../../../shared/services/spotify.service';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from '../../../../../../shared/models/User';
import { FileUpload } from 'primeng/fileupload';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-favoritas',
  standalone : true,
  imports: [RouterModule,CommonModule,MatIconModule,DialogModule,ReactiveFormsModule,InputTextModule,TextareaModule,IftaLabelModule,SelectButtonModule,ButtonModule,ToastModule,FileUpload,FormsModule],
  templateUrl: './favoritas.component.html',
  styleUrl: './favoritas.component.scss',
  providers : [MessageService]
})
export class FavoritasComponent implements OnInit {

    isOpen = false
    playlists : Playlist[] = []
    Form : FormGroup
    playlistIdSelected : any;
    userId : any;
    selectedFile : any;
    stateOptions: any[] = [
      { label: 'Público', value: true },
      { label: 'Privado', value: false }
    ];
    loading : boolean = false;
    ownMe : boolean = false;
  
    constructor(private spotifyService :SpotifyService,private cd : ChangeDetectorRef, private messageService : MessageService, private fb : FormBuilder){
      this.Form = fb.group({
        name : ['',],
        description : ['',],
        public : [false,],
      })
      this.userId = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).id
    }

    get description(){
      return this.Form!.get("description")?.value;
    }
    
    get name(){
      return this.Form!.get("name")?.value;
    }
    
    get public(){
      return this.Form!.get("public")?.value;
    }

    toggleDropdown(playlist : Playlist) {
      this.isOpen = !this.isOpen;
      this.playlistIdSelected = playlist.id;
      this.Form.patchValue({
        name : playlist.name,
        description : playlist.description,
        public : playlist.public,
      })
  }



  onFileSelect(event: any) {
    const file = event.files[0]; // Obtém o primeiro arquivo da lista (se houver mais de um)
    if (file) {
      this.convertToBase64(file);
    }
  }
  
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // O resultado será o arquivo convertido para base64
      const base64File = reader.result as string;
      this.selectedFile = base64File;
    };
    reader.readAsDataURL(file); // Converte o arquivo para base64
  }


  ngOnInit(): void {
    this.spotifyService.getCurrentUserPlaylists().subscribe({
      next : (response)=>{
      this.playlists = response.items;
      },
      error: (error)=>{
        console.log(error)
      },
      complete : ()=>{
        this.cd.detectChanges;
      }
  })
  }

  updatePlaylist(){
    if(this.Form?.valid){
      this.loading = true;
      console.log(this.selectedFile)
      this.spotifyService.updatePlaylist(this.playlistIdSelected,{name : this.name , description : this.description, public : this.public}).subscribe({
        next : ()=>{
            this.spotifyService.addCoverImage(this.playlistIdSelected,this.selectedFile).subscribe({
              next : ()=>{
              },
              error : ()=>{
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro! Tente novamente mais tarde' });
                this.loading = false;
              },
              complete : ()=>{
  
              } 
            })
        },
        error : ()=>{
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro! Tente novamente mais tarde' });
          this.loading = false;
        },
        complete : ()=>{
          this.loading = false;
          this.isOpen = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Playlist alterada com sucesso!' })
          this.cd.detectChanges();
        }
      })
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios!' });
  
    }
  }

}
