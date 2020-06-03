import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-data-categories',
  templateUrl: './data-categories.component.html',
  styleUrls: ['./data-categories.component.scss']
})
export class DataCategoriesComponent implements OnInit {

  public categories: Category[];
  public variant = 'scoped';
  public selectedTab: any = 'Overview';

  constructor() { }

  change() {
    this.variant = this.variant === 'scoped' ? null : 'scoped';
  }

  ngOnInit(): void {
    this.categories = CategoryService.getCategories();
  }

  public tabChange(category: Category, event: string) {
    console.log('category', category.number, event);
    console.log(this.selectedTab);
  }

  public categoryHeading(category: Category) {
    return 'Category ' + (category.number + 1);
  }
}
