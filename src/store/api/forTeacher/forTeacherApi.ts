import { dataBrs } from '../../../models/forTeacher'
import { apiSlice } from '../apiSlice'
import { testApiSlice } from '../testApiSlice'


export const fotTeacherService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Расписание
        getScheduleForTeacher: builder.query<any, any>({
            query: ({year,semester}) => {
            return {
                    url: `/to-teacher/schedule?year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherScedule'],
            keepUnusedDataFor:0,
        }),

        // БРС
        getBrsForTeacher: builder.query<dataBrs, any>({
            query: ({subjectId,groupId,year,semester}) => {
            return {
                    url: `/to-teacher/brs/grades?subjectId=${subjectId}&groupId=${groupId}&year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        getBrsSubjects: builder.query<any, any>({
            query: ({year,semester}) => {
            return {
                    url: `/to-teacher/brs/subjects?year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        getBrsGroups: builder.query<any, any>({
            query: ({subjectId,year,semester} ) => {
            return {
                    url: `/to-teacher/brs/groups?subjectId=${subjectId}&year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        saveBrs: builder.mutation<any, any>({
            query: (body ) => {
            return {
                    url: `/to-teacher/brs/grades/save`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['forTeacherSceduleBrs'],
        }),

        // Ведомости
        saveVedomost: builder.mutation<any, any>({
            query: (body ) => {
            return {
                    url: `/to-teacher/vedomost/vedomost/save`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['forTeacherSceduleVedomost'],
        }),

        getVedomostSubjects: builder.query<any, any>({
            query: ({year,semester}) => {
            return {
                    url: `/to-teacher/vedomost/subjects?year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
        getVedomostGroups: builder.query<any, any>({
            query: ({subjectId,year,semester} ) => {
            return {
                    url: `/to-teacher/vedomost/groups?subjectId=${subjectId}&year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
        getVedomostKind: builder.query<any, any>({
            query: ({subjectId,year,semester,groupId} ) => {
            return {
                    url: `/to-teacher/vedomost/type?subjectId=${subjectId}&year=${year}&semester=${semester}&groupId=${groupId}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
        getVedomostForTeacher: builder.query<any, any>({
            query: ({subjectId,groupId,year,semester,type}) => {
            return {
                    url: `/to-teacher/vedomost/vedomost?subjectId=${subjectId}&groupId=${groupId}&year=${year}&semester=${semester}&type=${type}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),


        // Журнал посещения
        getByDate: builder.query<any, any>({
            query: (date) => {
            return {
                    url: `/to-teacher/journal/by-date?date=${date}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherJournalDay'],
            keepUnusedDataFor:0,
        }),
        sendByDate: builder.mutation<any, any>({
            query: (body) => {
            return {
                    url: `to-teacher/journal/by-date/save`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['forTeacherJournalDay'],

        }),

        getDisciplineSemester: builder.query<any, any>({
            query: ({year,semester}) => {
            return {
                    url: `/to-teacher/journal/disciplines?year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherJournalSemester'],
            keepUnusedDataFor:0,
        }),

        getDataSemester: builder.query<any, any>({
            query: ({subjectId,groupId,year,semester,month}) => {
            return {
                    url: `to-teacher/journal/by-semester?subjectId=${subjectId}&groupId=${groupId}&year=${year}&semester=${semester}&month=${month}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherJournalSemester'],
            keepUnusedDataFor:0,
        }),
        sendDataSemester: builder.mutation<any, any>({
            query: (body) => {
            return {
                    url: `to-teacher/journal/by-semester/save`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['forTeacherJournalSemester'],

        }),



        exportExcel: builder.query<any, any>({
            query: ({subjectId,groupId,year,semester,month}) => {
            return {
                    url: `to-teacher/journal/export/excel?subjectId=${subjectId}&groupId=${groupId}&year=${year}&semester=${semester}&month=${month}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'journal.xlsx'; // Имя файла для скачивания
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                      },
                }
            },
          
            keepUnusedDataFor:0,
        }),

        exportExcelEmpty: builder.query<any, any>({
            query: ({subjectId,groupId,year,semester,month}) => {
            return {
                    url: `to-teacher/journal/export/empty?subjectId=${subjectId}&groupId=${groupId}&year=${year}&semester=${semester}&month=${month}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'journal.xlsx'; // Имя файла для скачивания
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                      },
                }
            },
          
            keepUnusedDataFor:0,
        }),
       
    })
})

export const {
    useGetScheduleForTeacherQuery,
    useGetBrsForTeacherQuery,
    useGetBrsGroupsQuery,
    useGetBrsSubjectsQuery,
    useSaveBrsMutation,
    useGetVedomostSubjectsQuery,
    useGetVedomostGroupsQuery,
    useGetVedomostForTeacherQuery,
    useSaveVedomostMutation,
    useGetVedomostKindQuery,
    useGetByDateQuery,
    useGetDisciplineSemesterQuery,
    useGetDataSemesterQuery,
    useSendDataSemesterMutation,
    useLazyExportExcelQuery,
    useSendByDateMutation,
    useLazyExportExcelEmptyQuery
} = fotTeacherService

