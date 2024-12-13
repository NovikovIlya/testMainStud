import { apiSlice } from '../apiSlice'
import { testApiSlice } from '../testApiSlice'


export const messagesService = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getEmployeesMessage: builder.query<any, any>({
            query: (name) => {
                return {
                    url: `/user-api/chat/employees?name=${name}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),
        getStudentsMessaage: builder.query<any, any>({
            query: (name) => {
                return {
                    url: `/user-api/chat/students?name=${name}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),
        getUsersMessages: builder.query<any, any>({
            query: (name) => {
                return {
                    url: `/user-api/chat/users?name=${name}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),
        getAllDialogs: builder.query<any, any>({
            query: ({page,size}) => {
                return {
                    url: `/user-api/chat?page=${page}&size=${size}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),
        getAllDialogsOld: builder.query<any, any>({
            query: ({page,size}) => {
                return {
                    url: `/user-api/chat?page=${page}&size=${size}`,
                    method: 'GET'
                }
            },
            // providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),
        sendMessageChat: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/user-api/chat/send`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['Messages'],
        }),
        getOneChat: builder.query<any, any>({
            query: ({id,page,size}) => {
                return {
                    url: `/user-api/chat/${id}?page=${page}&size=${size}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),
        getOneChatOld: builder.query<any, any>({
            query: ({id,page,size}) => {
                return {
                    url: `/user-api/chat/${id}?page=${page}&size=${size}`,
                    method: 'GET'
                }
            },
            // providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),
        addNewChat: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/user-api/chat/new`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['Messages'], 
        }),
        readMessage: builder.mutation<any, any>({
            query: (id) => {
                return {
                    url: `/user-api/chat/read?chatId=${id}`,
                    method: 'PATCH',
                    
                }
            },
            invalidatesTags: ['Messages'],  
        }),
        getAllUnRead: builder.query<any, any>({
            query: () => {
                return {
                    url: `/user-api/chat/unread`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
        }),
        searchUser: builder.query<any, any>({
            query: ({name,page,size}) => {
                return {
                    url: `/user-api/chat/search?name=${name}&page=${page}&size=${size}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
        }),
        searchUserOld: builder.query<any, any>({
            query: ({name,page,size}) => {
                return {
                    url: `/user-api/chat/search?name=${name}&page=${page}&size=${size}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
        }),
        
        
    })
})

export const {
    useGetEmployeesMessageQuery,
    useGetStudentsMessaageQuery,
    useGetAllDialogsQuery,
    useSendMessageChatMutation,
    useGetOneChatQuery,
    useAddNewChatMutation,
    useGetOneChatOldQuery,
    useGetAllDialogsOldQuery,
    useReadMessageMutation,
    useGetAllUnReadQuery,
    useSearchUserQuery,
    useSearchUserOldQuery,
    useGetUsersMessagesQuery

} = messagesService
