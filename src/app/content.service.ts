import { Injectable } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DataPreparationComponent } from './data-preparation/data-preparation.component';
import { MenuItem } from './menu/menu-item';
import { DataCategoriesComponent } from './data-categories/data-categories.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { PopularityPredictionComponent } from './popularity-prediction/popularity-prediction.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeItem } from './home/home-item';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  static contentItems = [
    {
      title: 'Home',
      path: 'home',
      component: HomeComponent,
      isContentItem: false
    },
    {
      title: 'Song Data',
      path: 'song-data',
      component: ViewDataComponent,
      isContentItem: true,
      description: 'View song data, filter by song attributes, and visualize song characteristics.',
      icon: 'slds-icon-standard-search',
      svg: '/assets/icons/standard-sprite/svg/symbols.svg#search'
    },
    {
      title: 'Data Categorization',
      path: 'data-categorization',
      component: DataCategoriesComponent,
      isContentItem: true,
      description: 'Visualize data categorization generated using K-Means clustering algorithms.',
      icon: 'slds-icon-standard-category',
      svg: '/assets/icons/standard-sprite/svg/symbols.svg#category'
    },
    {
      title: 'Popularity Prediction',
      path: 'popularity',
      component: PopularityPredictionComponent,
      isContentItem: true,
      description: 'Input song information and predict the popularity outcome.',
      icon: 'slds-icon-standard-customer-lifecycle-analytics',
      svg: '/assets/icons/standard-sprite/svg/symbols.svg#customer_lifecycle_analytics'
    },
    {
      title: 'Data Experimentation',
      path: 'data-experiments',
      component: DataPreparationComponent,
      isContentItem: true,
      description: 'Upload new song data to clean and standardize its features or generate new data models.',
      icon: 'slds-icon-standard-data-streams',
      svg: '/assets/icons/standard-sprite/svg/symbols.svg#data_streams'
    }
  ];

  public static getRoutes(): any[] {
    let routes: any[] = this.contentItems.map((item) => ({ 
      path: item.path, 
      component: item.component 
    }));

    routes.push({ path: '', redirectTo: '/home', pathMatch: 'full' });
    routes.push({ path: '**', component: PageNotFoundComponent });
    return routes;
  }

  public static getMenuItems(): MenuItem[] {
    return this.contentItems.map((item) => ({ 
      title: item.title, 
      path: item.path 
    }));
  }

  public static getHomeItems(): HomeItem[] {
    return this.contentItems
      .filter((item) => item.isContentItem)
      .map((item) => ({
        title: item.title,
        description: item.description,
        svg: item.svg,
        icon: item.icon,
        path: item.path
      }));
  }
}
