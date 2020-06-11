import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { Popularity } from './popularity';
import { PopularityService } from './popularity.service';

@Component({
  selector: 'app-popularity-prediction',
  templateUrl: './popularity-prediction.component.html',
  styleUrls: ['./popularity-prediction.component.scss']
})
export class PopularityPredictionComponent implements OnInit, AfterViewInit {

  public pop: Popularity;

  constructor(private popularityService: PopularityService) { }

  ngOnInit(): void {
    this.pop = this.initPopularity();
    this.popularityService.predict$.subscribe((result) => {
      console.log(result);
    })
  }

  ngAfterViewInit(): void {
    this.randomize();
  }

  public genres = ["A Capella", "Alternative", "Anime", "Blues", "Childrens Music", "Classical",
    "Comedy", "Country", "Dance", "Electronic", "Folk", "Hip-Hop",
    "Indie", "Jazz", "Movie", "Opera", "Pop", "R&B",
    "Rap", "Reggae", "Reggaeton", "Rock", "Ska", "Soul",
    "Soundtrack", "World"];

  public randomize(): void {
    this.pop = this.getRandomPopularity();
  }

  private initPopularity(): Popularity {
    return {
      acousticness: 0,
      danceability: 0,
      duration_ms: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      loudness: 0,
      speechiness: 0,
      valence: 0,
      genre: ''
    };
  }

  private getRandomPopularity(): Popularity {
    const pop: Popularity = {
      acousticness: this.getRandomVal(),
      danceability: this.getRandomVal(),
      duration_ms: this.getRandomVal(),
      energy: this.getRandomVal(),
      instrumentalness: this.getRandomVal(),
      liveness: this.getRandomVal(),
      loudness: this.getRandomVal(),
      speechiness: this.getRandomVal(),
      valence: this.getRandomVal(),
      genre: this.getRandomGenre()
    };

    return pop;
  }

  public predict(): void {
    this.popularityService.predict(this.pop);
  }

  private getRandomVal(): number {
    return Number(Math.random().toFixed(3));
  }

  private getRandomGenre(): string {
    const index = Math.floor(Math.random() * this.genres.length)
    return this.genres[index];
  }
}
