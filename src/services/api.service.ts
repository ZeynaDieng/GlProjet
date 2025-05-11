import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { environment as devEnvironment } from '../environments/environment'; // Importer l'environnement de développement
import { environment as prodEnvironment } from '../environments/environment.prod'; // Importer l'environnement de production
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.base_url; // Base URL de l'API

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: any) {
    return this.http.get<T>(`${this.API_URL}/${endpoint}`, options);
  }

  post<T>(endpoint: string, body: any, options?: any) {
    console.log('API URL:', this.API_URL); // Afficher l'URL de l'API dans la console
    console.log('Endpoint:', endpoint); // Afficher l'endpoint dans la console
    return this.http.post<T>(`${this.API_URL}/${endpoint}`, body, options);
  }

  put<T>(endpoint: string, body: any, options?: any) {
    return this.http.put<T>(`${this.API_URL}/${endpoint}`, body, options);
  }

  patch<T>(endpoint: string, body: any, options?: any) {
    return this.http.patch<T>(`${this.API_URL}/${endpoint}`, body, options);
  }

  delete<T>(endpoint: string, options?: any) {
    return this.http.delete<T>(`${this.API_URL}/${endpoint}`, options);
  }

  getOrganisationInfo<T>(endpoint: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '69420',
      'ngrok-skip-notify': 'true',
      'ngrok-skip-welcome': 'true',
    });
    return this.http.get<T>(`${this.API_URL}/organisations/info/${endpoint}`, {
      headers,
    });
  }


  
}
