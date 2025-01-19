import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';

export interface LabTestServiceItem {
    id: any;
    name?: any;
    outdoor_rate?: any;
    indoor_rate?: any;
    subsidy?: any;
    kit_cost_id?: any;
    sorting_index?: any;
    status?: any;
    data?: any;
}

export interface LabTestServiceItemResponse {
    data: LabTestServiceItem[];
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

export const labTestServiceItemApi = createApi({
    reducerPath: 'labTestServiceItemApi',

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

    tagTypes: ['LabTestServiceItem'],

    endpoints: (builder) => ({
        fetchLabTestServiceItems: builder.query<
            LabTestServiceItemResponse,
            { perPage: number; page: number; search?: string; status?: string }
        >({
            query: ({ perPage, page, search, status }) =>
                `web/lab-test-service-item?per_page=${perPage}&page=${page}&search=${search || ''}&status=${status || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'LabTestServiceItem', id } as const)),
                        { type: 'LabTestServiceItem', id: 'LIST' },
                    ]
                    : [{ type: 'LabTestServiceItem', id: 'LIST' }],
        }),

        fetchLabTestServiceItem: builder.query<LabTestServiceItem, string>({
            query: (id) => `web/lab-test-service-item/${id}`,
            providesTags: (_, __, id) => [{ type: 'LabTestServiceItem', id }],
        }),

        createLabTestServiceItem: builder.mutation<LabTestServiceItem, Partial<LabTestServiceItem>>({
            query: (newData) => {
                const formData = new FormData();
                Object.entries(newData).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                return {
                    url: 'web/lab-test-service-item',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'LabTestServiceItem', id: 'LIST' }],
        }),

        updateLabTestServiceItem: builder.mutation<LabTestServiceItem, { id: string; itemData: Partial<LabTestServiceItem> }>({
            query: ({ id, itemData }) => ({
                url: `web/lab-test-service-item/${id}`,
                method: 'PUT',
                body: itemData,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'LabTestServiceItem', id }],
        }),

        deleteLabTestServiceItem: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `web/lab-test-service-item/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'LabTestServiceItem', id },
                { type: 'LabTestServiceItem', id: 'LIST' },
            ],
        }),
    }),
});

// Export hooks
export const {
    useFetchLabTestServiceItemsQuery,
    useFetchLabTestServiceItemQuery,
    useCreateLabTestServiceItemMutation,
    useUpdateLabTestServiceItemMutation,
    useDeleteLabTestServiceItemMutation,
} = labTestServiceItemApi;
