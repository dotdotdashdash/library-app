import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userCredentials = {
    userName: '',
    passWord: ''
  };  
  pwdFieldType = 'password';
  pwdViewEyeIcon = 'fa-eye'


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  userSignIn() {
    this.authService.signIn(this.userCredentials)
      .subscribe((res: any)=> {
        if(res.status) {
          localStorage.setItem(`token`, res.token);
          this.router.navigate(['books']);
        } else {
          alert(res.result)
        }
      });
  }

  togglePasswordView() {
    if(!(this.userCredentials.passWord == '')) {
      this.pwdFieldType = this.pwdFieldType == 'password' ? 'text' : 'password';
      this.pwdViewEyeIcon = this.pwdViewEyeIcon == 'fa-eye' ? 'fa-eye-slash' : 'fa-eye';
    } 
  }

}
