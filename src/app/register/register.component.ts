import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserR } from '../userR';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  public users!: UserR[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        role: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        //validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  addUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log('role..' + this.f['role'].value);
    let role = this.f['role'].value;
    let fname = this.f['firstName'].value;
    let lname = this.f['lastName'].value;
    let email = this.f['email'].value;
    let password = this.f['password'].value;
    let user = new UserR(role, fname, lname, email, password);
    this.apiService.addUser(user).then(
      (users) => {
        this.users = users;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
