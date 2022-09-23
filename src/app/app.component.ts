//******************************************************************* */
//******************************************************************* */
//******************************************************************* */

import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/shared/services/auth.service';
import { TokenService } from './modules/shared/services/token.service';

//******************************************************************* */
//******************************************************************* */
//******************************************************************* */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

//******************************************************************* */
//******************************************************************* */
//******************************************************************* */
export class AppComponent implements OnInit {
  //**************************************** */
  //**************************************** */
  // Constructor

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  //**************************************** */
  //**************************************** */
  // Life Cycle Methods

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    const role = this.tokenService.getRole();
    if (token && role) {
      switch (role) {
        case 'customer':
          this.authService.getCustomerProfile().subscribe();
          break;
        case 'admin':
          this.authService.getAdminProfile().subscribe();
          break;

        default:
          break;
      }
    }
  }

  //********************** */
}
