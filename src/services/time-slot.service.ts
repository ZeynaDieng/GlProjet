import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  constructor(private apiService: ApiService) {}

  getOrganisationTimeSlots(params: any) {
    return this.apiService.get(`time_slots/available`, { params });
  }

  getAvailableConsultants(params: any) {
    return this.apiService.get('time_slots/consultants/available', { params });
  }
}
