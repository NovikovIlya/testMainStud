import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'

type formStates = {
	aboutMeCompleted: boolean
	educationCompleted: boolean
	experienceCompleted: boolean
	skillsCompleted: boolean
}

const initialState: formStates = {
	aboutMeCompleted: false,
	educationCompleted: false,
	experienceCompleted: false,
	skillsCompleted: false
}

const FormCompletionReducer = createSlice({
	name: 'FormCompletion',
	initialState,
	reducers: {
		completeAboutMe: state => {
			state.aboutMeCompleted = true
		},
		completeEducation: state => {
			state.educationCompleted = true
		},
		completeExperience: state => {
			state.experienceCompleted = true
		},
		completeSkills: state => {
			state.skillsCompleted = true
		}
	}
})

export const {
	completeAboutMe,
	completeEducation,
	completeExperience,
	completeSkills
} = FormCompletionReducer.actions

export default FormCompletionReducer.reducer

export const selectState = (state: RootState) => state.formCompletion
