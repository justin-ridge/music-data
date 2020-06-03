import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-data-category',
  templateUrl: './data-category.component.html',
  styleUrls: ['./data-category.component.scss']
})
export class DataCategoryComponent implements OnInit {

  @Input() category: Category;
  
  constructor() { }

  ngOnInit(): void {
  }

}
