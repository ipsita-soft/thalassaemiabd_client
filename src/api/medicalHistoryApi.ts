import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';
export interface Data {
    id: string;
    data: any;
    title?: string;
    status?: number;
    sorting_index?: number;
}

export interface DataListResponse {
    data: Data[];
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

export const medicalHistoryApi = createApi({

    reducerPath: 'medicalHistoryApi',

    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ['MedicalHistory'],

    endpoints: (builder) => ({
        fetchMedicalHistories: builder.query<
            DataListResponse,
            { perPage: number; page: number; search?: string, status?: string }
        >({
            query: ({ perPage, page, search, status }) =>
                `web/medical-history?per_page=${perPage}&page=${page}&status=${status || ''}&search=${search || ''}&status=${status || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'MedicalHistory', id } as const)),
                        { type: 'MedicalHistory', id: 'LIST' },
                    ]
                    : [{ type: 'MedicalHistory', id: 'LIST' }],
        }),
        

        MedicalHistory: builder.query<Data, string>({
            query: (id) => `web/medical-history/${id}`,
            providesTags: (_, __, id) => [{ type: 'MedicalHistory', id }],
        }),



        createMedicalHistory: builder.mutation<Data, Partial<Data>>({
            query: (newMedicalHistory) => {
                const formData = new FormData();
                Object.entries(newMedicalHistory).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                return {
                    url: 'web/medical-history',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'MedicalHistory', id: 'LIST' }],
        }),


        updateMedicalHistory: builder.mutation<Data, { id: string; historyData: Partial<Data> }>({
            query: ({ id, historyData }) => ({
                url: `web/medical-history/${id}`,
                method: 'PUT',
                body: historyData,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'MedicalHistory', id }],
        }),


        // Delete patient
        deleteMedicalHistory: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `web/medical-history/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'MedicalHistory', id }, { type: 'MedicalHistory', id: 'LIST' }],
        }),
    }),
});

// Export hooks
export const {
    useFetchMedicalHistoriesQuery,
    useMedicalHistoryQuery,
    useCreateMedicalHistoryMutation,
    useUpdateMedicalHistoryMutation,
    useDeleteMedicalHistoryMutation,
} = medicalHistoryApi;
