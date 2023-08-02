
import authReducer, { reload } from '../auth'
import userReducer from "../user"
import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../post'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        post:postReducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/RegisterApp/fulfilled', 'auth/LoginApp/fulfilled'],
        ignoredActionPaths: ['payload.timestamp'],
        ignoredPaths: ['users', 'userInfo'],
      },
    }),
})

export type RootState=ReturnType<typeof store.getState>
store.dispatch(reload())
