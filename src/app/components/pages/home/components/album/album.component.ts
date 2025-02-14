import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { ComentarioService } from '../../../../../shared/services/comentario.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../../../../shared/models/Album';

@Component({
  selector: 'app-album',
  standalone : true,
  imports: [CommonModule,ToastModule,ButtonModule,ProgressSpinnerModule,ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit {


    showSpinner:boolean = false;
    album? : Album;
    albumId? : string;
    musicaSelecionada? : {id:string,image:string,alt:string,title:String,feedback:string}
    meuFormulario = new FormGroup({
      texto: new FormControl('', [Validators.required])
    });
    comentarios : {texto : string,autor:string}[] = []
  

constructor(private cd : ChangeDetectorRef , 
  private spotifyService : SpotifyService, private comentarioService : ComentarioService, private messageService : MessageService,
  private activatedRoute : ActivatedRoute
){
  this.albumId = this.activatedRoute.snapshot.paramMap.get("id")?.toString();
}


ngOnInit(): void {

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
  

  this.comentarioService.GetAll().subscribe({
   next: (comentarios)=>{
     this.comentarios = comentarios;
   },
   complete : ()=>{
     this.cd.detectChanges();
   }
  })
}

OnSubmit(){
 if(this.meuFormulario.valid){
   const texto = this.meuFormulario.get("texto")?.value ?? "";
   this.showSpinner=true;
   this.comentarioService.Add({texto:texto,autor : "João Marcos"}).subscribe({
     next :()=>{
       this.showSpinner = false;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mensagem Adicionada!' });
       this.meuFormulario.get("texto")?.reset();
     },
     error :()=>{
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocorreu um erro inesperado!' });
     },
     complete : ()=>{
       this.ngOnInit()
       this.cd.detectChanges();
     }
   })
 }
 else{
   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha os campos obrigatórios' });
 }
 
}



}
