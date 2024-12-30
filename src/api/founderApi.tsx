import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';
import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

export interface Founder {
    id: string | number;
    title: string;
    name: string;
    image: string;
    designation: string;
    description: string;
    data?: any;
}

export const founderApi = createApi({
    reducerPath: 'founderApi',
    baseQuery: async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({
            baseUrl: API_BASE_URL,
            prepareHeaders: (headers) => {
                const token = localStorage.getItem('token');
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                headers.set('Accept', `application/json`);
                return headers;
            },
            credentials: 'include',
        });

        const result = await baseQuery(args, api, extraOptions);

        if (result.error?.status === 401) {
            const dispatch = api.dispatch as AppDispatch;
            dispatch(logout());
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return result;
    },

    tagTypes: ['Founder'],
    endpoints: (builder) => ({
        fetchFounder: builder.query<Founder, string | number>({
            query: (id) => `web/founder/${id}`,
            providesTags: (_, __, id) => [{ type: 'Founder', id }],
        }),

        updateFounder: builder.mutation<Founder, { id: string | number; data: Partial<Founder> }>({
            query: ({ id, data }) => ({
                url: `web/founder/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'Founder', id }],
        }),
    }),
});

export const {
    useFetchFounderQuery,
    useUpdateFounderMutation,
} = founderApi;
