import { Album } from "./Album";

export interface ResponseSearchAlbum{
   albums : Albums
}

export interface Albums{
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Album[];
}