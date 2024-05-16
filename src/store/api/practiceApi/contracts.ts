import {practiceApi} from './practiceApi'
import {ContractsAll} from "../../../models/Practice";

export const contractService = practiceApi.injectEndpoints({
    endpoints: builder => ({
        createContract: builder.mutation<void, FormData>({
            query: (body: FormData) => {
                return {
                    url: 'contracts',
                    body: body,
                    method: 'POST'
                }
            }
        }),
        deleteContract: builder.mutation<void, string>({
            query: id => {
                return {
                    url: `/contracts/${id}`,
                    method: 'DELETE',
                }
            }
        }),
        getContract: builder.query<ContractsAll, string>({
            query: id => `/contracts/${id}`
        })

    })
})
export const {
    useCreateContractMutation,
    useDeleteContractMutation,
    useGetContractQuery,
} = contractService
