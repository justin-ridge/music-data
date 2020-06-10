import { Component, OnInit } from '@angular/core';
import { INglDatatableSort } from 'ng-lightning';
import { SongService } from '../songs/song.service';
import { Song } from '../songs/song';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {

  public songs: Song[] = [];
  public loading: boolean = false;
  public sort: INglDatatableSort = { key: 'rank', order: 'asc' };
  public showDetails: boolean = false;
  public itemStart: string;
  public itemEnd: string;
  public hasError: boolean = false;
  public error: string = 'You must enter at least one search criteria with more than 2 characters';
  public collapsable: boolean = true;
  public searchName: string = '';
  public searchArtist: string = '';
  public searchGenre: string = '';
  public showLimitWarning: boolean = false;
  public searchActive: boolean;

  total = 0;
  pageTotal = 0;
  limitAmount = 200;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.total$.subscribe((total) => {
      this.total = total;
    })

    this.songService.pageTotal$.subscribe((pageTotal) => {
      this.pageTotal = pageTotal * 10;
      console.log(pageTotal);
    })

    this.songService.songs$.subscribe((songs) => {
      this.songs = songs;
      this.loading = false;
      if(this.songs.length === this.limitAmount) {
        this.showLimitWarning = true;
      } else {
        this.showLimitWarning = false;
      }
    });

    this.songService.itemStart$.subscribe((val) => {
      this.itemStart = val;
    })

    this.songService.itemEnd$.subscribe((val) => {
      this.itemEnd = val;
    })

    if(this.songs.length === 0) {
      this.getSongs('0');
    }
  }

  public get page(): number {
    return this.songService.page;
  }

  public set page(val: number) {
    this.songService.page = val;
  }

  public get navOpen(): boolean {
    return this.songService.navOpen;
  }

  public set navOpen(val: boolean) {
    this.songService.navOpen = val;
  }

  public get searchOpen(): boolean {
    return this.songService.searchOpen;
  }

  public set searchOpen(val: boolean) {
    this.songService.searchOpen = val;
  }

  public get pageSize(): number {
    return SongService.pageSize;
  }

  public onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.songs.sort((a: any, b: any) => {
      let compare = 0;
      if(!isNaN(a[key])) {
        compare = b[key] - a[key];
      } else {
        compare = b[key].localeCompare(a[key]);
      }
      return compare * (order === 'desc' ? 1 : -1);
    });
  }

  public getTime(ms: number): string {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  public rounded(val: number): string {
    return val.toFixed(3);
  }

  public getSongs(page: string) {
    this.loading = true;
    this.songService.getSongs(page);
    this.searchActive = false;
  }

  public toggleDetails(event) {
    this.showDetails = event.currentTarget.checked;
  }

  public changePage(event) {
    this.page = parseInt(event);
    const pageNum = this.page - 1;
    console.log(pageNum);
    this.getSongs(pageNum.toString())
  }

  public badgeTheme(value: number) {
    if(value > 50) {
      return 'success';
    }

    return 'default';
  }

  public search(): void {
    if(!this.validateSearch()) {
      return;
    }
    
    this.loading = true;
    this.songService.search(this.searchArtist, this.searchName, this.searchGenre);
    this.searchActive = true;
  }

  public clearSearch(): void {
    this.searchArtist = '';
    this.searchName = '';
    this.searchGenre = '';
    this.page = 1;
    this.getSongs('0');
  }

  private validateSearch(): boolean {
    this.hasError = false;
    const params = [this.searchArtist, this.searchGenre, this.searchName];
    if(!this.hasSearchValue(params)) {
      this.hasError = true;
      return false;
    }

    return true;
  }

  private hasSearchValue(params: string[]): boolean {
    let hasValue = false;
    for (let param in params) {
      console.log(param);
      if(params[param].length > 2) {
        hasValue = true;
        break;
      }
    }

    return hasValue;
  }
}
