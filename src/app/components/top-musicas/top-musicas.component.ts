import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify.service';
import { Track } from '../../shared/models/Track';

@Component({
  selector: 'app-top-musicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-musicas.component.html',
  styleUrl: './top-musicas.component.scss'
})
export class TopMusicasComponent implements OnInit {
  tracks: Track[] = [];

  constructor(private spotifyService: SpotifyService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.spotifyService.getTopTracks().subscribe({
      next: (tracks) => {
        this.tracks = tracks.items;
      },
      complete: () => {
        this.cd.detectChanges();
      }
    });
  }
}
