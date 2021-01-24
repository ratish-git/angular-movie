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
  //
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}
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

  login(email: string): any {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.apiService.getAdminUsers(email).then(
      (user) => {
        this.user = user;
        this.authService.login(this.loginForm.value);
        this.router.navigateByUrl('/admin');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
