//************************************************** */
//************************************************** */
//************************************************** */
// Imports

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

//************************************************** */
//************************************************** */
//************************************************** */
// Decorator definition

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})

//************************************************** */
//************************************************** */
//************************************************** */
//Component definition
export class CartProductComponent {
  //**************************** */
  //**************************** */
  //Attributes and properties
  @Input()
  public product: Product | null = null;

  @Output()
  deleteProduct = new EventEmitter<string>();

  //**************************** */
  //**************************** */
  // Constructor
  constructor() {}

  //**************************** */
  //**************************** */
  // Life cycle methods

  //**************************** */
  //**************************** */
  // Events

  public removeProduct() {
    this.deleteProduct.emit(this.product?.id);
  }
}
