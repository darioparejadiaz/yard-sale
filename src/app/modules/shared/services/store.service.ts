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

  private _shoppingList: Product[] = [];

  //******************************** */

  private _shoppingListState = new BehaviorSubject<Product[]>([]);

  //******************************** */

  public shoppingListState$ = this._shoppingListState.asObservable();

  //******************************** */

  private _totalPrice: number = 0;

  //************************************************ */
  //************************************************ */
  // Constructor

  constructor() {}

  //************************************************ */
  //************************************************ */
  // Getteres and Setters

  public get shoppingList(): Product[] {
    return this._shoppingList;
  }

  //******************************** */

  public get totalPrice(): number {
    return this._totalPrice;
  }

  //************************************************ */
  //************************************************ */
  // Methods

  public isProductAlredyAdded(product: Product): boolean {
    const index = this._shoppingList.findIndex(
      (item) => item.id === product.id
    );
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  //******************************** */

  private calculateTotalPrice(): void {
    this._totalPrice = this._shoppingList.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }

  //******************************** */

  public addProduct(product: Product): void {
    if (!this.isProductAlredyAdded(product)) {
      this._shoppingList.push(product);
      this.calculateTotalPrice();
      this._shoppingListState.next(this._shoppingList);
    }
  }

  //******************************** */

  public removeProduct(productId: string): void {
    const index = this._shoppingList.findIndex((item) => item.id === productId);
    if (index != -1) {
      this._shoppingList.splice(index, 1);
      this.calculateTotalPrice();
      this._shoppingListState.next(this._shoppingList);
    }
  }

  //******************************** */
}
