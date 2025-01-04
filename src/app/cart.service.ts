import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log('Token obtenido:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  addToCart(
    productId: number,
    quantity: number,
    size: string
  ): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(
      this.apiUrl,
      { product_id: productId, quantity, size },
      {
        headers,
        withCredentials: true,
      }
    );
  }

  getCart(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl, {
      headers,
      withCredentials: true,
    });
  }

  clearCart(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/clear`, {
      headers,
      withCredentials: true,
    });
  }

  removeFromCart(productId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${productId}`, {
      headers,
      withCredentials: true,
    });
  }
}
