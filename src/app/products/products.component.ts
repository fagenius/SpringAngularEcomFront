import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  host!: string;

  constructor(public  catService: CatalogueService,
              private route: ActivatedRoute,
              private router: Router) {

            }

  ngOnInit(): void {
    this.getNavigationRoute();
  }

  private getProducts(url: string) {
    this.catService.getRessource(url)
      .subscribe(data => {
        this.products = data
      }, error => {
        console.log(error)
      })
  }

  getNavigationRoute(){
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        let url = val.url;
        let p1 = this.route.snapshot.params.p1;
        if(p1 == 1){
          // Si p1 = 1, on récupère les produits sélectionnés
          this.getProducts("/products/search/selectedProducts");
        }else if (p1 == 2){
          // Si p1 = 1, on récupère les produits d'une catégorie
          let idCat = this.route.snapshot.params.p2
          this.getProducts('/categories/'+idCat+'/products');
        }
        this.host = this.catService.host;
      }
    });
    let p1 = this.route.snapshot.params.p1;
    if(p1 == 1){
      // Si p1 = 1, on récupère les produits sélectionnés
      this.getProducts("/products/search/selectedProducts");
    }
  }
}
