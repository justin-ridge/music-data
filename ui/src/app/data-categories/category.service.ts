import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public static getCategories(): Category[] {
    return [
      {
        number: 0,
        description: ''
      },
      {
        number: 1,
        description: ''
      },
      {
        number: 2,
        description: ''
      },
      {
        number: 3,
        description: ''
      },
      {
        number: 4,
        description: ''
      }
    ];
  }
}
