import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';
import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

export interface Patient {
    bts_id: any;
    name: any;
    id: any;
    data: any;
}

export interface PatientListResponse {
    map(arg0: (report: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    data: Patient[];

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

// RTK Query configuration
export const patientApi = createApi({
    reducerPath: 'patientApi',
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

        // Check for unauthorized response
        if (result.error?.status === 401) {
            const dispatch = api.dispatch as AppDispatch;
            dispatch(logout());
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login
        }

        return result;
    },
    tagTypes: ['Patient'], // Ensure the tag type matches your use case
    endpoints: (builder) => ({


        FetchPatientsReports: builder.query<
            PatientListResponse,
            { perPage: number;  page: number; search?: string; blood_group_id?: string; gender_id?: string; disease_type_id?: string }
        >({
            query: ({ perPage, page, search, blood_group_id, gender_id, disease_type_id }) => {
                const params = new URLSearchParams({
                    per_page: perPage?.toString() || '',
                    page: page?.toString() || '',
                    search: search || '',
                    blood_group_id: blood_group_id || '',
                    gender_id: gender_id || '',
                    disease_type_id: disease_type_id || '',
                }).toString();

                return `management/patients-report?${params}`;
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Patient' as const, id })),
                        { type: 'Patient', id: 'LIST' },
                    ]
                    : [{ type: 'Patient', id: 'LIST' }],
        }),



        fetchPatients: builder.query<PatientListResponse, { perPage: number; page: number; search?: string }>({
            query: ({ perPage, page, search }) =>
                `management/admin-patient?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Patient' as const, id })), // Ensure correct type inference with 'as const'
                        { type: 'Patient', id: 'LIST' },
                    ]
                    : [{ type: 'Patient', id: 'LIST' }],
        }),


        fetchPatient: builder.query<Patient, string>({
            query: (id) => `management/admin-patient/${id}`,
            providesTags: (_, __, id) => [{ type: 'Patient', id }],
        }),

        createPatient: builder.mutation<Patient, Partial<Patient>>({
            query: (newPatient) => {
                const formData = new FormData();

                Object.entries(newPatient).forEach(([key, value]) => {
                    if (key === 'electrophoresis_report' && value) {
                        formData.append(key, value as File);
                    } else if (key === 'profile_image' && value) {
                        formData.append(key, value as File);
                    } else if (typeof value === 'object' && value !== null) {
                        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                            if (nestedValue !== undefined && nestedValue !== null) {
                                formData.append(`${key}[${nestedKey}]`, nestedValue as string);
                            }
                        });
                    } else if (value !== undefined && value !== null) {
                        formData.append(key, value as string);
                    }
                });

                return {
                    url: 'management/admin-patient',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'Patient', id: 'LIST' }],
        }),

        updatePatient: builder.mutation<Patient, { id: number; patientData: Partial<Patient> }>({
            query: ({ id, patientData }) => ({
                url: `management/admin-patient/${id}`,
                method: 'PUT',
                body: patientData,
            }),
            invalidatesTags: (_, error, { id }) =>
                error ? [] : [{ type: 'Patient', id }],
        }),

        deletePatient: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `management/admin-patient/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'Patient', id }, { type: 'Patient', id: 'LIST' }],
        }),
    }),
});

export const {
    useFetchPatientsReportsQuery,
    useFetchPatientsQuery,
    useFetchPatientQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
} = patientApi;
