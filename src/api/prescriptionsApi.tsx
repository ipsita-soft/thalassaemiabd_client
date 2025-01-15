import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';
import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

export interface PrescriptionsApi {
    data?: any;
    id?: any;
}

export interface PrescriptionsResponse {
    data: PrescriptionsApi[];
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

export const prescriptionsApi = createApi({
    reducerPath: 'prescriptionsApi',
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
    tagTypes: ['PrescriptionsApi'],
    endpoints: (builder) => ({
        fetchPrescribedMedicinesApis: builder.query<
            PrescriptionsResponse,
            { patient_id: string; perPage: number; page: number; search?: string }
        >({
            query: ({ patient_id, perPage, page, search }) =>
                `management/prescribed-medicines?patient_id=${patient_id}&per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'PrescriptionsApi' as const, id })),
                        { type: 'PrescriptionsApi', id: 'LIST' },
                    ]
                    : [{ type: 'PrescriptionsApi', id: 'LIST' }],
        }),


        fetchPrescriptionsApis: builder.query<
            PrescriptionsResponse,
            { perPage: number; page: number; search?: string }
        >({
            query: ({ perPage, page, search }) =>
                `management/prescriptions?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'PrescriptionsApi' as const, id })),
                        { type: 'PrescriptionsApi', id: 'LIST' },
                    ]
                    : [{ type: 'PrescriptionsApi', id: 'LIST' }],
        }),





        fetchPrescriptionApi: builder.query<PrescriptionsApi, string>({
            query: (id) => `management/prescriptions/${id}`,
            providesTags: (_, __, id) => [{ type: 'PrescriptionsApi', id }],
        }),

        createPrescriptionsApi: builder.mutation<PrescriptionsApi, Partial<PrescriptionsApi>>({
            query: (newLink) => {
                const formData = new FormData();

                Object.entries(newLink).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        // Handle arrays and objects
                        if (Array.isArray(value) || typeof value === 'object') {
                            formData.append(key, JSON.stringify(value)); // Convert to JSON string
                        } else {
                            formData.append(key, value as string | Blob); // Append as string or Blob
                        }
                    }
                });

                return {
                    url: 'management/prescriptions',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'PrescriptionsApi', id: 'LIST' }],
        }),

        updatePrescriptionsApi: builder.mutation<PrescriptionsApi, { id: any; data: FormData }>({
            query: ({ id, data }) => ({
                url: `management/prescriptions/${id}`,
                method: 'POST',
                body: data,
            }),

            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'PrescriptionsApi', id }],
        }),

        deletePrescriptionsApi: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `management/prescriptionss/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'PrescriptionsApi', id }, { type: 'PrescriptionsApi', id: 'LIST' }],
        }),
    }),
});

export const {
    useFetchPrescribedMedicinesApisQuery,
    useFetchPrescriptionsApisQuery,
    useFetchPrescriptionApiQuery,
    useCreatePrescriptionsApiMutation,
    useUpdatePrescriptionsApiMutation,
    useDeletePrescriptionsApiMutation,
} = prescriptionsApi;
