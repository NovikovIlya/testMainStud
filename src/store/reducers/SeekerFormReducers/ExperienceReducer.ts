import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'

type experienceType = {
	workplace: string
	seat: string
	beginWork: string
	endWork: string
	duties: string
	resume: File
}

type experienceItemType = {
	id: string
	experience: experienceType
}

type experienceStateType = {
	noExperienceFlag: boolean
	experiences: experienceItemType[]
}

const initialState: experienceStateType = {
	noExperienceFlag: false,
	experiences: []
}

const ExperienceReducer = createSlice({
	name: 'ExperienceReducer',
	initialState,
	reducers: {
		raiseNoExperienceFlag: state => {
			state.noExperienceFlag = true
		},
		lowerNoExperienceFlag: state => {
			state.noExperienceFlag = false
		},
		addExperience: (state, action: PayloadAction<experienceItemType>) => {
			state.experiences.push(action.payload)
		},
		deleteExperience: (state, action: PayloadAction<experienceItemType>) => {
			state.experiences.filter(exp => {
				return exp.id !== action.payload.id
			})
		}
	}
})

export const {
	raiseNoExperienceFlag,
	lowerNoExperienceFlag,
	addExperience,
	deleteExperience
} = ExperienceReducer.actions

export default ExperienceReducer.reducer

export const selectState = (state: RootState) => state.Experience
