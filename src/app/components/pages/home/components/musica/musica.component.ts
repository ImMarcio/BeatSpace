import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ComentarioService } from '../../../../../shared/services/comentario.service';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Track } from '../../../../../shared/models/Track';
import { SpotifyService } from '../../../../../shared/services/spotify.service';

@Component({
  selector: 'app-musica',
  imports: [CommonModule,ButtonModule,ReactiveFormsModule,TextareaModule,ProgressSpinnerModule,ToastModule],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.scss',
  providers: [MessageService]
})
export class MusicaComponent implements OnInit {
  
  showSpinner:boolean = false;
  items = [
  
    { id:"1", image: '../../../../assets/BK-Icarus.jpeg', alt: 'Imagem 2', title: 'Icarus',feedback:"Seria ótimo se houvesse mais atividades interativas, como desafios musicais mensais, para engajar ainda mais os membros e estimular a criatividade" },
    {id:"2", image: '../../../../assets/tyler-creator-chromakopia-album.jpg', alt: 'Imagem 3', title: 'Chromakopia',feedback:"O ambiente é muito positivo e o compartilhamento de músicas e partituras é uma ótima maneira de aprender e explorar diferentes estilos musicais." },
    {id:"3", image: '../../../../assets/ab67616d0000b273bbd45c8d36e0e045ef640411.jpeg', alt: 'Debí Tirar Más Fotos', title: 'Debí Tirar Más Fotos',feedback:"Apenas senti falta de uma área mais organizada para a troca de recursos, como links úteis e materiais de estudo, para facilitar a navegação entre os membros." },
  
  ];
  track ?: Track;
  trackId? : string
  musicaSelecionada? : {id:string,image:string,alt:string,title:String,feedback:string}
  meuFormulario = new FormGroup({
    texto: new FormControl('', [Validators.required])
  });
  comentarios : {texto : string,autor:string}[] = []

    constructor(private route :ActivatedRoute,private comentarioService : ComentarioService, private cd : ChangeDetectorRef, private messageService : MessageService, private spotifyService : SpotifyService){
      this.trackId = this.route.snapshot.paramMap.get("id")?.toString();
    }

  ngOnInit(): void {

    if(this.trackId){
      this.spotifyService.getTrack(this.trackId).subscribe({
        next : (track)=>{
          this.track = track;
        },
        error:(error)=>{

        },
        complete : ()=>{
            this.cd.detectChanges();
        }
    })
    }

  }

  OnSubmit(){
   
    
  }
}
