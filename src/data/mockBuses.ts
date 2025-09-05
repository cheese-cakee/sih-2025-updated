
import type { BusItem } from "../types/index.ts";

export const mockBuses: BusItem[] = [
  {
    id: 1,
    number: "B101",
    route: "Central Station → Airport",
    eta: "5 min",
    status: "On Time",
  },
  {
    id: 2,
    number: "B205",
    route: "Mall → University",
    eta: "12 min",
    status: "Delayed",
  },
  {
    id: 3,
    number: "B308",
    route: "Hospital → Downtown",
    eta: "8 min",
    status: "On Time",
  },
];
