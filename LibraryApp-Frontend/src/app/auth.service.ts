import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiServerURL } from "./globals";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(userCredentials: any) {
    return this.http.post(`${apiServerURL}/auth/signin`, userCredentials);
  }

  signUp(userCredentials: any) {
    return this.http.post<any>(`${apiServerURL}/auth/signup`, userCredentials);
  }

  getToken() {
    return localStorage.getItem(`token`);
  }

  loggedIn() {
    return !!localStorage.getItem(`token`)
  }

}
