//****************************************************************************** */
//****************************************************************************** */
//****************************************************************************** */
// Imports

import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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

  public form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  //******************************** */
  //******************************** */
  // Constructor

  constructor(private authService: AuthService, private router: Router) {}

  //******************************** */
  //******************************** */
  // Events

  public loginCustomer(name: string, pass: string) {
    this.authService
      .login(name, pass)
      .pipe(switchMap(() => this.authService.getCustomerProfile()))
      .subscribe();
    this.router.navigate(['/home']);
  }

  //**************************** */

  public loginAdmin(name: string, pass: string) {
    this.authService
      .login(name, pass)
      .pipe(switchMap(() => this.authService.getAdminProfile()))
      .subscribe();

    this.router.navigate(['/home']);
  }

  //**************************** */

  public login() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    if (typeof email === 'string' && typeof password === 'string') {
      if (email.includes('admin')) {
        console.log('entro');
        this.loginAdmin(email, password);
      } else {
        console.log('customer');
        this.loginCustomer(email, password);
      }
    }
  }
}
