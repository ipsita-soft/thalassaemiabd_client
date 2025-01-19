import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';

export interface MedicineItem {
    id:any;
    name?:any;
    outdoor_rate?:any;
    indoor_rate?:any;
    subsidy?:any;
    sorting_index?:any;
    status?: any;
    data?:any;
}

export interface MedicineItemListResponse {
    data: MedicineItem[];
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

export const medicineItemApi = createApi({
    reducerPath: 'medicineItemApi',

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

    tagTypes: ['MedicineItem'],

    endpoints: (builder) => ({
        fetchMedicineItems: builder.query<
            MedicineItemListResponse,
            { perPage: number; page: number; search?: string; status?: string }
        >({
            query: ({ perPage, page, search, status }) =>
                `web/medicine-item?per_page=${perPage}&page=${page}&search=${search || ''}&status=${status || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'MedicineItem', id } as const)),
                        { type: 'MedicineItem', id: 'LIST' },
                    ]
                    : [{ type: 'MedicineItem', id: 'LIST' }],
        }),

        fetchMedicineItem: builder.query<MedicineItem, string>({
            query: (id) => `web/medicine-item/${id}`,
            providesTags: (_, __, id) => [{ type: 'MedicineItem', id }],
        }),

        createMedicineItem: builder.mutation<MedicineItem, Partial<MedicineItem>>({
            query: (newData) => {
                const formData = new FormData();
                Object.entries(newData).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                return {
                    url: 'web/medicine-item',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'MedicineItem', id: 'LIST' }],
        }),

        updateMedicineItem: builder.mutation<MedicineItem, { id: string; itemData: Partial<MedicineItem> }>({
            query: ({ id, itemData }) => ({
                url: `web/medicine-item/${id}`,
                method: 'PUT',
                body: itemData,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'MedicineItem', id }],
        }),

        deleteMedicineItem: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `web/medicine-item/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'MedicineItem', id },
                { type: 'MedicineItem', id: 'LIST' },
            ],
        }),
    }),
});

// Export hooks
export const {
    useFetchMedicineItemsQuery,
    useFetchMedicineItemQuery,
    useCreateMedicineItemMutation,
    useUpdateMedicineItemMutation,
    useDeleteMedicineItemMutation,
} = medicineItemApi;
