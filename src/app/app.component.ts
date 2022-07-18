import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  categories: any;
  currentCategorie: any;

  //On inject notre service
  constructor(private catService: CatalogueService,
              private  router: Router) {

  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    // Cette méthode retourne un observable
    this.catService.getRessource("/categories")
      .subscribe(data => {
        this.categories = data;
      }, error => {
        console.log(error)
      })
  }

  getProductsByCat(c:any) {
    this.currentCategorie = c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }
  onSelectedProducts(){
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/1/0")
  }
}
