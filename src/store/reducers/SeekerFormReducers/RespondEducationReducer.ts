import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { educationItem } from '../../../api/types'

type educationResponceType = {
	nameofInstitute: ''
	educationLevelId: 4
	countryId: 184
	graduateYear: ''
	specialization?: string
}

type educationResponceItemType = {
	id: string
	education: educationResponceType
}

type educationRespondStateType = {
	educations: educationResponceItemType[]
}

const initialState: Omit<educationItem, 'documentNumber' | 'documentSeries'> = {
	nameOfInstitute: '',
	educationLevelId: 4,
	countryId: 184,
	graduateYear: '',
	specialization: ''
}

const RespondEducationReducer = createSlice({
	name: 'RespondEducationReducer',
	initialState,
	reducers: {
		setAllData: (
			_,
			action: PayloadAction<
				Omit<educationItem, 'documentNumber' | 'documentSeries'>
			>
		) => {
			return action.payload
		}
	}
})

export const { setAllData } = RespondEducationReducer.actions

export default RespondEducationReducer.reducer

export const selectState = (state: RootState) => state.RespondEducation
