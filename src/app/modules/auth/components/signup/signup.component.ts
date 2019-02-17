import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { SignupUserData } from './../../interfaces/SignupUserData';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Init signup form
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'nickname': new FormControl('', [Validators.required]),
      'first_name': new FormControl('', [Validators.required]),
      'last_name': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'gender_orientation': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'country': new FormControl('', [Validators.required]),
      'date_of_birth_day': new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.max(31)]),
      'date_of_birth_month': new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.max(12)]),
      'date_of_birth_year': new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.max(2010)])
    });
  }

  // Submit Sign up form
  onSignup() {
    const userData: SignupUserData = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      nickname: this.signupForm.get('nickname').value,
      first_name: this.signupForm.get('first_name').value,
      last_name: this.signupForm.get('last_name').value,
      phone: this.signupForm.get('phone').value,
      gender_orientation: this.signupForm.get('gender_orientation').value,
      city: this.signupForm.get('city').value,
      country: this.signupForm.get('country').value,
      date_of_birth_day: this.signupForm.get('date_of_birth_day').value,
      date_of_birth_month: this.signupForm.get('date_of_birth_month').value,
      date_of_birth_year: this.signupForm.get('date_of_birth_year').value
    };
    this.authService.signup(userData).subscribe((data) => {
      console.log(data);
    });
    console.log(userData);
  }
}
