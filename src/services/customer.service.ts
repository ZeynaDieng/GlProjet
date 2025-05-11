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
  getMyPaternList(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]); 
      }
    }
    return this.apiService.get('organisations/list/admin?', { params });
  }
  // getMyConsultantsList(): Observable<any> {
  //   return this.apiService.get('visitors/list');
  // }

  createUser(userData: any): Observable<any> {
    console.log('Request Payload:', userData); 
  
    const accessToken = getLocalData('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.apiService.post('visitors/create', userData, { headers }).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        throw error; 
      })
    );
  }


  
  updateUser(userId: number, userData: { status: boolean }): Observable<any> {
    const accessToken = this.getAccessToken();
    
    if (!accessToken) {
      return throwError(() => new Error('Aucun token d\'accès disponible'));
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const body = {
      status: userData.status 
    };
  
    // Debug logs
    console.log('Envoi de la requête Put à:', `organisations/status/${userId}/admin`);
    console.log('Données envoyées:', body);
    console.log('Headers:', headers);
  
    return this.apiService.put(`organisations/status/${userId}/admin`, body, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur API détaillée:', {
          status: error.status,
          message: error.message,
          error: error.error,
          url: error.url,
          headers: error.headers
        });
        return throwError(() => error); 
      })
    );
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

  deleteUser(userId: number): Observable<any> {
    return this.apiService.delete(`visitors/${userId}/delete`);
  }
}