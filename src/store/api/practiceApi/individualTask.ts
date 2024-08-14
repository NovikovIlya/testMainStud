import {
    Department,
    ITask, ListIdDeleteTasks, NewDepartment, PracticeType, TaskEdit, TasksAll, TaskSend, TwoId,
} from '../../../models/Practice'

import {practiceApi} from './practiceApi'
import {apiSlice} from "../apiSlice";

export const individualTasks = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createTask: builder.mutation<void, TaskSend>({
            query: body => {
                return {
                    url: 'services/api-practices/tasks',
                    body: body,
                    method: 'POST'
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]

        }),

        getOneTask: builder.query<TasksAll, string>({
            query: (id) => ({
                url: `services/api-practices/tasks/${id}`,
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.tasks.map(({id}) => ({type: 'Tasks' as const, id})),
                    {type: 'Tasks', id: 'LIST'},
                ]
                :
                [{type: 'Tasks', id: 'LIST'}],
        }),

        editTask: builder.mutation<void, TaskEdit>({
            query: body => {
                return {
                    url: 'services/api-practices/tasks',
                    body: body,
                    method: 'PATCH',
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]

        }),

        deleteTask: builder.mutation<void, string>({
            query: id => {
                return {
                    url: `services/api-practices/tasks/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),

        deleteSeveralTasks: builder.mutation<void, ListIdDeleteTasks>({
            query: body => {
                return {
                    url: 'services/api-practices/tasks/several',
                    body: body,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),

        getAllTasks: builder.query<TasksAll[], void>({
            query: () => ({
                url: 'services/api-practices/tasks/all',
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({id}) => ({type: 'Tasks' as const, id})),
                    {type: 'Tasks', id: 'LIST'},
                ]
                :
                [{type: 'Tasks', id: 'LIST'}],
        }),

        getPracticeType: builder.query<PracticeType[], any>({
            query: (subDivision) => ({
                url: `services/api-practices/kpfu/practice-types${subDivision ? "?subdivisionId=" + subDivision : ''}`,
                method: 'GET',
            })
        }),
        getPracticeTypeForPractice: builder.query<any, any>({
            query: ({subdivisionId,specialtyNameId }) => ({
                url:`services/api-practices/tasks/practice-types?subdivisionId=${subdivisionId}&specialtyNameId=${specialtyNameId }`,
                method: 'GET',
            })
        }),
        getPracticeKind: builder.query<PracticeType[], any>({
            query: (subDivisionId) => ({
                url: `services/api-practices/kpfu/practice-kinds${subDivisionId ? "?subdivisionId=" + subDivisionId : ''}`,
                method: 'GET',
            })
        }),
        getDepartments: builder.query<NewDepartment[], void>({
            query: () => ({
                url: 'services/api-practices/kpfu/subdivisions',
                method: 'GET',
            })
        }),
        getSubdivisionForPractice: builder.query<any, void>({
            query: () => ({
                url: `services/api-practices/tasks/subdivisions`,
                method: 'GET',
            }),
            keepUnusedDataFor: 1,
        }),
        getGroupNumbers: builder.query<PracticeType[], any>({
            query: (subDivisionId) => ({
                url: `services/api-practices/kpfu/group-numbers?subdivisionId=${subDivisionId}`,
                method: 'GET',
            })
        }),
        getDepartmentDirectors: builder.query<PracticeType[], any>({
            query: (subDivisionId) => ({
                url: `services/api-practices/kpfu/department-directors?subdivisionId=${subDivisionId}`,
                method: 'GET',
            })
        }),
        getCompentences: builder.query<PracticeType[], any>({
            query: ({specialityId,practiceKindId,startYear}) => ({
                url: `services/api-practices/kpfu/competences?specialityId=${specialityId}&practiceKindId=${practiceKindId}&startYear=${startYear}`,
                method: 'GET',
            }),
            keepUnusedDataFor:1,
        }),
        getTasksForPractice: builder.query<any, any>({
            query: ({specialtyNameId,practiceTypeId}) => ({
                url: `services/api-practices/tasks/for-practice?specialtyNameId=${specialtyNameId}&practiceTypeId=${practiceTypeId}`,
                method: 'GET',
            })
        }),
        getPracticesAll: builder.query<any, any>({
            query: () => ({
                url: `services/api-practices/practices/all`,
                method: 'GET',
            }),
            providesTags: ['Practice']
        }),
        getPracticeOne: builder.query<any, any>({
            query: (id) => ({
                url: `services/api-practices/practices/${id}`,
                method: 'GET',
                
            }),
            keepUnusedDataFor: 1,

        }),
        updatePracticeOne: builder.mutation<any, any>({
            query: (obj) => ({
                url: `services/api-practices/practices`,
                method: 'PATCH',
                body: obj
                
            }),
            invalidatesTags:['Practice'],
            
        }),
        postPractices: builder.mutation<any, any>({
            query: (obj) => ({
                url: `services/api-practices/practices`,
                method: 'POST',
                body: obj
            }),
            invalidatesTags:['Practice']
        })

    })
})
export const {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useGetAllTasksQuery,
    useGetOneTaskQuery,
    useDeleteSeveralTasksMutation,
    useGetPracticeTypeQuery,
    useGetDepartmentsQuery,
    useGetTasksForPracticeQuery,
    useGetPracticeKindQuery,
    useGetGroupNumbersQuery,
    useGetDepartmentDirectorsQuery,
    useGetCompentencesQuery,
    useGetPracticesAllQuery,
    usePostPracticesMutation,
    useGetPracticeOneQuery,
    useUpdatePracticeOneMutation,
    useGetPracticeTypeForPracticeQuery,
    useGetSubdivisionForPracticeQuery
} = individualTasks
