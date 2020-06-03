import { Component, OnInit, Input } from '@angular/core';
import { HomeItem } from '../home-item';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss']
})
export class HomeItemComponent implements OnInit {

  @Input() item: HomeItem;

  constructor() { }

  ngOnInit(): void {
  }

  public link(): string {
    return '/' + this.item.path;
  }
}
