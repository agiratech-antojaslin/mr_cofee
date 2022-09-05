import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/core/modals/auth.modal';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionsService } from 'src/app/core/services/sessions.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  signinData: any = {};
  signinErr: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionsService: SessionsService
  ) {
  }

  ngOnInit() {

    this.signinForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      }
    );
  }

  onSubmit() {
    if (this.signinForm.valid) {
      // do what you wnat with your data
      this.signinData = {
        email: this.signinForm.controls['email'].value,
        password: this.signinForm.controls['password'].value
      }
      this.authService.signinUser(this.signinData).subscribe( 
        (result: AuthUser) => {
          console.log(result);
          if(result.token != '') {
            this.sessionsService.setStorage(result);
            this.router.navigate(['admin/dashboard']);
          }
        },
        error => {
          console.log(error.error);
          this.signinErr = error.error;
        }
      )
      // if(this.authService.signinUser( this.signInData)) {
      //   this.router.navigate(['admin/dashboard']);
      // } else {
      //   this.signInErr = "Invalid login details";
      // }
      // setTimeout(() => {
      //   this.authService.signinUser( this.signInData);
        
      // }, 1000);
    }
  }

}
