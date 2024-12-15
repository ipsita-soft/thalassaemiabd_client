import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/apiConfig';

export interface PatientMedicalHistory {
    id: string;
    name: string;
    value: string;
}

export interface PatientMedicalHistoryResponse {
    data: PatientMedicalHistory[];
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

export const patientMedicalHistoryApi = createApi({
    reducerPath: 'patientMedicalHistoryApi',

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

    tagTypes: ['PatientMedicalHistory'],

    endpoints: (builder) => ({
        // Fetch all patient medical histories
        fetchPatientMedicalHistories: builder.query<
            PatientMedicalHistoryResponse,
            { perPage: number; page: number; search?: string }
        >({
            query: ({ perPage, page, search }) =>
                `management/patient-medical-history?per_page=${perPage}&page=${page}&search=${search || ''}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'PatientMedicalHistory',
                              id,
                          } as const)),
                          { type: 'PatientMedicalHistory', id: 'LIST' },
                      ]
                    : [{ type: 'PatientMedicalHistory', id: 'LIST' }],
        }),

        // Fetch a single patient medical history
        fetchPatientMedicalHistory: builder.query<PatientMedicalHistory, string>({
            query: (id) => `management/patient-medical-history/${id}`,
            providesTags: (_, __, id) => [{ type: 'PatientMedicalHistory', id }],
        }),

        // Create a new patient medical history
        createPatientMedicalHistory: builder.mutation<PatientMedicalHistory, Partial<PatientMedicalHistory>>({
            query: (newData) => ({
                url: 'management/patient-medical-history',
                method: 'POST',
                body: newData,
            }),
            invalidatesTags: [{ type: 'PatientMedicalHistory', id: 'LIST' }],
        }),

        // Update a patient medical history
        updatePatientMedicalHistory: builder.mutation<
            PatientMedicalHistory,
            { id: string; historyData: Partial<PatientMedicalHistory> }
        >({
            query: ({ id, historyData }) => ({
                url: `management/patient-medical-history/${id}`,
                method: 'PUT',
                body: historyData,
            }),
            invalidatesTags: (_, error, { id }) => (error ? [] : [{ type: 'PatientMedicalHistory', id }]),
        }),

        // Delete a patient medical history
        deletePatientMedicalHistory: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `management/patient-medical-history/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'PatientMedicalHistory', id },
                { type: 'PatientMedicalHistory', id: 'LIST' },
            ],
        }),
    }),
});

// Export hooks
export const {
    useFetchPatientMedicalHistoriesQuery,
    useFetchPatientMedicalHistoryQuery,
    useCreatePatientMedicalHistoryMutation,
    useUpdatePatientMedicalHistoryMutation,
    useDeletePatientMedicalHistoryMutation,
} = patientMedicalHistoryApi;
