import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";

const routes: Routes = [
  // path: '' ==> permet de forcer ce composant à s'afficher par défaut
  {path: 'products/:p1/:p2', component:ProductsComponent},
  {path: '', redirectTo:'products/1/0', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
