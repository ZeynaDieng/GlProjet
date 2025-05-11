export interface Slot {
  id: number;
  start_time: string;
  end_time: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  time_slots: Slot[];
}

export interface OrganisationSchedule {
  id: number;
  start_time: string;
  end_time: string;
}

export interface Organisation {
  id: number;
  organisation_name: string;
  organisation_email: string;
  organisation_phone: string;
  organisation_address: string;
  logo: string | null;
  site_web: string;
  type: string;
  category: string;
  authorize_payment_online_service?: boolean;

  organisation_schedules: Slot[];
  time_slots?: Slot[];
  services?: Service[];
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
