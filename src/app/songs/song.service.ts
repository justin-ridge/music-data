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
  private songsBehavior: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  private totalBehavior: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private pageTotalBehavior: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { 
    this.songs$ = this.songsBehavior.asObservable();
    this.total$ = this.totalBehavior.asObservable();
    this.pageTotal$ = this.pageTotalBehavior.asObservable();
  }

  public getTotal() {
    this.http.get<number>(environment.apiUrl + 'api/songs/count').subscribe((total) => {
      this.totalBehavior.next(total);
    })
  }

  public getSongs(page: string) {
    this.http.get<Song[]>(environment.apiUrl + 'api/songs?metadata=features&page=' + page).subscribe((songs) => {
      this.songsBehavior.next(songs);
    })
  }

  public getPageTotal() {
    this.http.get<number>(environment.apiUrl + 'api/songs/pagecount').subscribe((pageTotal) => {
      this.pageTotalBehavior.next(pageTotal);
    })
  }
}
