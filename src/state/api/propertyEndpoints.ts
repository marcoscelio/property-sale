import { PropertyValues } from "../../types";
import { ApiBuilder } from "./customFetchBase";

export const propertyEndpoints = (builder: ApiBuilder) => ({
  getProperties: builder.query<PropertyValues[], void>({
    query: () => ({
      url: ``,
      method: "GET",
      credentials: "omit",
    }),
    providesTags: ["Property"],
  }),
});
