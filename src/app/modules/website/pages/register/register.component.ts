//********************************************************************* */
//********************************************************************* */
//********************************************************************* */
// Imports

import { Component } from '@angular/core';
import { UsersService } from 'src/app/modules/shared/services/users.service';
import { OnExit } from 'src/app/guards/exit.guard';
import { Observable } from 'rxjs';

//********************************************************************* */
//********************************************************************* */
//********************************************************************* */
// Decorator definition

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

//********************************************************************* */
//********************************************************************* */
//********************************************************************* */
// Page definition
export class RegisterComponent implements OnExit {
  //****************************** */
  //****************************** */
  // Costructor

  constructor(private usersService: UsersService) {}

  //****************************** */
  //****************************** */
  // Events

  public createCustomerUser(): void {
    this.usersService
      .createUser({
        name: 'Dario',
        email: 'dario@mail.com',
        password: '1234',
        // role: 'customer',
      })
      .subscribe((user) => console.log(user));
  }

  //********************** */

  public createAdminUser(): void {
    this.usersService
      .createUser({
        name: 'Dario-admin',
        email: 'dario-admin@mail.com',
        password: '1234',
        // role: 'admin',
      })
      .subscribe((user) => console.log(user));
  }

  //********************** */

  public getAllUsers() {
    this.usersService.getUsers().subscribe((users) => console.log(users));
  }

  //****************************** */
  //****************************** */
  // Methods

  onExit() {
    const rta = confirm('Are you sure you want to exit this page?');
    return rta;
  }
}
