import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7163/api/User/"
  private userPayload: any

  constructor(private http: HttpClient) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj:any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  signOut(): boolean {
    localStorage.clear();
    return true;
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService()
    const token = this.getToken()!
    return jwtHelper.decodeToken(token)
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role
    }
  }
}
