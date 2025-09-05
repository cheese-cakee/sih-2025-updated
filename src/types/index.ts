//App Navigation
export type PageType =
  | "home"
  | "routes"
  | "tracking"
  | "contact"
  | "login"
  | "signup";

//Data Types
export interface RouteItem {
  id: number;
  name: string;
  from: string;
  to: string;
  frequency: string;
}

export interface BusItem {
  id: number;
  number: string;
  route: string;
  eta: string;
  status: "On Time" | "Delayed";
}
