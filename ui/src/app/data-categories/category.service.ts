import { Injectable } from '@angular/core';
import { Category } from './category';
import { Overview } from './overview/overview';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public static active: number = 0;
  public static overviewActive: number = 0;

  public static getOverviewItems(): Overview[] {
    return [
      {
        image: "assets/images/kmeans_cluster.png",
        title: "KMeans Clustering",
        description: "First card description.",
        content: 'This is some content fjdkajflkdsjfjdskla fdjsalkfjds klfjdskal fdsklafj dksajf kldsaj'
      },
      {
        image: "assets/images/kmeans_cluster_target.png",
        title: "KMeans Clustering - Popularity Target",
        description: "Second card description.",
        content: 'This is some second content fjdkajflkdsjfjdskla fdjsalkfjds klfjdskal fdsklafj dksajf kldsaj'
      }
    ];
  }

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
