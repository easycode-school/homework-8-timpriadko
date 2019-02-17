import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnLoginAnswer } from './../interfaces/OnLoginAnswer';
import { SignupUserData } from '../interfaces/SignupUserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<OnLoginAnswer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<OnLoginAnswer>(`${this.apiUrl}/public/auth/login`, { email, password }, httpOptions).pipe(
      map((res: OnLoginAnswer): OnLoginAnswer => {
        if (!res.error) {
          localStorage.setItem('mlp_client_id', res.id);
          localStorage.setItem('mlp_client_token', res.token);
        }

        return res;
      })
    );
  }
  // User Sign Up
  signup(data: SignupUserData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post(`${this.apiUrl}/public/auth/signup`, { data });
  }
}
