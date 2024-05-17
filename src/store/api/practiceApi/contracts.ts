import {practiceApi} from './practiceApi'
import {ContractsAll, ICreateContract, ResponseEditContract, ListIdDeleteContracts} from "../../../models/Practice";

export const contractService = practiceApi.injectEndpoints({
    endpoints: builder => ({
        createContract: builder.mutation<void, FormData>({
            query: (body: FormData) => {
                return {
                    url: 'contracts',
                    body: body,
                    method: 'POST'
                }
            },
            invalidatesTags: [{type: 'Contracts', id: 'LIST'}]
        }),
        deleteContract: builder.mutation<void, string>({
            query: id => {
                return {
                    url: `contracts/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{type: 'Contracts', id: 'LIST'}]
        }),
        deleteSeveralContract: builder.mutation<void, ListIdDeleteContracts>({
            query: (body: ListIdDeleteContracts) => {
                return {
                    url: 'contracts/several',
                    body: body,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [{type: 'Contracts', id: 'LIST'}]

        }),
        getContract: builder.query<ContractsAll, string>({
            query: id => `contracts/${id}`
        }),
        getContractForEdit: builder.query<ResponseEditContract, string>({
            query: id => `contracts/${id}`
        })

    })
})
export const {
    useCreateContractMutation,
    useDeleteContractMutation,
    useGetContractQuery,
    useDeleteSeveralContractMutation,
    useGetContractForEditQuery,
} = contractService
