
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
    constructor(private apiService: ApiService) {}

getOrganisationStatistic() {
    return this.apiService.get('statistics/global');
  }

  getOrganisationFactureStatistic() {
    return this.apiService.get('subscriptions/list_invoices/admin');
  }
}