import {practiceApi} from './practiceApi'
import {ContractsAll, ICreateContract, ResponseEditContract, ListIdDeleteContracts} from "../../../models/Practice";
import {apiSlice} from "../apiSlice";

export const contractService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createContract: builder.mutation<void, FormData>({
            query: (body: FormData) => {
                return {
                    url: 'services/api-practices/contracts',
                    body: body,
                    method: 'POST'
                }
            },
            invalidatesTags: [{type: 'Contracts', id: 'LIST'}]
        }),
        deleteContract: builder.mutation<void, string>({
            query: id => {
                return {
                    url: `services/api-practices/contracts/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Contracts', id: 'LIST'}]
        }),
        deleteSeveralContract: builder.mutation<void, ListIdDeleteContracts>({
            query: (body: ListIdDeleteContracts) => {
                return {
                    url: 'services/api-practices/contracts/several',
                    body: body,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [{type: 'Contracts', id: 'LIST'}]

        }),
        getContract: builder.query<ContractsAll, string>({
            query: id => `services/api-practices/contracts/${id}`,
            providesTags: () => [{ type: 'Contracts', id: 'LIST' }],
        }),
        getContractForEdit: builder.query<ResponseEditContract, string>({
            query: id => `services/api-practices/contracts/${id}`,
            providesTags: () => [{ type: 'Contracts', id: 'LIST' }],
        }),
        editContract: builder.mutation<void, FormData>({
            query: (body: FormData) => {
                return {
                    url: 'services/api-practices/contracts',
                    body: body,
                    method: 'PATCH',
                }
            },
            invalidatesTags: [{type: 'Contracts', id: 'LIST'}]
        })

    })
})
export const {
    useCreateContractMutation,
    useDeleteContractMutation,
    useGetContractQuery,
    useDeleteSeveralContractMutation,
    useGetContractForEditQuery,
    useEditContractMutation,
} = contractService
