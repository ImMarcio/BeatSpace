import { User } from "./User";

export interface Track {
    album: {
      album_type: string;
      artists: Artist[];
      available_markets: string[];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: { url: string; height: number; width: number }[];
      name: string;
      release_date: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  }
  
  export interface Artist {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface ResponseTracks {
    href: string;
    items: Track[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }


export interface ResponseTracksPlaylist{
  href: string;
  items: TracksInPlaylist[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
  
  export interface TracksInPlaylist{
    added_at :string;
    added_by : User;
    is_local : boolean;
    track : Track
  }