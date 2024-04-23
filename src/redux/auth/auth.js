import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API} from '../api'
const user = JSON.parse(localStorage.getItem("user"));


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: `${API}`}),
    tagTypes: ['users', 'AppUsers'],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (body) =>{ 
                return {
                url: "/users/login",
                method: "POST",
                body,
                contentType: "application/json"
                }
            }
        }),

        register: builder.mutation({
            query: (body) =>{ 
                return {
                url: "/users/register",
                method: "POST",
                body,
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
                contentType: "application/json"
                }
            },
            invalidatesTags: ["users"],
        }),



    })
})


export const { 
    useLoginMutation,
    useRegisterMutation,
    
} = authApi;
