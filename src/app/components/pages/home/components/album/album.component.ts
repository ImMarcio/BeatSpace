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
import { FavoritoService } from '../../../../../shared/services/favorito.service';
import { User } from '../../../../../shared/models/User';

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
    favoritos: string[] = [];
    usuarioId = "usuario123";
    user ? : User
  

constructor(private cd : ChangeDetectorRef , 
  private spotifyService : SpotifyService, private comentarioService : ComentarioService, private messageService : MessageService,
  private activatedRoute : ActivatedRoute, private favoritoService : FavoritoService, private cdr: ChangeDetectorRef
){
  this.albumId = this.activatedRoute.snapshot.paramMap.get("id")?.toString();
  this.user =  JSON.parse(localStorage.getItem("current_user") ?? "") as User;

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

  this.atualizarFavoritos();

  

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


  // Método para verificar se o álbum está favoritado
  isFavorito(albumId: string = ""): boolean {
    return this.favoritos.includes(albumId);
  }

  favoritarAlbum(albumId: string): void {
    this.getEmailCurrentUser()
    if (this.isFavorito(albumId)) {
      this.desfavoritarAlbum(albumId);
    } else {
      this.favoritoService.favoritarAlbum(this.usuarioId, albumId).subscribe({
        next: () => {
          console.log("Atualizando...")
          this.atualizarFavoritos(); // Atualiza a lista de favoritos após favoritar
        },
        error: (error) => {
          console.error('Erro ao favoritar álbum:', error);
        }
      });
    }
  }
  
  desfavoritarAlbum(albumId: string): void {
    this.getEmailCurrentUser()
    this.favoritoService.desfavoritarAlbum(this.usuarioId, albumId).subscribe({
      next: () => {
        console.log("Atualizando...")
        this.atualizarFavoritos(); // Atualiza a lista de favoritos após desfavoritar
      },
      error: (error) => {
        console.error('Erro ao desfavoritar álbum:', error);
      }
    });
  }
  
  atualizarFavoritos(): void {
    this.getEmailCurrentUser()
    this.favoritoService.listarFavoritos(this.usuarioId).subscribe({
      next: (favoritos) => {
        this.favoritos = favoritos;
        console.log("Atualizando...")
      },
      error: (error) => {
        console.error('Erro ao listar favoritos:', error);
      }
    });
  }

  currentUser(){
    console.log(this.user)
    console.log(this.user?.email)
  }
  getEmailCurrentUser(){
    if(this.user){
      this.usuarioId = this.user.email
      console.log(this.usuarioId)
      return this.user.email;
    } else {
      console.log("User inválido");
      return null;
    }

  }




}
