import { Component, OnInit } from '@angular/core';
import { HomeItem } from '../home-item';
import { ContentService } from '../../content.service';

@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html',
  styleUrls: ['./home-items.component.scss']
})
export class HomeItemsComponent implements OnInit {

  public homeItems: HomeItem[];

  constructor() { }

  ngOnInit(): void {
    this.homeItems = ContentService.getHomeItems();
  }

  public link(item: HomeItem): string {
    return '/' + item.path;
  }
}
