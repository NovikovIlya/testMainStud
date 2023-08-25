import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IAddress, addressItem } from '../../../api/types'

const initAddressItem: addressItem = {
	countryId: null,
	city: null,
	street: null,
	house: null,
	apartment: null,
	index: null
}

type target = 'registrationAddress' | 'residenceAddress'

const initialState: IAddress = {
	registrationAddress: initAddressItem,
	residenceAddress: initAddressItem
}

export const AddressReducer = createSlice({
	name: 'Address',
	initialState,
	reducers: {
		allData: (state, action: PayloadAction<IAddress>): IAddress => {
			return action.payload
		},
		country: (
			state,
			action: PayloadAction<{ target: target; country: number }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.countryId = action.payload.country
			} else {
				state.residenceAddress.countryId = action.payload.country
			}
		},
		city: (state, action: PayloadAction<{ target: target; city: string }>) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.city = action.payload.city
			} else {
				state.residenceAddress.city = action.payload.city
			}
		},
		street: (
			state,
			action: PayloadAction<{ target: target; street: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.street = action.payload.street
			} else {
				state.residenceAddress.street = action.payload.street
			}
		},
		house: (
			state,
			action: PayloadAction<{ target: target; house: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.house = action.payload.house
			} else {
				state.residenceAddress.house = action.payload.house
			}
		},
		apartment: (
			state,
			action: PayloadAction<{ target: target; apartment: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.apartment = action.payload.apartment
			} else {
				state.residenceAddress.apartment = action.payload.apartment
			}
		},
		index: (
			state,
			action: PayloadAction<{ target: target; index: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.index = action.payload.index
			} else {
				state.residenceAddress.index = action.payload.index
			}
		}
	}
})

export const { index, country, apartment, house, street, city, allData } =
	AddressReducer.actions

export default AddressReducer.reducer

export const selectState = (state: RootState) => state.Address
