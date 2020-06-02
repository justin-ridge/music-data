import { Component, OnInit } from '@angular/core';
import { HomeItem } from './home-item';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homeItems: HomeItem[];

  constructor() { }

  ngOnInit(): void {
    this.homeItems = ContentService.getHomeItems();
  }

  public link(item: HomeItem): string {
    return '/' + item.path;
  }
}
