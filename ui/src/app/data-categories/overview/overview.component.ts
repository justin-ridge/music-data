import { Component, OnInit } from '@angular/core';
import { Overview } from './overview';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public active: number;
  public overviewItems: Overview[];

  constructor() { 
    this.active = 0;
    this.overviewItems = [];
  }

  ngOnInit(): void {
    this.overviewItems = CategoryService.getOverviewItems();
  }

  public get activeItemContent(): string {
    if(this.overviewItems.length <= this.active) {
      return '';
    }

    return this.overviewItems[this.active].content;
  }
}
