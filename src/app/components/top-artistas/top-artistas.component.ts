import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify.service';
import { Artist } from '../../shared/models/Artist';

@Component({
  selector: 'app-top-artistas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-artistas.component.html',
  styleUrl: './top-artistas.component.scss'
})
export class TopArtistasComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private spotifyService: SpotifyService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.spotifyService.getTopArtists().subscribe({
      next: (artists) => {
        this.artists = artists.items;
      },
      complete: () => {
        this.cd.detectChanges();
      }
    });
  }
}
