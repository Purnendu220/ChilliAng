import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: any;
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }

  onSubmit() {

    this.submitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value))
    }

    // this.submitted = true;
    // this.authService.login(this.username.value, this.password.value).subscribe((data) => {
    //    if (this.authService.isLoggedIn) {
    //       const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
    //       this.router.navigate([redirect]);
    //     } else {
    //       this.loginError = 'Username or password is incorrect.';
    //     }
    //   },
    //   error => this.error = error
    // );
  }

}
