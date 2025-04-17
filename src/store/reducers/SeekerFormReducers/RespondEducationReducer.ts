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

export type educationResponceItemType = {
	id: string
	education: educationResponceType
}

type educationRespondStateType = {
	educations: educationResponceItemType[]
}

const initialState: educationRespondStateType = {
	educations: []
}

const RespondEducationReducer = createSlice({
	name: 'RespondEducationReducer',
	initialState,
	reducers: {
		addEducation: (state, action: PayloadAction<educationResponceItemType>) => {
			state.educations.push(action.payload)
		},
		deleteEducation: (state, action: PayloadAction<string>) => {
			state.educations = state.educations.filter(
				edu => edu.id !== action.payload
			)
		},
		alterEducation: (
			state,
			action: PayloadAction<{ id: string } & educationResponceType>
		) => {
			const newExp = state.educations.find(edu => {
				return edu.id === action.payload.id
			})
			newExp !== undefined &&
				(newExp.education = {
					nameofInstitute: action.payload.nameofInstitute,
					educationLevelId: action.payload.educationLevelId,
					graduateYear: action.payload.graduateYear,
					countryId: action.payload.countryId,
					specialization: action.payload.specialization
				})
			newExp !== undefined &&
				(state = {
					...state,
					educations: state.educations.map(edu =>
						edu.id === action.payload.id ? newExp : edu
					)
				})
		}
	}
})

export const { addEducation, deleteEducation, alterEducation } =
	RespondEducationReducer.actions

export default RespondEducationReducer.reducer

export const selectState = (state: RootState) => state.RespondEducation
