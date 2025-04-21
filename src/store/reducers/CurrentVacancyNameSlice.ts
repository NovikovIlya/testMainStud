import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = { vacancyTitle: '' }

const currentVacancyNameSlice = createSlice({
	name: 'currentVacancyName',
	initialState,
	reducers: {
		setCurrentVacancyName: (state, action: PayloadAction<string>) => {
			state.vacancyTitle = action.payload
		}
	}
})

export const { setCurrentVacancyName } = currentVacancyNameSlice.actions

export default currentVacancyNameSlice.reducer
