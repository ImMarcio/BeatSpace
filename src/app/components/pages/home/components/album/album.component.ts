import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { Comentario, ComentarioService } from '../../../../../shared/services/comentario.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../../../../shared/models/Album';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { RatingModule } from 'primeng/rating';
import { DatePickerModule } from 'primeng/datepicker';
import { User } from '../../../../../shared/models/User';
import { CheckboxModule } from 'primeng/checkbox';


export interface ComentarioDAO{
  texto:string,autor:string, data : string, nota : number , parentId : string, userimg ? :string , username ? : string
}
@Component({
  selector: 'app-album',
  standalone : true,
  imports: [CommonModule,ToastModule,ButtonModule,ProgressSpinnerModule,ReactiveFormsModule,MatIconModule,ReactiveFormsModule,InputTextModule,DialogModule,IftaLabelModule
    ,FloatLabelModule,RatingModule,DatePickerModule,MatIconModule,CheckboxModule,FormsModule
  ],
  providers: [MessageService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit {
    salvar : boolean = false;
    loading :boolean = false;
    isOpen : boolean = false;
    showSpinner:boolean = false;
    album? : Album;
    albumId? : string;
    musicaSelecionada? : {id:string,image:string,alt:string,title:String,feedback:string}
    meuFormulario = new FormGroup({
      texto: new FormControl('', [Validators.required]),
      nota : new FormControl(0,[Validators.required]),
      data : new FormControl(new Date(),[Validators.required])
    });
    comentarios : Comentario[] = []
    user : User;
  

constructor(private cd : ChangeDetectorRef , 
  private spotifyService : SpotifyService, private comentarioService : ComentarioService, private messageService : MessageService,
  private activatedRoute : ActivatedRoute
){
  this.albumId = this.activatedRoute.snapshot.paramMap.get("id")?.toString();
  this.user = (JSON.parse(localStorage.getItem("current_user") ?? "") as User)
}

toggleDropdown() {
      this.isOpen = !this.isOpen;
  }


  get data(){
    return this.meuFormulario.get("data")?.value
  }

  
  get nota(){
    return this.meuFormulario.get("nota")?.value
  }

  
  get texto(){
    return this.meuFormulario.get("texto")?.value
  }



ngOnInit(): void {

console.log(this.data?.toISOString())

  if(this.albumId){
    this.spotifyService.getAlbum(this.albumId).subscribe({
      next : (album)=>{
        this.album = album;
      },
      error : (error)=>{
        console.log(error)
      },
      complete : ()=>{
        this.cd.detectChanges();
      }
    })
  }

  this.comentarioService.GetByAlbumOrPlaylistId(this.albumId!).subscribe({
    next : (comentarios)=>{
      console.log(comentarios)
      this.comentarios = comentarios;
    },
    error : ()=>{

    },
    complete : ()=>{
      this.cd.detectChanges();
    }
  })
  
}

OnSubmit(){
  this.loading = true;
 if(this.meuFormulario.valid){
   this.comentarioService.Add({userimg : this.user.images[1].url, username : this.user.display_name ,texto:this.texto!,autor : this.user.id, data : this.data!.toISOString() , nota : (this.nota! as number), parentId : this.albumId!}).subscribe({
     next :()=>{
      if(this.salvar){
        this.spotifyService.addSavedAlbuns({ids : [this.albumId!]}).subscribe({
          next : ()=>{
            this.isOpen = false;
          }
         })
      }
     },
     error :()=>{
      this.loading = false;
       this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro inesperado!' });
     },
     complete : ()=>{
      this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Comentário adicionado!' });
      this.meuFormulario.reset()
      this.isOpen= false;
      this.loading = false;
      this.ngOnInit()
      this.cd.detectChanges();

     }
   })
 }
 else{
   this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha os campos obrigatórios' });
   this.loading = false;
 }
 
}



}
