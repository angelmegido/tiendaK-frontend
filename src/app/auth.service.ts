import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private token: string | null = null;
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      this.token = storedToken;
      this.me().subscribe((user) => this.user.next(user));
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
          this.me().subscribe((user) => this.user.next(user));
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, {
        name,
        email,
        password,
        password_confirmation,
      })
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
          this.me().subscribe((user) => this.user.next(user));
        })
      );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.token = null;
    localStorage.removeItem('auth_token');
    this.user.next(null);
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers });
  }

  me(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
      tap((user) => {
        this.user.next(user);
      })
    );
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
