import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';

// Interfaces for the data and response structure
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

// Define the appointments API using RTK Query
export const appointmentsApi = createApi({
    reducerPath: 'appointmentsApi', // Unique key for the API slice

    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL, // Base URL for the API
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token'); // Fetch token from localStorage
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // Attach token to Authorization header
            }
            return headers;
        },
    }),

    tagTypes: ['AppointmentsItem'], // Tags for cache invalidation

    endpoints: (builder) => ({
        // Fetch a list of appointments
        fetchAppointments: builder.query<DataListResponse, { perPage: number; page: number; search?: string }>({
            query: ({ perPage, page, search }) =>
                `management/appointments?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'AppointmentsItem', id } as const)),
                        { type: 'AppointmentsItem', id: 'LIST' },
                    ]
                    : [{ type: 'AppointmentsItem', id: 'LIST' }],
                    
        }),

        // Fetch a single appointment by ID
        AppointmentsItem: builder.query<Data, string>({
            query: (id) => `management/appointments/${id}`,
            providesTags: (_, __, id) => [{ type: 'AppointmentsItem', id }],
        }),

        // Create a new appointment
        createAppointmentsItem: builder.mutation<Data, Partial<Data>>({
            query: (newData) => {
                const formData = new FormData();
                Object.entries(newData).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                return {
                    url: 'management/appointments',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'AppointmentsItem', id: 'LIST' }],
        }),

        // Update an appointment by ID
        updateAppointmentsItem: builder.mutation<Data, { id: string; historyData: Partial<Data> }>({
            query: ({ id, historyData }) => ({
                url: `management/appointments/${id}`,
                method: 'PUT',
                body: historyData,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'AppointmentsItem', id }],
        }),

        // Delete an appointment by ID
        deleteAppointmentsItem: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `management/appointments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'AppointmentsItem', id }, { type: 'AppointmentsItem', id: 'LIST' }],
        }),

        // Fetch users with a specific role
        fetchUsersWithRole: builder.query<DataListResponse, { roleId: number; perPage?: number; page?: number; all?:string }>({
            query: ({ roleId, perPage = 250, page = 1, all }) =>
                `web/user-with-role/?role_id=${roleId}&per_page=${perPage}&page=${page}&all=${all}`,
        }),
    }),
});

// Export hooks for the endpoints
export const {
    useFetchAppointmentsQuery,
    useAppointmentsItemQuery,
    useCreateAppointmentsItemMutation,
    useUpdateAppointmentsItemMutation,
    useDeleteAppointmentsItemMutation,
    useFetchUsersWithRoleQuery,
} = appointmentsApi;
