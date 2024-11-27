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

export const medicalHistoryItemApi = createApi({

    reducerPath: 'medicalHistoryItemApi',

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

    tagTypes: ['MedicalHistoryItem'],

    endpoints: (builder) => ({
       
        fetchMedicalHistories: builder.query<
            DataListResponse,
            { perPage: number; page: number; search?: string }
        >({
            query: ({ perPage, page, search }) =>
                `web/medical-history-item?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'MedicalHistoryItem', id } as const)),
                        { type: 'MedicalHistoryItem', id: 'LIST' },
                    ]
                    : [{ type: 'MedicalHistoryItem', id: 'LIST' }],
        }),
        

        MedicalHistoryItem: builder.query<Data, string>({
            query: (id) => `web/medical-history-item/${id}`,
            providesTags: (_, __, id) => [{ type: 'MedicalHistoryItem', id }],
        }),



        createMedicalHistoryItem: builder.mutation<Data, Partial<Data>>({
            query: (newData) => {
                const formData = new FormData();
                Object.entries(newData).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                return {
                    url: 'web/medical-history-item',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'MedicalHistoryItem', id: 'LIST' }],
        }),


        updateMedicalHistoryItem: builder.mutation<Data, { id: string; historyData: Partial<Data> }>({
            query: ({ id, historyData }) => ({
                url: `web/medical-history-item/${id}`,
                method: 'PUT',
                body: historyData,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'MedicalHistoryItem', id }],
        }),


        // Delete patient
        deleteMedicalHistoryItem: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `web/medical-history-item/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'MedicalHistoryItem', id }, { type: 'MedicalHistoryItem', id: 'LIST' }],
        }),
    }),
});

// Export hooks
export const {
    useFetchMedicalHistoriesQuery,
    useMedicalHistoryItemQuery,
    useCreateMedicalHistoryItemMutation,
    useUpdateMedicalHistoryItemMutation,
    useDeleteMedicalHistoryItemMutation
} = medicalHistoryItemApi;
