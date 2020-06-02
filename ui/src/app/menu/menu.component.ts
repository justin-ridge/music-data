import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  public menuItems: MenuItem[];

  ngOnInit(): void {
    this.menuItems = ContentService.getMenuItems();
  }

}
