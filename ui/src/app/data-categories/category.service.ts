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
        index: 0,
        image: "assets/images/popularity.png",
        title: "Popularity Frequency",
        description: "This graph displays the proportional frequency of the popularity of each clustered category.",
        content: "You can see that the clusters are not evenly distributed count-wise. This is common when using an unsupervised algorithm to cluster items - the items are categorized by features that help us understand the underlying data."
      },
      {
        index: 1,
        image: "assets/images/kmeans_cluster.png",
        title: "KMeans Clustering",
        description: "This graph displays the clustered categories. Principal Component Analysis (PCA) methods were used to reduce the numerous features down to two numerical categories so the items could be visualized.",
        content: 'Principal Component Analysis finds the best linear combinations of the multiple variables, with the goal of maximizing the variance along the new variables.'
      },
      {
        index: 2,
        image: "assets/images/kmeans_cluster_target.png",
        title: "KMeans Clustering - Popularity Target",
        description: "This graph displays the same clustered categories with reduced feature dimensions via PCA, but also shows the relative frequency of the popularity (target 1=popular, 0=unpopular)",
        content: 'Because this view is clustered and represents thousands of individual songs, the target spread is not helpful in displaying frequency (refer to the Popularity Frequency graph). Instead, this graph is helpful in visualizing the relative proportional frequency of popularity occurrence within each cluster.'
      }
    ];
  }

  public getCategoryGraphs(index: number) {
    return [
      {
        src: this.barSrc(index),
        header: 'Attribute Graph',
        description: 'All features of the category.',
        alt: 'Category features',
        index: 0
      },
      {
        src: this.pieSrc(index),
        header: 'Category Average Song Attributes',
        description: 'The average song attributes for this category.',
        alt: 'Category song attributes',
        index: 1
      },
      {
        src: this.pieGenreSrc(index),
        header: 'Category Song Genres',
        description: 'The song genres that comprise this category.',
        alt: 'Category song genres',
        index: 2
      }
    ];
  }

  private barSrc(index: number): string {
    return 'assets/images/c' + index + '_bar.png';
  }

  private pieSrc(index: number): string {
    return 'assets/images/c' + index + '_pie.png';
  }

  private pieGenreSrc(index: number): string {
    return 'assets/images/c' + index + '_pie_genre.png';
  }

  public static getCategories(): Category[] {
    return [
      {
        number: 0,
        characterization: 'Category 1 is almost entirely comprised of the Comedy genre.',
        description: 'Comedy "songs" streaming on Spotify have unique characteristics that make them difficult to compare to traditional songs. A cluster separating comedy songs from others makes sense, and this categorization indicates that comedy is a very niche streaming offering. The popularity of most comedy songs is very low, making Category 1 a difficult bet if streaming popularity is the goal.'
      },
      {
        number: 1,
        characterization: 'Category 2 is characterized by lower danceability and lower instrumentalness, and spans genres such as Opera, Movie Soundtracks, Jazz, World music, etc.',
        description: 'These songs are middle of the road in terms of popularity - roughly half are considered popular successes. They are typically quite loud and acoustic, but with lower energy and danceability levels. This category is worth exploring further, but is not a high priority when it comes to identifying immediately popular streaming songs.'
      },
      {
        number: 2,
        characterization: 'Category 3 is all Children\'s music.',
        description: 'Children\'s music appears to be typically loud, with decent energy and danceability but with low acoustic qualities. The genre seems to have a fairly high success rate of popularity, meaning that children\'s music is a fairly low risk bet for pursuing popularity. These songs tend to be less complex, more repetitive, and easier to make a profit on due to their lower production costs and lower quality standards.'
      },
      {
        number: 3,
        characterization: 'Category 4 is the largest category, spanning many genres. Their common thread is very high levels of loudness, energy, and danceability.',
        description: 'This category has the highest rate of popularity success, suggesting that people trend towards loud music they can dance to. This is not necessarily a novel concept, but is still useful for filtering out candidates for music to invest in. The category also indicates that low levels of acousticness seems to have a higher correlation with successful popularity.'
      },
      {
        number: 4,
        characterization: 'Category 5 appears to be a group of classical music.',
        description: 'This cluster scores highly in the areas of instrumentalness and acousticness, with lower scores in energy and danceability. Classical music appears to be less popular than the other categories, only beating out comedy albums for popularity rates. While classical music is appreciated, it does not appear to present a strong investment opportunity if streaming popularity is the goal.'
      }
    ];
  }
}
