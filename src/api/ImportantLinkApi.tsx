import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';
import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

export interface ImportantLink {
    id: any;
    title?: any;
    image?: any;
    url?: any;
    description?: any;
    status?: any;
    sorting_index?: any;
    data?: any;
}

export interface ImportantLinkResponse {
    data: ImportantLink[];
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

export const importantlinkApi = createApi({
    reducerPath: 'importantlinkApi',
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
    tagTypes: ['ImportantLink'],
    endpoints: (builder) => ({
        fetchImportantLinks: builder.query<
            ImportantLinkResponse,
            { perPage: number; page: number; search?: string }
        >({
            query: ({ perPage, page, search }) =>
                `web/important-link?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'ImportantLink' as const, id })),
                          { type: 'ImportantLink', id: 'LIST' },
                      ]
                    : [{ type: 'ImportantLink', id: 'LIST' }],
        }),

        fetchImportantLink: builder.query<ImportantLink, string>({
            query: (id) => `web/important-link/${id}`,
            providesTags: (_, __, id) => [{ type: 'ImportantLink', id }],
        }),

        createImportantLink: builder.mutation<ImportantLink, Partial<ImportantLink>>({
            query: (newLink) => {
                const formData = new FormData();
                Object.entries(newLink).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formData.append(key, value as string | Blob);
                    }
                });

                return {
                    url: 'web/important-link',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'ImportantLink', id: 'LIST' }],
        }),

        updateImportantLink: builder.mutation<ImportantLink, { id: string; data: Partial<ImportantLink> }>({
            query: ({ id, data }) => ({
                url: `web/important-link/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'ImportantLink', id }],
        }),

        deleteImportantLink: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `web/important-links/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'ImportantLink', id }, { type: 'ImportantLink', id: 'LIST' }],
        }),
    }),
});

export const {
    useFetchImportantLinksQuery,
    useFetchImportantLinkQuery,
    useCreateImportantLinkMutation,
    useUpdateImportantLinkMutation,
    useDeleteImportantLinkMutation,
} = importantlinkApi;
