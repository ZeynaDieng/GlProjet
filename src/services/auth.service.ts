import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { LoginDto } from '../models/dto';
import { Router } from '@angular/router';
import {
  clearLocalStorage,
  getLocalData,
} from '../utils/local-storage-service';
import { OrganisationCategory, UserRoles } from '../utils/enums';
import { log } from 'console';
import { HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserConnected() {
    return !!localStorage.getItem('accessToken');
  }

  constructor(private apiService: ApiService, private router: Router) {}

  
  

  login(body: LoginDto) {
    console.log('login', body);
     const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        
    'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
     };
     return this.apiService.post('login_check', body, { headers });
  
  }


// login(credentials: { username: string, password: string }): Observable<any> {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Access-Control-Allow-Origin': 'http://localhost:4200'
//   });

//   return this.apiService.post('/login_check', credentials, { 
//     headers,
//     withCredentials: true
//   }).pipe(
//     catchError(error => {
//       if (error.status === 0) {
//         console.error('CORS error - Verify backend configuration');
//       }
//       return throwError(() => error);
//     })
//   );
// }

  
  updatePassword(body: any) {
    return this.apiService.put('auth/update-password', body);
  }

  logout() {
    clearLocalStorage();
    this.router.navigate(['/login']);
  }

  getToken() {
    const token = localStorage.getItem('accessToken');
    return token;
  }
  register(body: any) {
    return this.apiService.post('auth/register', body);
  }
}
