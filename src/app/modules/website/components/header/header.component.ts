//************************************************************************************** */
//************************************************************************************** */
//************************************************************************************** */
// Imports

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/modules/shared/services/store.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { TokenService } from 'src/app/modules/shared/services/token.service';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/modules/shared/services/categories.service';
import { User } from 'src/app/models/user.model';

//************************************************************************************** */
//************************************************************************************** */
//************************************************************************************** */
// Decorator

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

//************************************************************************************** */
//************************************************************************************** */
//************************************************************************************** */
// Class definition
export class HeaderComponent implements OnInit, OnDestroy {
  //**************************************** */
  //**************************************** */
  // Attributes and Properties

  categories: Category[] = [];
  isVisible: boolean = false;
  counter: number = 0;
  private _sub$!: Subscription;
  public user: User | null = null;

  //**************************************** */
  //**************************************** */
  // Constructor

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private tokenService: TokenService,
    private categoriesService: CategoriesService
  ) {}

  //**************************************** */
  //**************************************** */
  // Life Cycle methods

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    //******** */

    this._sub$ = this.storeService.shoppingListState$.subscribe((products) => {
      this.counter = products.length;
    });

    //******** */

    this.authService.user$.subscribe((profile) => {
      this.user = profile;
    });
  }

  //************************** */

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
  }

  //**************************************** */
  //**************************************** */
  // Events

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  public logOut() {
    this.authService.logout();
  }

  //**************************************** */
  //**************************************** */
  // Methods

  isProductOnCart(): boolean {
    if (this.counter > 0) return true;
    return false;
  }

  //************************** */

  getTotalProducts(): number {
    return this.counter;
  }
}
