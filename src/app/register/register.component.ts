import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserR } from '../userR';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  responded:any="Add Below  Required fields to Sign Up";
  registerForm!: FormGroup;
  submitted = false;
  public users!: UserR[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private httpClient: HttpClient,
    private router: Router,
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

  private readonly addUserUrl = 'http://localhost:8080/user/addUser';

  addUser(postData:UserR) {
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
    this.httpClient
      .post(this.addUserUrl, user,{responseType:'text'})
      .subscribe((responseData) => {
        console.log(responseData);  
        this.responded = responseData;
      });
      // this.router.navigateByUrl('/movie');
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
