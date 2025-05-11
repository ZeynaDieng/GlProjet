import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  constructor(private apiService: ApiService) {}

  getPacksList() {
    return this.apiService.get('packs/list', {
      headers: {
        'ngrok-skip-browser-warning': '69420',
      },
    });
  }
}
