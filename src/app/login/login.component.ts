import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService],
})
export class LoginComponent implements OnInit {
  public user!: User[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    //  this.getAdminUsers(email);
  }
  loginForm!: FormGroup;
  submitted = false;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }
  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    let email = this.formControls['email'].value;
    console.log(this.getAdminUsers(email));
    if (this.loginForm.invalid) {
      return;
    }
    // } else if (
    //   this.getAdminUsers(email).email === this.loginForm.value.email &&
    //   this.getAdminUsers(email).password === this.loginForm.value.password
    // ) {
    //   console.log('Validated');
    //   this.authService.login(this.loginForm.value);
    //   this.router.navigateByUrl('/admin');
    // }
    else{
      console.log("Check credentials")
      this.authService.login(this.loginForm.value);
      this.router.navigateByUrl('/admin');
    }
  }


  getAdminUsers(email: string): any {
    console.log("Email.."+email);
    this.apiService.getAdminUsers(email).then(
      (user) => {
        this.user = user;
      },
      (err) => {
        console.log(err);
      }
    );
    return this.user;
  }
}
