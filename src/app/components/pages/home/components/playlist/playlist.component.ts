import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Playlist, PlaylistTracks } from '../../../../../shared/models/Playlist';
import { CommonModule } from '@angular/common';
import { Track,TracksInPlaylist } from '../../../../../shared/models/Track';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { Table, TableModule } from 'primeng/table';
import { FormatMsPipe } from '../../../../../shared/pipes/format-ms.pipe';
import { User } from '../../../../../shared/models/User';
import { Dialog} from 'primeng/dialog';
import { MusicasComponent } from "../musicas/musicas.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast, ToastModule } from 'primeng/toast';
import { ResponseSearchTrack } from '../../../../../shared/models/ResponseSearchTrack';
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-playlist',
  imports: [CommonModule, MatIconModule, ButtonModule, TableModule, FormatMsPipe, Dialog,ReactiveFormsModule,FormsModule,ToastModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
  providers : [MessageService]
})
export class PlaylistComponent implements OnInit {
cols : Column[] = []
playlistId? : any
playlist?: Playlist
tracks : TracksInPlaylist[] = []
selectedTracks : TracksInPlaylist[]= []
ownerMe : boolean = false;
userId : any;
visible: boolean = false;
Form : FormGroup;
loading : boolean = false;
tracksSearched : Track[] = []
tracksSearchedSelected : Track[] = []

showDialog() {
    this.visible = true;
}

constructor(private SpotifyService : SpotifyService, private cd: ChangeDetectorRef , private messageService : MessageService, private route : ActivatedRoute,private fb :FormBuilder
){
  this.playlistId = route.snapshot.paramMap.get("id") as String;
  this.userId = (JSON.parse(localStorage.getItem("current_user") ?? "") as User)
  this.Form = this.fb.group({
    search : ["",Validators.required]
  })
}




search() {
  this.loading = true;
  this.SpotifyService.search(this.Form?.get("search")?.value,"track").subscribe({
    next : (tracks)=>{
      console.log(tracks)
      this.tracksSearched = (tracks as ResponseSearchTrack).tracks.items;
    },
    error : ()=>{
      this.loading = false;
    },
    complete : ()=>{
      this.loading = false;
      this.cd.detectChanges();
    }
  })
}


ngOnInit(): void {
    this.SpotifyService.getPlaylist(this.playlistId).subscribe({
      next :(playlist)=>{
        this.playlist = playlist;
        this.tracks = playlist.tracks.items;
        this.ownerMe = this.playlist.owner.id === this.userId.id;
      },
      error : ()=>{

      },
      complete : ()=>{
        this.cd.detectChanges();
      }
    })
}


addTracks(){
  this.visible = false;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: true
  });

  swalWithBootstrapButtons.fire({
    title: "Adicionar Música",
    text: "Voce deseja mesmo adicionar estas músicas na sua playlist? ",
    icon: "question",
    background: '#262626',
    color: '#FFFFFF',
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedTracks = this.tracksSearchedSelected.map(x=>x.uri)
      this.SpotifyService.addPlaylistItems(this.playlist!.id , {uris : selectedTracks , position : 0 }).subscribe({
        next: () => {
          swalWithBootstrapButtons.fire({
            title: "Sucesso", 
            text: "Música adicionada na playlist",
            icon: "success",
            background: '#262626',
            color: '#FFFFFF'
          });
        },
        error: (error) => {
          this.Form.reset();
          this.tracksSearchedSelected = []
          this.tracksSearched = []
          Swal.fire({
            icon: "error",
            title: "Ops!",
            text: "Ocorreu um erro, tente novamente mais tarde.",
            background: '#262626',
            color: '#FFFFFF'
          });
        },
        complete: () => {
          this.Form.reset();
          this.tracksSearchedSelected = []
          this.tracksSearched = []
          this.cd.detectChanges();
          this.ngOnInit();
        }
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.Form.reset();
          this.tracksSearchedSelected = []
          this.tracksSearched = []
      swalWithBootstrapButtons.fire({
        title: "Ops!",
        text: "Músicas selecionadas não adicionadas",
        icon: "error",
        background: '#262626',
        color: '#FFFFFF'
      });
    }
  });
}


deleteTracks(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: true
  });

  swalWithBootstrapButtons.fire({
    title: "Apagar Música",
    text: "Voce deseja mesmo apagar estes itens da sua playlist? ",
    icon: "warning",
    background: '#262626',
    color: '#FFFFFF',
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const tracks = this.selectedTracks.map(
        x=> {
          return  { uri : x.track.uri}
        }
      )
      this.SpotifyService.deletePlaylistItem(this.playlist!.id , {tracks : tracks , snapshot_id : this.playlist?.snapshot_id}).subscribe({
        next: () => {
          swalWithBootstrapButtons.fire({
            title: "Sucesso", 
            text: "Música da playlist removida",
            icon: "success",
            background: '#262626',
            color: '#FFFFFF'
          });
        },
        error: (error) => {
          this.selectedTracks = []
          Swal.fire({
            icon: "error",
            title: "Ops!",
            text: "Ocorreu um erro, tente novamente mais tarde.",
            background: '#262626',
            color: '#FFFFFF'
          });
        },
        complete: () => {
          this.tracks = this.tracks.filter(track => !this.selectedTracks.includes(track) )
          this.cd.detectChanges();
          this.ngOnInit();
        }
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.selectedTracks = []
      swalWithBootstrapButtons.fire({
        title: "Ops!",
        text: "Músicas selecionadas não excluídas",
        icon: "error",
        background: '#262626',
        color: '#FFFFFF'
      });
    }
  });
}


}
