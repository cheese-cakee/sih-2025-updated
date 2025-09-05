import type { RouteItem } from "../types/index.ts";
export const mockRoutes: RouteItem[] = [
  {
    id: 1,
    name: "Route A",
    from: "Central Station",
    to: "Airport",
    frequency: "10 min",
  },
  {
    id: 2,
    name: "Route B",
    from: "Mall",
    to: "University",
    frequency: "15 min",
  },
  {
    id: 3,
    name: "Route C",
    from: "Hospital",
    to: "Downtown",
    frequency: "12 min",
  },
];
