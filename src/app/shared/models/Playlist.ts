import { ResponseTracksPlaylist } from "./Track";

export interface  PlaylistsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Playlist[];
  }
  
  export interface Playlist {
    collaborative: boolean;
    description: string | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    owner: PlaylistOwner;
    public: boolean | null;
    snapshot_id: string;
    tracks : ResponseTracksPlaylist
    type: string;
    uri: string;
  }
  
  export interface ExternalUrls {
    spotify: string;
  }
  
  export interface ImageObject {
    url: string;
    height?: number;
    width?: number;
  }
  
  export interface PlaylistOwner {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name?: string;
  }
  
  export interface PlaylistTracks {
    href: string;
    total: number;
  }
  