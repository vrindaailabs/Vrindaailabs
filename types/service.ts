export interface Service {

  id: number;

  title: string;

  shortDescription: string;

  description: string;

  icon: string;

  imageUrl: string;

  active: boolean;

  createdAt: string;

}

export interface ServiceRequest {

  title: string;

  shortDescription: string;

  description: string;

  icon: string;

  imageUrl: string;

}

export interface ServiceResponse {

  success: boolean;

  message: string;

  data: Service;

}

export interface ServiceListResponse {

  success: boolean;

  message: string;

  data: Service[];

}