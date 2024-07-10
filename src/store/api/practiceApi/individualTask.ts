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

        getPracticeType: builder.query<PracticeType[], void>({
            query: () => ({
                url: 'services/api-practices/kpfu/practice-types',
                method: 'GET',
            })
        }),
        getPracticeKind: builder.query<PracticeType[], any>({
            query: (subDivisionId) => ({
                url: `services/api-practices/kpfu/practice-kinds?subdivisionId=${subDivisionId}`,
                method: 'GET',
            })
        }),
        getDepartments: builder.query<NewDepartment[], void>({
            query: () => ({
                url: 'services/api-practices/kpfu/subdivisions',
                method: 'GET',
            })
        }),
        getTasksForPractice: builder.query<TasksAll, TwoId>({
            query: (arg) => ({
                url: `services/api-practices/tasks/for-practice?sp_name_id=${arg.sp_name_id}&practice_type_id=${arg.practice_type_id}`,
                method: 'GET',
            })
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
    useLazyGetTasksForPracticeQuery,
    useGetPracticeKindQuery
} = individualTasks
