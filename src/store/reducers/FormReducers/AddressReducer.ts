import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IAddress, addressItem } from '../../../api/types'

const initAddressItem: addressItem = {
	countryId: 184,
	city: '',
	street: '',
	house: '',
	apartment: '',
	index: ''
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
		allData: (_, action: PayloadAction<IAddress>): IAddress => {
			return action.payload
		},
		country: (
			state,
			action: PayloadAction<{ target: target; country: number }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.countryId = action.payload.country
			} else {
				if (state.residenceAddress)
					state.residenceAddress.countryId = action.payload.country
				else
					state.residenceAddress = {
						...initAddressItem,
						countryId: action.payload.country
					}
			}
		},
		city: (state, action: PayloadAction<{ target: target; city: string }>) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.city = action.payload.city
			} else {
				if (state.residenceAddress)
					state.residenceAddress.city = action.payload.city
				else
					state.residenceAddress = {
						...initAddressItem,
						city: action.payload.city
					}
			}
		},
		street: (
			state,
			action: PayloadAction<{ target: target; street: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.street = action.payload.street
			} else {
				if (state.residenceAddress)
					state.residenceAddress.street = action.payload.street
				else
					state.residenceAddress = {
						...initAddressItem,
						street: action.payload.street
					}
			}
		},
		house: (
			state,
			action: PayloadAction<{ target: target; house: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.house = action.payload.house
			} else {
				if (state.residenceAddress)
					state.residenceAddress.house = action.payload.house
				else
					state.residenceAddress = {
						...initAddressItem,
						house: action.payload.house
					}
			}
		},
		apartment: (
			state,
			action: PayloadAction<{ target: target; apartment: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.apartment = action.payload.apartment
			} else {
				if (state.residenceAddress)
					state.residenceAddress.apartment = action.payload.apartment
				else
					state.residenceAddress = {
						...initAddressItem,
						apartment: action.payload.apartment
					}
			}
		},
		index: (
			state,
			action: PayloadAction<{ target: target; index: string }>
		) => {
			if (action.payload.target === 'registrationAddress') {
				state.registrationAddress.index = action.payload.index
			} else {
				if (state.residenceAddress)
					state.residenceAddress.index = action.payload.index
				else
					state.residenceAddress = {
						...initAddressItem,
						index: action.payload.index
					}
			}
		}
	}
})

export const { index, country, apartment, house, street, city, allData } =
	AddressReducer.actions

export default AddressReducer.reducer

export const selectState = (state: RootState) => state.Address
