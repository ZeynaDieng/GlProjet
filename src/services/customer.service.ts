import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { getLocalData } from '../utils/local-storage-service';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  updateUsers(users: any): void {
    this.usersSubject.next(users);
  }
  getUsersObservable(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }
    
  users$ = this.usersSubject.asObservable(); 
  constructor(private apiService: ApiService) {}
  getProductsList(filters: any = {}): Observable<any> {
    const accessToken = getLocalData('accessToken');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.apiService.get('products', { headers });
  }
  getMyProductsList(): Observable<any> {
        return this.apiService.get('products');
  }
  
  getProductById(productId: number): Observable<any> {
    const accessToken = getLocalData('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.apiService.get(`products/${productId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur API :', error);
        const errorMessage = this.handleHttpError(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  createProduct(userData: any): Observable<any> {
    console.log('Request Payload:', userData); 
  
    const accessToken = getLocalData('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.apiService.post('products', userData, { headers }).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        throw error; 
      })
    );
  }


  updateProduct(productId: number, userData: any): Observable<any> {
    const accessToken = this.getAccessToken();
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/ld+json'
    });
  
    const body = {
      "@id": `/api/products/${productId}`,
      "@type": "Product",
      ...userData
    };
  
    return this.apiService.put(`products/${productId}`, body, { headers });
  }
  


  
  private getAccessToken(): string | null {
    try {
      return localStorage.getItem('accessToken'); // Ou votre méthode getLocalData
    } catch (e) {
      console.error('Erreur d\'accès au storage:', e);
      return null;
    }
  }
  
  private handleHttpError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Erreur de connexion au serveur. Vérifiez votre internet.';
    } else if (error.status === 401) {
      return 'Session expirée. Veuillez vous reconnecter.';
    } else if (error.status === 403) {
      return 'Permissions insuffisantes.';
    } else {
      return error.error?.message || `Erreur serveur (${error.status})`;
    }
  }

  deleteProduct(productId: number): Observable<any> {
    const accessToken = getLocalData('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.apiService.delete(`products/${productId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur API :', error);
        return throwError(() => error);
      })
    );
  }
  
   
  
  
}    
