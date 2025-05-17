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
     
    // return this.apiService.post('auth/login', body);
     return this.apiService.post('login_check', body);
  
  }

  
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
