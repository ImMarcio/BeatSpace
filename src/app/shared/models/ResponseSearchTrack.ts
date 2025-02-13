import { Track } from "./Track";

export interface ResponseSearchTrack{
   tracks : Tracks
}

export interface Tracks{
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Track[];
}