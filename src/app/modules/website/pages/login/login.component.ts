import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

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
}
