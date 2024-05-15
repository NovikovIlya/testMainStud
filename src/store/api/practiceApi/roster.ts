import {practiceApi} from './practiceApi'
import {ContractsAll} from "../../../models/Practice";

export const rosterService = practiceApi.injectEndpoints({
    endpoints: builder => ({
        getContractsAll: builder.query<ContractsAll[], void>({
            query: () => ({
                url: 'contracts/all',
                method: 'GET',
            })
        }),
        getContractsShort: builder.query<any, void>({
            query: () => ({
                url: 'contracts/all-short',
                method: 'GET',
            })
        })

    })
})
export const {
    useGetContractsAllQuery,
    useGetContractsShortQuery
} = rosterService
