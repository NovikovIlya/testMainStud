import {practiceApi} from './practiceApi'
import {ContractFacilities, ContractsAll, ContractShort, NameSpecialty} from "../../../models/Practice";
import {apiSlice} from "../apiSlice";

export const rosterService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContractsAll: builder.query<ContractsAll[], void>({
            query: () => ({
                url: 'services/api-practices/contracts/all',
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
                url: 'services/api-practices/contracts/all-short',
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
                url: 'services/api-practices/kpfu/specialty-names',
                method: 'GET',
            }),
        }),
        getContractFacilities: builder.query<ContractFacilities[], void>({
            query: () => ({
                url: 'services/api-practices/kpfu/contract-facilities',
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({ value }) => ({ type: 'Contracts' as const, value })),
                    {type: 'Contracts', id: 'LIST'},
                ]
                :
                [{type: 'Contracts', id: 'LIST'}],
        })
    })
})
export const {
    useGetContractsAllQuery,
    useGetContractsShortQuery,
    useGetSpecialtyNamesQuery,
    useGetContractFacilitiesQuery,
} = rosterService
