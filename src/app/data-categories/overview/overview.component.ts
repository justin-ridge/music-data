import { Component, OnInit } from '@angular/core';
import { Overview } from './overview';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public overviewItems: Overview[];

  constructor() { 
    this.overviewItems = [];
  }

  public get active(): number {
    return CategoryService.overviewActive;
  }

  public set active(val: number) {
    CategoryService.overviewActive = val;
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
