//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Imports

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../../../models/product.model';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

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
// Service definition
export class ProductsService {
  //************************************** */
  //************************************** */
  // Attributes and properties

  private baseUrl: string = 'https://young-sands-07814.herokuapp.com/api';
  private productsUrl: string = `${this.baseUrl}/products`;
  private categoryUrl: string = `${this.baseUrl}/categories`;

  //************************************** */
  //************************************** */
  // Costructor

  constructor(private http: HttpClient) {}

  //************************************** */
  //************************************** */
  // Methods

  public getAllProducts(
    limit?: number,
    offset?: number
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(this.productsUrl, { params })
      .pipe(retry(3))
      .pipe(
        map((products) =>
          products.map((product) => {
            return {
              ...product,
              tax: 0.19 * product.price,
            };
          })
        )
      );
  }

  //************************ */

  public getAllProductsByCategory(
    id: string,
    limit?: number,
    offset?: number
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.categoryUrl}/${id}/products`, {
      params,
    });
  }

  //************************ */

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  //************************ */

  public createProduct(productDto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, productDto);
  }

  //************************ */

  public updateProduct(
    id: string,
    productDto: UpdateProductDTO
  ): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${id}`, productDto);
  }

  //************************ */

  public deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.productsUrl}/${id}`);
  }
}
