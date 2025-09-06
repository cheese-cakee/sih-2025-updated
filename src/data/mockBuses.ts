import type { BusItem } from "../types/index";

export const mockBuses: BusItem[] = [
  {
    id: 1,
    number: "B101",
    route: "Central Station → Airport",
    eta: "5 min",
    status: "On Time",
    currentLocation: "Main Street",
    nextStop: "City Mall",
    capacity: 85,
  },
  {
    id: 2,
    number: "B205",
    route: "Mall → University",
    eta: "12 min",
    status: "Delayed",
    currentLocation: "University Gate",
    nextStop: "Library Square",
    capacity: 92,
  },
  {
    id: 3,
    number: "B308",
    route: "Hospital → Downtown",
    eta: "8 min",
    status: "Approaching",
    currentLocation: "Medical Center",
    nextStop: "Business District",
    capacity: 67,
  },
  {
    id: 4,
    number: "B412",
    route: "Tech Park → Residential Area",
    eta: "15 min",
    status: "On Time",
    currentLocation: "Innovation Hub",
    nextStop: "Green Valley",
    capacity: 54,
  },
];
