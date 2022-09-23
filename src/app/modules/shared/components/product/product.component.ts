//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from '../../services/store.service';

//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */
export class ProductComponent {
  //******************************************* */
  //******************************************* */
  // Atributes and properties

  @Input() product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() removedProduct = new EventEmitter<Product>();

  //******************************************* */
  //******************************************* */
  //Constructor

  constructor(private storeService: StoreService) {}

  //******************************************* */
  //******************************************* */
  // Events

  addProductToCart() {
    this.addedProduct.emit(this.product);
  }

  //*************************** */

  removeProductToCart() {
    this.removedProduct.emit(this.product);
  }

  //******************************************* */
  //******************************************* */
  // Methods

  isProductAddedToShoppingList(): boolean {
    if (this.storeService.isProductAlredyAdded(this.product)) {
      return true;
    } else {
      return false;
    }
  }
}
