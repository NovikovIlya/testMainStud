import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'

const initialState = {
	name: '',
	surName: '',
	patronymic: '',
	birthDay: '',
	gender: 'Мужчина',
	phone: '',
	country: 'Российская Федерация'
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
		gender: (state, action: PayloadAction<string>) => {
			state.gender = action.payload
		},
		phone: (state, action: PayloadAction<string>) => {
			state.phone = action.payload
		},
		country: (state, action: PayloadAction<string>) => {
			state.country = action.payload
		}
	}
})

export const { name, surName, patronymic, birthDay, gender, phone, country } =
	FormReducer.actions

export default FormReducer.reducer

export const selectState = (state: RootState) => state.Form
