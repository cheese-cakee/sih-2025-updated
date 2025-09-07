import {mockBuses} from "./data/mockBuses";

export const getBuses = async () => {
  return mockBuses; // no fetching, just return mock data
};


import {mockRoutes} from "./data/mockRoutes";

export const getRoutes = async () => {
  return mockRoutes;
};