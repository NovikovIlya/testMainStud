import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'

type experienceType = {
	workplace: string
	seat: string
	beginWork: string
	endWork: string
	duties: string
}

export type experienceItemType = {
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
		deleteExperience: (state, action: PayloadAction<string>) => {
			state.experiences = state.experiences.filter(exp => {
				return exp.id !== action.payload
			})
		},
		alterExperience: (
			state,
			action: PayloadAction<{ id: string } & experienceType>
		) => {
			const newExp = state.experiences.find(exp => {
				return exp.id === action.payload.id
			})
			newExp !== undefined &&
				(newExp.experience = {
					workplace: action.payload.workplace,
					endWork: action.payload.endWork,
					beginWork: action.payload.beginWork,
					seat: action.payload.seat,
					duties: action.payload.duties
				})
			newExp !== undefined &&
				(state = {
					...state,
					experiences: state.experiences.map(exp =>
						exp.id === action.payload.id ? newExp : exp
					)
				})
		}
	}
})

export const {
	raiseNoExperienceFlag,
	lowerNoExperienceFlag,
	addExperience,
	deleteExperience,
	alterExperience
} = ExperienceReducer.actions

export default ExperienceReducer.reducer

export const selectState = (state: RootState) => state.Experience
