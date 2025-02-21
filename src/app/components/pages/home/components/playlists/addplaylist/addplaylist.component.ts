import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { SpotifyService } from '../../../../../../shared/services/spotify.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { User } from '../../../../../../shared/models/User';
import { FileUpload } from 'primeng/fileupload'



interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-addplaylist',
  imports: [CommonModule, ReactiveFormsModule,InputTextModule,TextareaModule,IftaLabelModule,SelectButtonModule,ButtonModule,ToastModule,FileUpload,FormsModule],
  templateUrl: './addplaylist.component.html',
  styleUrl: './addplaylist.component.scss',
  providers : [MessageService]
})
export class AddplaylistComponent {

loading : boolean =false;
Form :FormGroup
stateOptions: any[] = [
  { label: 'Público', value: true },
  { label: 'Privado', value: false }
];
userId : any;
selectedFile : any;

constructor(private spotifyService : SpotifyService, private cd : ChangeDetectorRef, private fb : FormBuilder, private messageService : MessageService){
  this.Form = this.fb.group({
    name : ['',Validators.required],
    description : ['',Validators.required],
    public : [false,Validators.required],
  } 
)

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


create(){
  if(this.Form?.valid){
    this.loading = true;
    this.spotifyService.createPlaylist(this.userId,{name : this.name , description : this.description, public : this.public}).subscribe({
      next : (playlist)=>{
          this.spotifyService.addCoverImage(playlist.id,this.selectedFile).subscribe({
            next : ()=>{
            },
            error : ()=>{
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro! Tente novamente mais tarde' });
              this.loading = false;
              this.Form.reset();
            },
            complete : ()=>{

            } 
          })
      },
      error : ()=>{
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro! Tente novamente mais tarde' });
        this.loading = false;
        this.Form.reset();
      },
      complete : ()=>{
        this.Form.reset();
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Playlist criada com sucesso!' })
        this.cd.detectChanges();
      }
    })
  }
  else{
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios!' });

  }

}





}
