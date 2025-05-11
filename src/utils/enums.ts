export enum OrganisationCategory {
  administrative = 'administrative',
  provider = 'provider',
}

export enum RdvStatus {
  pending = 'pending',
  inprogress = 'in_progress',
  finished = 'terminated',
  canceled = 'canceled',
  rescheduled = 'rescheduled',
}

export enum TransactionStatus {
  pending = 'pending',
  finished = 'success',
  canceled = 'failed',
}

export enum UserRoles {
  consultant = 'company_consultant',
  owner = 'company_owner',
  admin = 'platform_owner',
}

export enum SubscriptionFrequency {
  month = 'monthly',
  year = 'yearly',
}

export enum InvoiceStatus {
  success = 'success',
  pending = 'pending',
}
export enum OrganisationTypes {
  particulier = 'particular',
  business = 'business',
}
