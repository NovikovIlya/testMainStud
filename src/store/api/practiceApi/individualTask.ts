import {
    ITask, ListIdDeleteTasks, TaskEdit, TasksAll, TaskSend,
} from '../../../models/Practice'

import {practiceApi} from './practiceApi'

export const individualTasks = practiceApi.injectEndpoints({
    endpoints: builder => ({
        createTask: builder.mutation<void, TaskSend>({
            query: body => {
                return {
                    url: 'tasks',
                    body: body,
                    method: 'POST'
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]

        }),

        getOneTask: builder.query<TasksAll, string>({
            query: (id) => ({
                url: `tasks/${id}`,
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
                    url: 'tasks',
                    body: body,
                    method: 'PATCH',
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]

        }),

        deleteTask: builder.mutation<void, string>({
            query: id => {
                return {
                    url: `tasks/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),

        deleteSeveralTasks: builder.mutation<void, ListIdDeleteTasks>({
            query: body => {
                return {
                    url: 'tasks/several',
                    body: body,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),

        getAllTasks: builder.query<TasksAll[], void>({
            query: () => ({
                url: 'tasks/all',
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

    })
})
export const {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useGetAllTasksQuery,
    useGetOneTaskQuery,
    useDeleteSeveralTasksMutation,
} = individualTasks
