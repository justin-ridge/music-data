import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service'

@Component({
  selector: 'app-data-category',
  templateUrl: './data-category.component.html',
  styleUrls: ['./data-category.component.scss']
})
export class DataCategoryComponent implements OnInit {

  @Input() category: Category;
  public categoryGraphs: any[];

  public get active(): number {
    return CategoryService.active;
  }

  public set active(val: number) {
    CategoryService.active = val;
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryGraphs = this.categoryService.getCategoryGraphs(this.category.number);
  }
}
