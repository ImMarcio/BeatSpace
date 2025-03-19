import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify.service';
import {ComentarioService } from '../../../../../shared/services/comentario.service';
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
import { DateISOPipe } from "../../../../../shared/pipes/date-iso.pipe";
import { Chart } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import {ResenhaResponse, ResenhaService } from '../../../../../shared/services/resenha.service';
import { Like, LikeService } from '../../../../../shared/services/like.service';

import { HistoryService } from '../../../../../shared/services/history.service';


export interface ComentarioDAO{
    texto:string,autor:string, data : string, nota : number , parentId : string, userimg ? :string , username ? : string
}
@Component({
    selector: 'app-album',
    standalone : true,
    imports: [CommonModule, ToastModule, ButtonModule, ProgressSpinnerModule, ReactiveFormsModule, MatIconModule, ReactiveFormsModule, InputTextModule, DialogModule, IftaLabelModule,ButtonModule,
        FloatLabelModule, RatingModule, DatePickerModule, MatIconModule, CheckboxModule, FormsModule, DateISOPipe,ChartModule,FormsModule],
    providers: [MessageService],
    templateUrl: './album.component.html',
    styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit {

    salvar : boolean = false;
    platformId = inject(PLATFORM_ID);
    loading :boolean = false;
    isOpen : boolean = false;
    openComment : boolean = false;
    showSpinner:boolean = false;
    album? : Album;
    albumId? : string;
    resenhaSelected? : number;
    musicaSelecionada? : {id:string,image:string,alt:string,title:String,feedback:string}
    meuFormulario = new FormGroup({
        texto: new FormControl('', [Validators.required]),
        nota : new FormControl(0,[Validators.required]),
        data : new FormControl(new Date(),[Validators.required])
    });
    formularioComentario = new FormGroup({
        text : new FormControl('',[Validators.required])
    })
    resenhas : ResenhaResponse[] = []
    resenhasMostLiked : ResenhaResponse [] = []
    user : User;
    average : number = 0;
    basicData: any;
    basicOptions: any;
    liked = false; // Estado do like
    commentModal : boolean = false;
    loadingcomment : boolean = false;
    mostrarTodas: boolean = false;


    constructor(private cd : ChangeDetectorRef , 
        private spotifyService : SpotifyService, private likeService : LikeService ,private comentarioService : ComentarioService,private resenhaService : ResenhaService , private messageService : MessageService,
        private activatedRoute : ActivatedRoute,private historyService:HistoryService
    ){
        this.albumId = this.activatedRoute.snapshot.paramMap.get("id")?.toString();
        this.user = (JSON.parse(localStorage.getItem("current_user") ?? "") as User)
    }

    get resenhasRevertidas() {
        return this.resenhas.slice().reverse();
    }

    selectedResenhaId: number | null = null; // ID da resenha selecionada

    toggleComments(resenhaId: number) {
        // Se o ID da resenha for o mesmo da resenha selecionada, fecha os comentários
        if (this.selectedResenhaId === resenhaId) {
            this.selectedResenhaId = null; // Fecha os comentários
        } else {
            this.selectedResenhaId = resenhaId; // Abre os comentários para a resenha correspondente
        }
    }

    toggleCommentModal(resenha_id : number){
        console.log(resenha_id)
        this.resenhaSelected = resenha_id;
        this.commentModal = !this.commentModal
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    toggleLike() {
        this.liked = !this.liked;
    }

    toggleResenhas() {
        this.mostrarTodas = !this.mostrarTodas;
    }

    addComentario(){
        this.loading = true;
        if(this.formularioComentario.valid){
            const comentario = {texto : this.comentario , autor : this.user.id,userimg : this.user.images[1].url, username : this.user.display_name, data : new Date().toISOString(), resenhaId : this.resenhaSelected! }
            this.comentarioService.Add(comentario).subscribe({
                next : ()=>{
                    this.formularioComentario.reset();
                },
                complete : ()=>{
                    this.messageService.add({ severity: 'success', summary: 'successo', detail: 'Comentário adicionado com sucesso!' });
                    this.loadingcomment = false;
                    this.commentModal = false;
                    this.ngOnInit();
                    this.cd.detectChanges();
                }
            })
        }
        else{
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha os campos obrigatórios' });
            this.loadingcomment = false;
        }
    }

    addLikeOrUnlike(resenhaId : number, liked : boolean){
        if(liked){
            this.likeService.unlike(resenhaId, this.user.id).subscribe({
                next : ()=>{
                    this.liked = !this.liked;
                    const resenha_selected = this.resenhas.find(x=>resenhaId === x.id)
                if(resenha_selected){
                    resenha_selected.totalLikes--
                }
                },
                complete : ()=>{
                    this.ngOnInit()
                    this.cd.detectChanges();
                }
            })
        }
        else{
            const like : Like= {resenhaId : resenhaId , userId : this.user.id}
        this.likeService.addLike(like).subscribe({
            next : ()=>{
                this.liked = !this.liked;
                const resenha_selected = this.resenhas.find(x=>resenhaId === x.id)
            if(resenha_selected){
                resenha_selected.totalLikes++
            }
            },
            complete : ()=>{
                this.ngOnInit()
                this.cd.detectChanges();
            }
        })
        }
    }

    get comentario() : string{
        return this.formularioComentario.get("text")!.value ?? ""
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

    initChart(){
      
        var data: Record<string, number> = {
            "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, 
            "6": 0, "7": 0, "8": 0, "9": 0, "10": 0
        }
        const notas = this.resenhas.map(x=>x.nota);
        notas.forEach(nota=>{
            const key = nota.toString();
            if (data[key] !== undefined) {
                data[key]++;
            }
        })

        const arr :number[] = [data["1"],data["2"],data["3"],data["4"],data["5"],data["6"],data["7"],data["8"],data["9"],data["10"]]


        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.basicData = {
                labels: ["1", '2', '3', '4','5','6','7','8','9','10'],
                datasets: [
                    {
                        label: 'Avaliações',
                        data: arr,
                        backgroundColor: [
                            '#34d399',
                            '#34d399',
                            '#34d399',
                            '#34d399',
                        ],
                        borderColor: ['#34d399', '#34d399', '#34d399', '#34d399','#34d399','#34d399','#34d399','#34d399','#34d399','#34d399'],
                        borderWidth: 1,
                    },
                ],
            };

            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                        },
                        grid: {
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                        },
                        grid: {
                        },
                    },
                },
            };
            this.cd.markForCheck()
        }
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

        this.resenhaService.GetByAlbumOrPlaylistId(this.albumId!).subscribe({
            next : (resenhas)=>{
                console.log(resenhas)
                this.resenhas = resenhas;
                this.resenhaService.GetAverageGradeById(this.albumId!).subscribe({
                    next : (average)=>{
                        this.average = average;
                    },
                    error : ()=>{
                        this.cd.detectChanges();
                    }
                })
            },
            error : ()=>{

            },
            complete : ()=>{
                this.cd.detectChanges();
                this.initChart()
            }
        })

        this.resenhaService.GetMostLiked().subscribe({
            next : (resenhasMostLiked)=>{
              this.resenhasMostLiked = resenhasMostLiked;
            },
            complete : ()=>{
              this.cd.detectChanges();
            }
          })
    }

    OnSubmit(){
        this.loading = true;

        if(this.meuFormulario.valid){
            this.resenhaService.Add({userimg : this.user.images[1].url, username : this.user.display_name ,texto:this.texto!,autor : this.user.id, data : this.data!.toISOString() , nota : (this.nota! as number), parentId : this.albumId!}).subscribe({
                next :()=>{
                    if(this.salvar){
                        this.spotifyService.addSavedAlbuns({ids : [this.albumId!]}).subscribe({
                            next : ()=>{
                                this.isOpen = false;
                                this.logAction("Clique no botão salvar album",`Album ${this.album?.name} salvo nos favoritos`)
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
                    this.logAction("Clique no botão adicionar comentário","Comentário adicionado")
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


    logAction(action:string, details:string) {
        const username = (JSON.parse(localStorage.getItem("current_user") ?? "") as User).display_name

        this.historyService.saveAction(this.user.id, username, action, details).subscribe(response => {
            console.log('Ação registrada:', response);
        });
    }

}
