//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */
// Imports

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/modules/shared/services/products.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */
// Decorator definition

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})

//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */
// Page definition
export class CategoryComponent implements OnInit {
  //********************************** */
  //********************************** */
  // Attributes and properties

  categoryId: string | null = null;
  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;

  //********************************** */
  //********************************** */
  // Constructor

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  //********************************** */
  //********************************** */
  // Life cycle methods

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            this.offset = 0;
            return this.productsService.getAllProductsByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe(
        (products) => {
          if (products.length === 0) {
            this.router.navigate(['not-found']);
          }
          this.products = products;
        },
        () => {
          this.router.navigate(['not-found']);
        }
      );
  }

  //********************************** */
  //********************************** */
  // Events

  public showMoreProducts() {
    if (this.categoryId) {
      this.offset += this.limit;
      this.productsService
        .getAllProductsByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((products) => {
          this.products = this.products.concat(products);
        });
    }
  }
}
