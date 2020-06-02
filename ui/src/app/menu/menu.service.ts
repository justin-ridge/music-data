import { Injectable } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DataPreparationComponent } from '../data-preparation/data-preparation.component';
import { MenuItem } from './menu-item';
import { DataCategoriesComponent } from '../data-categories/data-categories.component';
import { ViewDataComponent } from '../view-data/view-data.component';
import { PopularityPredictionComponent } from '../popularity-prediction/popularity-prediction.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  static menuItems = [
    {
      title: 'Home',
      path: 'home',
      component: HomeComponent
    },
    {
      title: 'Data Preparation',
      path: 'data-preparation',
      component: DataPreparationComponent
    },
    {
      title: 'Data Categorization',
      path: 'data-categorization',
      component: DataCategoriesComponent
    },
    {
      title: 'View Song Data',
      path: 'view-data',
      component: ViewDataComponent
    },
    {
      title: 'Popularity Prediction',
      path: 'popularity',
      component: PopularityPredictionComponent
    }
  ];

  public static getRoutes(): any[] {
    let routes: any[] = this.menuItems.map((item) => ({ path: item.path, component: item.component }));
    routes.push({ path: '', redirectTo: '/home', pathMatch: 'full' });
    routes.push({ path: '**', component: PageNotFoundComponent });
    return routes;
  }

  public static getMenuItems(): MenuItem[] {
    return this.menuItems.map((item) => ({ title: item.title, path: item.path }));
  }
}
