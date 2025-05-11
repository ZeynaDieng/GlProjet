import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  constructor(private apiService: ApiService) {}

  getVisitorsList() {
    return this.apiService.get('visitors/list');
  }
}
