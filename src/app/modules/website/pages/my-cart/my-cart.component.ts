//**************************************************** */
//**************************************************** */
//**************************************************** */
// Imports

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/modules/shared/services/store.service';

//**************************************************** */
//**************************************************** */
//**************************************************** */
// Decorator definition

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})

//**************************************************** */
//**************************************************** */
//**************************************************** */
//Page definition
export class MyCartComponent implements OnInit {
  //************************** */
  //************************** */
  // Attributes and properties

  public products: Product[] = [];
  public totalPrice: number = 0;

  //************************** */
  //************************** */
  // Constructor

  constructor(private storeService: StoreService) {}

  //************************** */
  //************************** */
  // Life cycle methods
  ngOnInit(): void {
    this.storeService.shoppingListState$.subscribe((products) => {
      this.products = products;
    });

    this.storeService.totalPrice$.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
  }

  //************************** */
  //************************** */
  // Events

  public removeProduct(id: string) {
    this.storeService.removeProduct(id);
  }
}
