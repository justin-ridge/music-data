import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NglModule } from 'ng-lightning';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { DataPreparationComponent } from './data-preparation/data-preparation.component';
import { DataCategoriesComponent } from './data-categories/data-categories.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { PopularityPredictionComponent } from './popularity-prediction/popularity-prediction.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeItemsComponent } from './home/home-items/home-items.component';
import { HomeItemComponent } from './home/home-item/home-item.component';
import { DataCategoryComponent } from './data-categories/data-category/data-category.component';
import { OverviewComponent } from './data-categories/overview/overview.component';
import { DataModelComponent } from './data-model/data-model.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    DataPreparationComponent,
    DataCategoriesComponent,
    ViewDataComponent,
    PopularityPredictionComponent,
    PageNotFoundComponent,
    HomeItemsComponent,
    HomeItemComponent,
    DataCategoryComponent,
    OverviewComponent,
    DataModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NglModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
