import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IGender, formItem } from '../../../api/types'

const initialState: formItem = {
	name: '',
	surName: '',
	patronymic: '',
	birthDay: '',
	gender: 'M',
	phone: '',
	countryId: 1
}
export const FormReducer = createSlice({
	name: 'Form',
	initialState,
	reducers: {
		name: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		surName: (state, action: PayloadAction<string>) => {
			state.surName = action.payload
		},
		patronymic: (state, action: PayloadAction<string>) => {
			state.patronymic = action.payload
		},
		birthDay: (state, action: PayloadAction<string>) => {
			state.birthDay = action.payload
		},
		gender: (state, action: PayloadAction<IGender>) => {
			state.gender = action.payload
		},
		phone: (state, action: PayloadAction<string>) => {
			state.phone = action.payload
		},
		country: (state, action: PayloadAction<number>) => {
			state.countryId = action.payload
		}
	}
})

export const { name, surName, patronymic, birthDay, gender, phone, country } =
	FormReducer.actions

export default FormReducer.reducer

export const selectState = (state: RootState) => state.Form
