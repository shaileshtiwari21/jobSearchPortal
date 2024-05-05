import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobSearchApi = createApi({
  reducerPath: "job-search",
  tagTypes: ["college"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.weekday.technology",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobDetails: builder.query({
      query: ({ ...rest }) => ({
        url: "/adhoc/getSampleJdJSON",
        method: "POST",
        body: rest,
      }),
    }),
  }),
});

export const { useGetJobDetailsQuery } = jobSearchApi;
