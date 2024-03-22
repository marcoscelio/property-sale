export interface PropertyValues {
  Id: number;
  DateListed: string;
  Title: string;
  Description: string;
  SalePrice: number;
  "Sale Price": number;
  ThumbnailURL: string;
  PictureURL: string;
  Location: string;
  Sqft: number;
  Bedrooms: number;
  Bathrooms: number;
  Parking: number;
  YearBuilt: number;
}

export interface PropertyValues {
  Id: number;
  DateListed: string;
  Title: string;
  Description: string;
  "Sale Price": number;
  ThumbnailURL: string;
  PictureURL: string;
  Location: string;
  Sqft: number;
  Bedrooms: number;
  Bathrooms: number;
  Parking: number;
  YearBuilt: number;
}

export type ContactValues = {
  propertyId: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  comments: string;
};
