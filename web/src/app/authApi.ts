import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a type for the token response
interface AuthTokens {
    access_token: string;
    refresh_token?: string;
}

// Define a type for the request payloads
interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    stayLoggedIn?: boolean; // Include this if you want to send it
}

interface LoginRequest {
    email: string;
    password: string;
    stayLoggedIn?: boolean;
}

// Create an API slice
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // Your backend base URL
    endpoints: (builder) => ({
        register: builder.mutation<AuthTokens, RegisterRequest>({
            query: (user) => ({
                url: '/auth/register',
                method: 'POST',
                body: user
            })
        }),
        login: builder.mutation<AuthTokens, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        })
    })
});

// Export the hooks for the defined endpoints
export const { useRegisterMutation, useLoginMutation } = authApi;

// Export the reducer to be included in the store
export default authApi;
