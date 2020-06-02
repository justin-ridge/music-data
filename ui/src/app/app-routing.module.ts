import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuService } from './menu/menu.service';

const routes = MenuService.getRoutes();

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
