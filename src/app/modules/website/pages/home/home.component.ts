//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
// Imports

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/modules/shared/services/products.service';
import { Product } from 'src/app/models/product.model';

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** */
export class HomeComponent implements OnInit {
  //******************************************* */
  //******************************************* */
  // Attributes and properties

  products: Product[] = [];

  //******************************** */

  limit: number = 10;

  //******************************** */

  offset: number = 0;

  //******************************************* */
  //******************************************* */
  // Constructor

  constructor(private productsService: ProductsService) {}

  //******************************************* */
  //******************************************* */
  // Lifre cycle methods

  ngOnInit(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = data;
        this.offset += this.limit;
      });
  }

  //******************************************* */
  //******************************************* */
  // Events

  public showMoreProducts(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
