//*********************************************************************** */
//*********************************************************************** */
//*********************************************************************** */
// Imports

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Router } from '@angular/router';

//*********************************************************************** */
//*********************************************************************** */
//*********************************************************************** */
// Decorator definition

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

//*********************************************************************** */
//*********************************************************************** */
//*********************************************************************** */
// Page definition
export class ProfileComponent implements OnInit {
  //************************ */
  //************************ */
  // Attributes and properties

  public user: User | null = null;

  //************************ */
  //************************ */
  // Constructor

  constructor(private authService: AuthService, private router: Router) {}

  //************************ */
  //************************ */
  // Life cycle methods

  ngOnInit(): void {
    this.authService.user$.subscribe((profile) => {
      this.user = profile;
    });
  }

  //************************ */
  //************************ */
  // Events

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
