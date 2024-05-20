import {
    ITask, TaskEdit, TasksAll, TaskSend,
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
        }),

        getOneTask: builder.query<TasksAll, string>({
           query: (id) => ({
               url: `tasks/${id}`,
               method: 'GET',
           })
        }),

        editTask: builder.mutation<void, TaskEdit>({
            query: body => {
                return {
                    url: 'tasks',
                    body: body,
                    method: 'PATCH',
                }
            }
        }),

        deleteTask: builder.mutation<void, string>({
            query: id => {
                return {
                    url: `tasks/${id}`,
                    method: 'DELETE',
                }
            }
        }),

        getAllTasks: builder.query<TasksAll[], void>({
            query: () => ({
                url: 'tasks/all',
                method: 'GET',
            })
        }),

    })
})
export const {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useGetAllTasksQuery,
    useGetOneTaskQuery,
} = individualTasks
