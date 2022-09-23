//***************************************************************** */
//***************************************************************** */
//***************************************************************** */
// Imports

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';

//***************************************************************** */
//***************************************************************** */
//***************************************************************** */
// Decorator definition

@Injectable({
  providedIn: 'root',
})

//***************************************************************** */
//***************************************************************** */
//***************************************************************** */
// Service definition
export class CategoriesService {
  //********************************** */
  //********************************** */
  // Attributes and properties

  private baseUrl: string = 'https://young-sands-07814.herokuapp.com/api';
  private categoriesUrl: string = `${this.baseUrl}/categories`;

  //********************************** */
  //********************************** */
  // Constructor

  constructor(private http: HttpClient) {}

  //********************************** */
  //********************************** */
  // Methods

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
