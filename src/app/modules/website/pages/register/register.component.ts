//********************************************************************* */
//********************************************************************* */
//********************************************************************* */
// Imports

import { Component } from '@angular/core';
import { UsersService } from 'src/app/modules/shared/services/users.service';
import { OnExit } from 'src/app/guards/exit.guard';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

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
  // Attributes and properties

  public form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  //****************************** */
  //****************************** */
  // Costructor

  constructor(private usersService: UsersService) {}

  //****************************** */
  //****************************** */
  // Events

  public createUser(): void {
    const name = this.form.value.name;
    const email = this.form.value.email;
    const password = this.form.value.password;

    if (
      typeof name === 'string' &&
      typeof email === 'string' &&
      typeof password === 'string'
    ) {
      this.usersService
        .createUser({
          name: name,
          email: email,
          password: password,
        })
        .pipe(switchMap(() => this.usersService.getUsers()))
        .subscribe((user) => console.log(user));
    } else {
      console.log('Invalid register');
    }
  }

  //****************************** */
  //****************************** */
  // Methods

  onExit() {
    const rta = confirm('Are you sure you want to exit this page?');
    return rta;
  }
}
