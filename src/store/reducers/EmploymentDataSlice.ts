import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EmploymentDataType } from './type'

const initialState: { empData: EmploymentDataType } = {
	empData: {
		id: 0,
		status: 'FILLING',
		stages: []
	}
}

const EmploymentDataSlice = createSlice({
	name: 'employmentData',
	initialState,
	reducers: {
		setAllData: (state, action: PayloadAction<EmploymentDataType>) => {
			state.empData = action.payload
		},
		setHasRequisites: (state, action: PayloadAction<string>) => {
			state.empData.stages = state.empData.stages.map(stage => {
				return stage.type === action.payload
					? { ...stage, hasRequisites: !stage.hasRequisites }
					: stage
			})
		},
		setBank: (
			state,
			action: PayloadAction<{ stage: string; bank: 'SBER' | 'VTB' | undefined }>
		) => {
			state.empData.stages = state.empData.stages.map(stage => {
				return stage.type === action.payload.stage
					? { ...stage, bank: action.payload.bank }
					: stage
			})
		}
	}
})

export const { setAllData, setHasRequisites, setBank } =
	EmploymentDataSlice.actions

export default EmploymentDataSlice.reducer
