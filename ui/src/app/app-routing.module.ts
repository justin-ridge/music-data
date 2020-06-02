import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentService } from './content.service';

const routes = ContentService.getRoutes();

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
