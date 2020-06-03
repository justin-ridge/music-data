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
  public get active(): number {
    return CategoryService.active;
  }

  public set active(val: number) {
    CategoryService.active = val;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public barSrc(): string {
    return 'assets/images/c' + this.category.number + '_bar.png';
  }

  public pieSrc(): string {
    return 'assets/images/c' + this.category.number + '_pie.png';
  }

  public pieGenreSrc(): string {
    return 'assets/images/c' + this.category.number + '_pie_genre.png';
  }
}
