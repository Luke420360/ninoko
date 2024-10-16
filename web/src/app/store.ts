import { configureStore } from '@reduxjs/toolkit';
import authApi from './authApi'; // Adjust the path to your API slice
import authReducer from './authSlice'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware) // Add the API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
