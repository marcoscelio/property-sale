import { createApi } from "@reduxjs/toolkit/query/react";

import { propertyEndpoints } from "./propertyEndpoints";
import customFetchBase, { TAG_TYPES } from "./customFetchBase";

export const propertiesApi = createApi({
  reducerPath: "api",
  baseQuery: customFetchBase,
  refetchOnReconnect: true,
  tagTypes: TAG_TYPES,
  endpoints: (builder) => ({
    ...propertyEndpoints(builder),
  }),
});

export const { useGetPropertiesQuery } = propertiesApi;
