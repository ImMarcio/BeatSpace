export interface Artist {
    external_urls: { spotify: string };
    followers: { href: string | null; total: number };
    genres: string[];
    href: string;
    id: string;
    images: { url: string; height: number; width: number }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }
  
  export interface TopArtistsResponse {
    href: string;
    items: Artist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }
  