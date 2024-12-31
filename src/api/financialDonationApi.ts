import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';
import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';


export interface FinancialData {
    id:any;
    title?:any;
    image?:any;
    description?:any;
    status?: any;
    sorting_index?:any;
    data?:any;
}

export interface FinancialDataResponse {
    data: FinancialData[];
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


export const financialDonationApi = createApi({
    reducerPath: 'financialDonationApi',
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
    tagTypes: ['FinancialDonation'],
    endpoints: (builder) => ({
        fetchFinancialDonations: builder.query<
            FinancialDataResponse,
            { perPage: number; page: number; search?: string }
        >({
            query: ({ perPage, page, search }) =>
                `web/financial-donation?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'FinancialDonation' as const, id })),
                          { type: 'FinancialDonation', id: 'LIST' },
                      ]
                    : [{ type: 'FinancialDonation', id: 'LIST' }],
        }),

        fetchFinancialDonation: builder.query<FinancialData, string>({
            query: (id) => `web/financial-donation/${id}`,
            providesTags: (_, __, id) => [{ type: 'FinancialDonation', id }],
        }),

        createFinancialDonation: builder.mutation<FinancialData, Partial<FinancialData>>({
            query: (newDonation) => {
                const formData = new FormData();
                Object.entries(newDonation).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formData.append(key, value as string | Blob);
                    }
                });

                return {
                    url: 'web/financial-donation',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'FinancialDonation', id: 'LIST' }],
        }),

        updateFinancialDonation: builder.mutation<FinancialData, { id: string; data: Partial<FinancialData> }>({
            query: ({ id, data }) => ({
                url: `web/financial-donation/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'FinancialDonation', id }],
        }),

        deleteFinancialDonation: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `web/financial-donation/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'FinancialDonation', id }, { type: 'FinancialDonation', id: 'LIST' }],
        }),
    }),
});

export const {
    useFetchFinancialDonationsQuery,
    useFetchFinancialDonationQuery,
    useCreateFinancialDonationMutation,
    useUpdateFinancialDonationMutation,
    useDeleteFinancialDonationMutation,
} = financialDonationApi;
