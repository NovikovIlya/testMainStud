import {practiceApi} from './practiceApi'
import {ContractFacilities, ContractsAll, ContractShort, NameSpecialty} from "../../../models/Practice";

export const rosterService = practiceApi.injectEndpoints({
    endpoints: builder => ({
        getContractsAll: builder.query<ContractsAll[], void>({
            query: () => ({
                url: 'contracts/all',
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({ id }) => ({ type: 'Contracts' as const, id })),
                    {type: 'Contracts', id: 'LIST'},
                ]
                :
                [{type: 'Contracts', id: 'LIST'}],
        }),
        getContractsShort: builder.query<ContractShort[], void>({
            query: () => ({
                url: 'contracts/all-short',
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({ id }) => ({ type: 'Contracts' as const, id })),
                    {type: 'Contracts', id: 'LIST'},
                ]
                :
                [{type: 'Contracts', id: 'LIST'}],
        }),
        getSpecialtyNames: builder.query<NameSpecialty[], void>({
            query: () => ({
                url: 'kpfu/specialty-names',
                method: 'GET',
            })
        }),
        getContractFacilities: builder.query<ContractFacilities[], void>({
            query: () => ({
                url: 'kpfu/contract-facilities',
                method: 'GET',
            })
        })
    })
})
export const {
    useGetContractsAllQuery,
    useGetContractsShortQuery,
    useGetSpecialtyNamesQuery,
    useGetContractFacilitiesQuery,
} = rosterService
