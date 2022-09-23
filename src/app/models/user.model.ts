//************************************************************* */
//************************************************************* */
//************************************************************* */
// User definition

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: 'customer' | 'admin';
}

//******************************* */
//******************************* */
// User DTO definition

export interface CreateUserDTO extends Omit<User, 'id' | 'role'> {}
