import type { RouteItem } from "../types/index";

export const mockRoutes: RouteItem[] = [
  {
    id: 1,
    name: "Route A",
    from: "Central Station",
    to: "Airport",
    frequency: "10 min",
    distance: "25 km",
    stops: 12,
  },
  {
    id: 2,
    name: "Route B",
    from: "Mall",
    to: "University",
    frequency: "15 min",
    distance: "18 km",
    stops: 8,
  },
  {
    id: 3,
    name: "Route C",
    from: "Hospital",
    to: "Downtown",
    frequency: "12 min",
    distance: "22 km",
    stops: 15,
  },
  {
    id: 4,
    name: "Route D",
    from: "Tech Park",
    to: "Residential Area",
    frequency: "20 min",
    distance: "30 km",
    stops: 10,
  },
];
