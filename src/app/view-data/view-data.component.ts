import { Component, OnInit } from '@angular/core';
import { SongService } from '../songs/song.service';
import { Song } from '../songs/song';
import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning';

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

  total = 0;
  pageTotal = 0;
  page: number = 1;
  pageSize: number = 50;

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
    });

    if(this.songs.length === 0) {
      this.songService.getTotal();
      this.songService.getPageTotal();
      this.getSongs('0');
    }
  }

  onSort($event: INglDatatableSort) {
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

  public get showDetailsText(): string {
    let text = ' Extra Details';
    if(this.showDetails) {
      text = 'Hide' + text;
    } else {
      text = 'Show' + text;
    }

    return text;
  }

  private calcItemStart(): number {
    return ((this.page - 1) * 50) + 1;
  }

  public get itemStart(): string {
    return this.calcItemStart().toString();
  }

  public get itemEnd(): string {
    return (this.calcItemStart() + this.songs.length - 1).toString();
  }

  public getSongs(page: string) {
    this.loading = true;
    this.songService.getSongs(page);
  }

  public toggleDetails() {
    this.showDetails = !this.showDetails;
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
}
