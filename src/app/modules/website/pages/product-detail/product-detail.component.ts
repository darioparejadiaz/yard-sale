//********************************************************************** */
//********************************************************************** */
//********************************************************************** */
// Imports

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/modules/shared/services/products.service';
// import { UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/modules/shared/services/store.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

//********************************************************************** */
//********************************************************************** */
//********************************************************************** */
// Decorator definition

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

//********************************************************************** */
//********************************************************************** */
//********************************************************************** */
//Page definition
export class ProductDetailComponent implements OnInit {
  //*********************************** */
  //*********************************** */
  // Attributes and properties

  private productId: string | null = null;
  public product: Product | null = null;

  // product: Product = {
  //   id: '',
  //   title: '',
  //   price: 0,
  //   description: '',
  //   category: {
  //     id: '',
  //     name: '',
  //     typeImg: '',
  //   },
  //   images: [],
  // };

  //*********************************** */
  //*********************************** */
  // Costructor

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private storeService: StoreService,
    private location: Location,
    private router: Router
  ) {}

  //*********************************** */
  //*********************************** */
  // Life cycle methods

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getProductById(this.productId);
          }
          return [null];
        })
      )
      .subscribe(
        (data) => {
          this.product = data;
        },
        () => {
          this.router.navigate(['not-found']);
        }
      );
  }

  //*********************************** */
  //*********************************** */
  // Events

  closeProductDetail() {
    this.location.back();
  }

  //******************************** */

  addProductToShoppingList(product: Product) {
    this.storeService.addProduct(product);
  }

  //******************************** */

  removeProductToShoppingList(product: Product) {
    this.storeService.removeProduct(product.id);
  }

  //******************************** */

  // public updateProduct(): void {
  //   if (this.product?.id) {
  //     const productUpdate: UpdateProductDTO = {
  //       title: 'DP-edited title',
  //       description: 'DP-edited description',
  //       price: 1,
  //     };
  //     this.productsService
  //       .updateProduct(this.product.id, productUpdate)
  //       .subscribe((data) => {
  //         console.log(data);
  //         this.product = data;
  //       });
  //   }
  // }

  //******************************** */

  // public deleteProduct(): void {
  //   if (this.product?.id) {
  //     const id: string = this.product.id;
  //     this.productsService.deleteProduct(id).subscribe((product) => {
  //       console.log(product);
  //     });
  //   }
  // }

  //*********************************** */
  //*********************************** */
  // Methods

  isProductAddedToShoppingList(): boolean {
    if (this.product) {
      if (this.storeService.isProductAlredyAdded(this.product)) {
        return true;
      }
    }
    return false;
  }
}
