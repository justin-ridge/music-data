export class Song {
    songid: number;
    artist: string;
    name: string;
    genre: string;
    target: number;
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    popularity: number;
    speechiness: number;
    valence: number;

    public get_is_popular(): boolean {
        return this.target == 1;
    }
}
