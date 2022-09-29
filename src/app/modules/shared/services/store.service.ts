//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Imports

import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';

//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Decorator

@Injectable({
  providedIn: 'root',
})

//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Service Definition
export class StoreService {
  //************************************************ */
  //************************************************ */
  // Attributes and Properties

  private shoppingList: Product[] = [];
  private shoppingListState = new BehaviorSubject<Product[]>([]);
  public shoppingListState$ = this.shoppingListState.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPrice.asObservable();

  //************************************************ */
  //************************************************ */
  // Constructor

  constructor() {}

  //************************************************ */
  //************************************************ */
  // Methods

  public isProductAlredyAdded(product: Product): boolean {
    const index = this.shoppingList.findIndex((item) => item.id === product.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  //******************************** */

  private calculateTotalPrice(): void {
    const totalPrice = this.shoppingList.reduce(
      (sum, product) => sum + product.price,
      0
    );
    this.totalPrice.next(totalPrice);
  }

  //******************************** */

  public addProduct(product: Product): void {
    if (!this.isProductAlredyAdded(product)) {
      this.shoppingList.push(product);
      this.calculateTotalPrice();
      this.shoppingListState.next(this.shoppingList);
    }
  }

  //******************************** */

  public removeProduct(productId: string): void {
    const index = this.shoppingList.findIndex((item) => item.id === productId);
    if (index != -1) {
      this.shoppingList.splice(index, 1);
      this.calculateTotalPrice();
      this.shoppingListState.next(this.shoppingList);
    }
  }

  //******************************** */
}
