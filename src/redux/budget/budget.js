import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API} from '../api'
const user = JSON.parse(localStorage.getItem("user"));


export const budgetApi = createApi({
    reducerPath: "budgetApi",
    baseQuery: fetchBaseQuery({baseUrl: `${API}`}),
    tagTypes: ['budget'],
    endpoints: (builder) => ({

        getBudgets: builder.query({
            query() {
              return {
                url: "/budget",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              };
            },
            providesTags: (result) =>
              result
                ?
                  [
                    ...result.map(({ id }) => ({ type: "budget", id })),
                    { type: "budget", id: "LIST" },
                  ]
                : 
                  [{ type: "budget", id: "LIST" }],
          }),

          
        createBudget: builder.mutation({
          query({ formData}) {
            return {
              url: '/budget',
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            };
          },

          invalidatesTags: ["budget"],
      }),

    })
})

export const { 
useGetBudgetsQuery,
useCreateBudgetMutation
} = budgetApi;