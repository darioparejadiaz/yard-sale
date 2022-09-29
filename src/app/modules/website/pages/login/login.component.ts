//****************************************************************************** */
//****************************************************************************** */
//****************************************************************************** */
// Imports

import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

//****************************************************************************** */
//****************************************************************************** */
//****************************************************************************** */
// Decorator definition

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

//****************************************************************************** */
//****************************************************************************** */
//****************************************************************************** */
// Page definition
export class LoginComponent {
  //******************************** */
  //******************************** */
  // Attributes and properties

  public email = new FormControl();
  public password = new FormControl();

  //******************************** */
  //******************************** */
  // Constructor

  constructor(private authService: AuthService, private router: Router) {}

  //******************************** */
  //******************************** */
  // Events

  public loginCustomer() {
    this.authService
      .login('dario@mail.com', '1234')
      .pipe(switchMap(() => this.authService.getCustomerProfile()))
      .subscribe();
    this.router.navigate(['/home']);
  }

  //**************************** */

  public loginAdmin() {
    this.authService
      .login('dario-admin@mail.com', '1234')
      .pipe(switchMap(() => this.authService.getAdminProfile()))
      .subscribe();
    this.router.navigate(['/home']);
  }

  //**************************** */
}
