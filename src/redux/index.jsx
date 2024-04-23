import { configureStore } from '@reduxjs/toolkit'
import { authApi } from "./auth/auth"
import { budgetApi } from "./budget/budget"


export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        [budgetApi.reducerPath] : budgetApi.reducer,
    },

    devTools: false,
  middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware, 
            budgetApi.middleware, 
            
            ),

  })