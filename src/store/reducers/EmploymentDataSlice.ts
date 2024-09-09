import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EmploymentDataType } from './type'

const initialState: EmploymentDataType = {
	id: 0,
	status: 'FILLING',
	stages: []
}

const EmploymentDataSlice = createSlice({
	name: 'employmentData',
	initialState,
	reducers: {
		setAllData: (state, action: PayloadAction<EmploymentDataType>) => {
			state = action.payload
		}
	}
})

export const { setAllData } = EmploymentDataSlice.actions

export default EmploymentDataSlice.reducer
