//******************************************************************************** */
//******************************************************************************** */
//******************************************************************************** */
// Imports

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../../../models/user.model';

//******************************************************************************** */
//******************************************************************************** */
//******************************************************************************** */
// Decorator definition

@Injectable({
  providedIn: 'root',
})

//******************************************************************************** */
//******************************************************************************** */
//******************************************************************************** */
// Service definition
export class UsersService {
  //********************************************** */
  //********************************************** */
  // Attributes and properties

  private baseUrl: string = 'https://young-sands-07814.herokuapp.com/api/users';

  //********************************************** */
  //********************************************** */
  // Constructor

  constructor(private http: HttpClient) {}

  //********************************************** */
  //********************************************** */
  // Methods

  public createUser(body: CreateUserDTO) {
    return this.http.post<User>(this.baseUrl, body);
  }

  //************************************* */

  public getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }
}
