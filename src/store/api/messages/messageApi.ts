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
        
        
    })
})

export const {
    useGetEmployeesMessageQuery,
    useGetStudentsMessaageQuery,
    useGetAllDialogsQuery,
    useSendMessageChatMutation,
    useGetOneChatQuery,
    useAddNewChatMutation
  

} = messagesService