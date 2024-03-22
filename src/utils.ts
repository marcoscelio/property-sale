import { PropertyValues } from "./types";

export const currencyUtils = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getMaxBedRooms = (items: PropertyValues[]) => {
  return items.reduce((p, v) => {
    return p.Bedrooms > v.Bedrooms ? p : v;
  });
};

export const getMaxBathRooms = (items: PropertyValues[]) => {
  return items.reduce((p, v) => {
    return p.Bathrooms > v.Bathrooms ? p : v;
  });
};

export const getMaxParking = (items: PropertyValues[]) => {
  return items.reduce((p, v) => {
    return p.Parking > v.Parking ? p : v;
  });
};

export const getMaxPrice = (items: PropertyValues[]) => {
  return items.reduce((p, v) => {
    return p["Sale Price"] > v["Sale Price"] ? p : v;
  });
};
