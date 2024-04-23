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

        getAppUsers: builder.query({
            query() {
              return {
                url: "/users/app-users",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              };
            },
            providesTags: (result) =>
              // is result available?
              result
                ? // successful query
                  [
                    ...result.map(({ id }) => ({ type: "AppUsers", id })),
                    { type: "AppUsers", id: "LIST" },
                  ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                  [{ type: "AppUsers", id: "LIST" }],
          }),

        getUsersBySuperAgent: builder.query({
            query() {
              return {
                url: "/users",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              };
            },
            providesTags: (result) =>
              // is result available?
              result
                ? // successful query
                  [
                    ...result.map(({ id }) => ({ type: "users", id })),
                    { type: "users", id: "LIST" },
                  ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                  [{ type: "users", id: "LIST" }],
          }),

        getUsersByAdmin: builder.query({
            query() {
              return {
                url: "/users/admin",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              };
            },
            providesTags: (result) =>
              // is result available?
              result
                ? // successful query
                  [
                    ...result.map(({ id }) => ({ type: "users", id })),
                    { type: "users", id: "LIST" },
                  ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                  [{ type: "users", id: "LIST" }],
          }),

          getAgentUsers: builder.query({
            query() {
              return {
                url: "/users/app-users/agent",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              };
            },
            providesTags: (result) =>
              // is result available?
              result
                ? // successful query
                  [
                    ...result.map(({ id }) => ({ type: "AppUsers", id })),
                    { type: "AppUsers", id: "LIST" },
                  ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                  [{ type: "AppUsers", id: "LIST" }],
          }),

        changeStaus: builder.mutation({
            query: ({formData, id}) =>{ 
                return {
                url: `/users/app-user/change-status/${id}`,
                method: "PUT",
                body:formData,
                }
            },
            invalidatesTags: ["AppUsers"],
        }),

        changeAgnetStaus: builder.mutation({
            query: ({formData, id}) =>{ 
                return {
                url: `/users/app-user/agent/change-status/${id}`,
                method: "PUT",
                body:formData,
                }
            },
            invalidatesTags: ["AppUsers"],
        }),

        changeSuperAgnetStaus: builder.mutation({
            query: ({formData, id}) =>{ 
                return {
                url: `/users/app-user/super-agent/change-status/${id}`,
                method: "PUT",
                body:formData,
                }
            },
            invalidatesTags: ["users"],
        }),

        getAppUserById: builder.query({
            query: (id) => {
                return {
                url: `/users/app-user/user/${id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                }
            },
            providesTags: ['users'],
        }),

        getUserById: builder.query({
            query: (id) => {
                return {
                url: `/users/user/${id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                }
            },
            providesTags: ['users'],
        }),

        updateAppUser: builder.mutation({
          query({ formData, id }) {
            return {
              url: `/users/app-user/update/${id}`,
              method: "PUT",
              body: formData,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            };
          },

          invalidatesTags: ["AppUsers"],
        }),

        updateUser: builder.mutation({
          query({ formData, id }) {
            return {
              url: `/users/user/${id}`,
              method: "PUT",
              body: formData,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            };
          },

          invalidatesTags: ["users"],
        }),

      updateAppUserPassword: builder.mutation({
          query({ formData, id }) {
            return {
              url: `/users/app-user/change-password/${id}`,
              method: "PUT",
              body: formData,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            };
          },

          invalidatesTags: ["AppUsers"],
        }),

        updateUserPassword: builder.mutation({
          query({ formData, id }) {
            return {
              url: `/users/user/change-password/${id}`,
              method: "PUT",
              body: formData,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            };
          },

          invalidatesTags: ["users"],
        }),

        


    })
})


export const { 
    useLoginMutation,
    useRegisterMutation,

    useGetUserByIdQuery,
    useGetAppUserByIdQuery,
    useGetAppUsersQuery,
    useChangeStausMutation,
    useUpdateAppUserMutation,
    useUpdateAppUserPasswordMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation,
    useGetAgentUsersQuery,
    useChangeAgnetStausMutation,
    useGetUsersBySuperAgentQuery,
    useChangeSuperAgnetStausMutation,

    useGetUsersByAdminQuery
    
} = authApi;