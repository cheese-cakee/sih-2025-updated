import type { RouteItem } from "../types/index";

export const mockRoutes: RouteItem[] = [
  {
    id: 1,
    name: "Route A",
    from: "Howrah Station",
    to: "Salt Lake Sector V",
    frequency: "10 min",
    distance: "25 km",
    stops: 12,
  },
  {
    id: 2,
    name: "Route B",
    from: "Airport ",
    to: "Esplanade",
    frequency: "15 min",
    distance: "18 km",
    stops: 8,
  },
  {
    id: 3,
    name: "Route C",
    from: "New Town Action Area I",
    to: "Howrah Station",
    frequency: "12 min",
    distance: "22 km",
    stops: 15,
  },
  {
    id: 4,
    name: "Route D",
    from: "Jadavpur ",
    to: "Howrah Station",
    frequency: "20 min",
    distance: "30 km",
    stops: 10,
  },
  {
    id: 5,
    name: "Route E",
    from: "Santragachi ",
    to: "New Town Shapoorji",
    frequency: "20 min",
    distance: "30 km",
    stops: 10,
  },
];
