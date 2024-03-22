import { createSlice, current } from "@reduxjs/toolkit";
import { ContactValues, PropertyValues } from "../../types";

export interface PropertyState {
  properties: PropertyValues[];
  propertiesFiltered: PropertyValues[];
  likes: PropertyValues[];
  contacts: ContactValues[];
}

const initialState: PropertyState = {
  likes: [],
  contacts: [],
  properties: [],
  propertiesFiltered: [],
};

export const propertySlice = createSlice({
  name: "property",
  initialState: initialState,
  reducers: {
    likeProperty: (state, action) => {
      if (!state.likes.some((item) => item.Id === action.payload.Id)) {
        state.likes.push(action.payload);
      }
    },
    unlikeProperty: (state, action) => {
      state.likes = state.likes.filter((item) => item.Id !== action.payload);
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    searchProperties: (state, action) => {
      state.propertiesFiltered = [];
      for (const item of state.properties) {
        const property = current(item);
        let hasBeds = false;
        let hasBaths = false;
        let hasParking = false;
        let hasPrice = false;

        const bedsValue = action.payload.beds || 0;
        const bathsValue = action.payload.baths || 0;
        const parkingValue = action.payload.parking || 0;
        const priceValue = action.payload.price || 0;
        if (bedsValue <= property.Bedrooms) {
          hasBeds = true;
        }

        if (bathsValue <= property.Bathrooms) {
          hasBaths = true;
        }

        if (parkingValue <= property.Parking) {
          hasParking = true;
        }

        if (priceValue <= property["Sale Price"]) {
          hasPrice = true;
        }

        if (hasBaths && hasBeds && hasParking && hasPrice) {
          state.propertiesFiltered.push(property);
        }
      }
    },
  },
});

export const {
  likeProperty,
  unlikeProperty,
  addContact,
  searchProperties,
  setProperties,
} = propertySlice.actions;
