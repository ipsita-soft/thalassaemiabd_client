import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';

export interface Patient {
    id: any;
    data: any;
}

export interface PatientListResponse {
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
    tagTypes: ['Patient'],
    endpoints: (builder) => ({
        fetchPatients: builder.query<
            PatientListResponse,
            { perPage: number; page: number; search?: string }
        >({
            query: ({ perPage, page, search }) =>
                `management/admin-patient?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Patient', id } as const)),
                        { type: 'Patient', id: 'LIST' },
                    ]
                    : [{ type: 'Patient', id: 'LIST' }],
        }),


        // Fetch single patient
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
                    }
                    else if (key === 'profile_image' && value) {
                        formData.append(key, value as File);
                    }
                    else if (typeof value === 'object' && value !== null) {
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
            invalidatesTags: (_,error, { id }) =>
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
    useFetchPatientsQuery,
    useFetchPatientQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
} = patientApi;