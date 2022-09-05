import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/core/modals/auth.modal';
import { User } from 'src/app/core/modals/user.modal';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  signupData: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {

    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['' , [Validators.required, Validators.minLength(5)]],
      }
    );
  }

  onSubmit() {
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      // do what you wnat with your data
      this.signupData = {
        name: this.signupForm.controls['name'].value,
        email: this.signupForm.controls['email'].value,
        password: this.signupForm.controls['password'].value
      }
      this.authService.signupUser(this.signupData).subscribe( 
        (result: User) => {
          console.log(result);
          if(result._id != '') {
            this.router.navigate(['']);
          }
        },
        error => {
          //this.signupErr = error.message
        }
      )
      // setTimeout(() => {
      //   this.authService.signupUser( this.signupData);
      //   this.router.navigate(['']);
      // }, 1000);
    }
  }

}
