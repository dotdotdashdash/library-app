import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  userCredentials = {
    fullName: '',
    userName: '',
    passWord: ''
  };
  repeatPassWord ='';
  pwdFieldType = 'password';
  pwdViewEyeIcon = 'fa-eye'

  constructor(
    private authService: AuthService,
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  userSignup() {
    if(this.userCredentials.passWord == this.repeatPassWord) {
      this.authService.signUp(this.userCredentials)
        .subscribe((response)=>{
          // console.log(response);
          if(response.status) {
            alert(`Signup Successful! Login Now`);
            this.router.navigate(['signin']);
          } else {
            alert(response.result);
          }
        });
    } else {
      alert(`Passwords doesn't match!`);
    }
  }

  togglePasswordView() {
    if(!(this.userCredentials.passWord == '')) {
      this.pwdFieldType = this.pwdFieldType == 'password' ? 'text' : 'password';
      this.pwdViewEyeIcon = this.pwdViewEyeIcon == 'fa-eye' ? 'fa-eye-slash' : 'fa-eye';
    } 
  }

}
