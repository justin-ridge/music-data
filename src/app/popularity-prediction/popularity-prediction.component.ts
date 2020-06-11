import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-popularity-prediction',
  templateUrl: './popularity-prediction.component.html',
  styleUrls: ['./popularity-prediction.component.scss']
})
export class PopularityPredictionComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.randomize();
  }

  public acousticness: number;
  public danceability: number;
  public duration_ms: number;
  public energy: number;
  public instrumentalness: number;
  public liveness: number;
  public loudness: number;
  public speechiness: number;
  public valence: number;
  public genre: string;

  public genres = ["A Capella", "Alternative", "Anime", "Blues", "Childrens Music", "Classical",
    "Comedy", "Country", "Dance", "Electronic", "Folk", "Hip-Hop",
    "Indie", "Jazz", "Movie", "Opera", "Pop", "R&B",
    "Rap", "Reggae", "Reggaeton", "Rock", "Ska", "Soul",
    "Soundtrack", "World"];

  public randomize(): void {
    this.acousticness = this.getRandomVal();
    this.danceability = this.getRandomVal();
    this.duration_ms = this.getRandomVal();
    this.energy = this.getRandomVal();
    this.instrumentalness = this.getRandomVal();
    this.liveness = this.getRandomVal();
    this.loudness = this.getRandomVal();
    this.speechiness = this.getRandomVal();
    this.valence = this.getRandomVal();
    this.genre = this.getRandomGenre();
    console.log(this.genre);
  }

  private getRandomVal(): number {
    return Number(Math.random().toFixed(3));
  }

  private getRandomGenre(): string {
    const index = Math.floor(Math.random()*this.genres.length)
    return this.genres[index];
  }
}
