import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';
import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

export interface WhatIsThalassemia {
    id: string | number;
    title: string;
    video: string;
    description: string;
    data?: any;
}

export interface WhatIsThalassemiaResponse {
    data: WhatIsThalassemia[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export const whatisthalassemiaApi = createApi({
    reducerPath: 'whatisthalassemiaApi',
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
    
    tagTypes: ['WhatIsThalassemia'],
    endpoints: (builder) => ({
        fetchWhatIsThalassemia: builder.query<WhatIsThalassemia, string | number>({
            query: (id) => `web/about-thalassemia/${id}`,
            providesTags: (_, __, id) => [{ type: 'WhatIsThalassemia', id }],
        }),

        updateWhatIsThalassemia: builder.mutation<WhatIsThalassemia, { id: string | number; data: Partial<WhatIsThalassemia> }>({
            query: ({ id, data }) => ({
                url: `web/about-thalassemia/${id}`,
                method: 'PUT',
                body: data,
            }),

            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'WhatIsThalassemia', id }, { type: 'WhatIsThalassemia', id: 'LIST' }],
        }),
    }),
});

export const {
    useFetchWhatIsThalassemiaQuery,
    useUpdateWhatIsThalassemiaMutation,
} = whatisthalassemiaApi;
