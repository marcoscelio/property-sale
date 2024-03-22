import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

export const TAG_TYPES = ["Property"] as const;

export type TagTypes = (typeof TAG_TYPES)[number];

export type ApiBuilder = EndpointBuilder<
  typeof customFetchBase,
  TagTypes,
  "api"
>;

const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    return await baseQuery(args, api, extraOptions);
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
};

export default customFetchBase;
