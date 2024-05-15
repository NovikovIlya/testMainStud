import {practiceApi} from './practiceApi'

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

    })
})
export const {
    useCreateContractMutation,
} = contractService
