import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Song } from './song';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public songs$: Observable<Song[]>;
  public total$: Observable<number>;
  public pageTotal$: Observable<number>;
  public itemStart$: Observable<string>;
  public itemEnd$: Observable<string>;
  private songsBehavior: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  private totalBehavior: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private pageTotalBehavior: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private itemStartBehavior: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private itemEndBehavior: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public page: number = 1;
  public navOpen: boolean = true;
  public searchOpen: boolean = true;
  private hasStandardTotal: boolean = false;
  public static pageSize: number = 50;

  constructor(private http: HttpClient) { 
    this.songs$ = this.songsBehavior.asObservable();
    this.total$ = this.totalBehavior.asObservable();
    this.pageTotal$ = this.pageTotalBehavior.asObservable();
    this.itemStart$ = this.itemStartBehavior.asObservable();
    this.itemEnd$ = this.itemEndBehavior.asObservable();
  }

  public getSongs(page: string) {
    this.http.get<Song[]>(environment.apiUrl + 'api/songs?metadata=features&page=' + page).subscribe((songs) => {
      if(!this.hasStandardTotal) {
        this.getPageTotal();
        this.getTotal();
        this.hasStandardTotal = true;
      }

      this.songsBehavior.next(songs);
      this.calcItemEndpoints();
    })
  }

  public search(artist: string, name: string, genre: string) {
    this.http.get<Song[]>(environment.apiUrl + encodeURI(`api/songs/search?artist=${artist}&name=${name}&genre=${genre}`)).subscribe((songs) => {
      this.hasStandardTotal = false;
      this.totalBehavior.next(songs.length);
      this.pageTotalBehavior.next(this.calcPageTotal(songs.length));
      this.songsBehavior.next(songs);
      this.calcItemEndpoints();
    })
  }

  private calcItemEndpoints(): void {
    this.itemStartBehavior.next(this.getItemStart());
    this.itemEndBehavior.next(this.getItemEnd());
  }

  private calcPageTotal(songLength: number): number {
    return Math.ceil(songLength / SongService.pageSize);
  }

  private getPageTotal() {
    this.http.get<number>(environment.apiUrl + 'api/songs/pagecount').subscribe((pageTotal) => {
      this.pageTotalBehavior.next(pageTotal);
    })
  }

  private getTotal() {
    this.http.get<number>(environment.apiUrl + 'api/songs/count').subscribe((total) => {
      this.totalBehavior.next(total);
    })
  }

  public getItemStart(): string {
    return this.calcItemStart().toString();
  }

  public getItemEnd(): string {
    const songLength = this.songsBehavior.getValue().length;
    if(songLength <= SongService.pageSize) {
      return songLength.toString();
    }

    return (this.calcItemStart() + songLength - 1).toString();
  }

  private calcItemStart(): number {
    const songLength = this.songsBehavior.getValue().length;
    if(songLength === 0) {
      return 0;
    }
    
    return ((this.page - 1) * SongService.pageSize) + 1;
  }
}
