import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState, useAppSelector } from '../..'
import { IGender, formItem } from '../../../api/types'

const initialState: formItem & { email: string } = {
	name: '',
	surName: '',
	patronymic: '',
	birthDay: '',
	gender: 'M',
	phone: '',
	email: '',
	countryId: 184
}
export const AboutMe = createSlice({
	name: 'AboutMe',
	initialState,
	reducers: {
		allData: (_, action: PayloadAction<formItem & { email: string }>) => {
			return action.payload
		},
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
		},
		email: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		}
	}
})

export const {
	name,
	surName,
	patronymic,
	birthDay,
	gender,
	phone,
	country,
	email,
	allData
} = AboutMe.actions

export default AboutMe.reducer

export const selectState = (state: RootState) => state.seekerAboutMe
