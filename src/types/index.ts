export interface BusItem {
  id: number;
  number: string;
  route: string;
  eta: string;
  status: "On Time" | "Delayed" | "Approaching";
  currentLocation?: string;
  nextStop?: string;
  capacity?: number;
}

export interface RouteItem {
  id: number;
  name: string;
  from: string;
  to: string;
  frequency: string;
  distance: string;
  stops: number;
}

export interface SearchFilters {
  from: string;
  to: string;
  busNumber: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  userType: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  phone: string;
}

export type PageType = "home" | "routes" | "tracking" | "contact" | "login" | "signup";