import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'

type skillsProps = { skills: string[]; details: string }

const initialState: skillsProps = {
	skills: [],
	details: ''
}

const SkillsReducer = createSlice({
	name: 'Skills',
	initialState,
	reducers: {
		allSkillsData: (_, action: PayloadAction<skillsProps>) => {
			return action.payload
		},
		setSkills: (state, action: PayloadAction<string[]>) => {
			state.skills = action.payload
		},
		setDetails: (state, action: PayloadAction<string>) => {
			state.details = action.payload
		}
	}
})

export const { setSkills, setDetails, allSkillsData } = SkillsReducer.actions

export default SkillsReducer.reducer

export const selectState = (state: RootState) => state.skills
