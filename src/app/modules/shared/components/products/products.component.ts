//******************************************************************************* */
//******************************************************************************* */
//******************************************************************************* */
// Imports

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

//******************************************************************************* */
//******************************************************************************* */
//******************************************************************************* */
// Decorator

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

//******************************************************************************* */
//******************************************************************************* */
//******************************************************************************* */
// Component definition
export class ProductsComponent {
  //******************************************* */
  //******************************************* */
  // Atributes and Properties

  @Input() products: Product[] = [];
  @Output() loadMoreProducts = new EventEmitter();
  limit: number = 10;
  offset: number = 0;

  //******************************************* */
  //******************************************* */
  // Constructor

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {}

  //******************************************* */
  //******************************************* */
  // Events

  addProductToShoppingList(product: Product) {
    this.storeService.addProduct(product);
  }

  //******************************** */

  removeProductToShoppingList(product: Product) {
    this.storeService.removeProduct(product.id);
  }

  //******************************** */

  public createProduct(): void {
    const newProduct: CreateProductDTO = {
      title: 'DP-new Product',
      price: 1,
      description: 'A new DP product',
      images: [
        'https://placeimg.com/640/480/arch?r=0.8998398703658343',
        'https://placeimg.com/640/480/arch?r=0.332169109836298',
        'https://placeimg.com/640/480/arch?r=0.6344471057993148',
      ],
      categoryId: '3',
    };
    this.productsService.createProduct(newProduct).subscribe((data) => {
      console.log(data);
      this.products.push(data);
    });
  }

  //******************************** */

  public showMoreProducts(): void {
    this.loadMoreProducts.emit();
  }

  //******************************************* */
  //******************************************* */
  // Methods

  getTotalProducts(): number {
    return this.storeService.shoppingList.length;
  }

  //******************************** */

  getTotalPrice(): number {
    return this.storeService.totalPrice;
  }
}
