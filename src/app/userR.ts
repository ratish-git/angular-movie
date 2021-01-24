export class UserR {
  role!: string;
  fname!: string;
  lname!: string;
  email!: string;
  password!: string;

  constructor(
    role: string,
    fname: string,
    lname: string,
    email: string,
    password: string
  ) {
    this.role = role;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
  }
}
