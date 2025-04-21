import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EmploymentDocsType } from './type'

const initialState: { docs: EmploymentDocsType[] } = { docs: [] }

const EmployementSeekerDocsSlice = createSlice({
	name: 'employmentSeekerDocs',
	initialState,
	reducers: {
		setDocs: (state, action: PayloadAction<EmploymentDocsType[]>) => {
			state.docs = action.payload
		}
	}
})

export const { setDocs } = EmployementSeekerDocsSlice.actions

export default EmployementSeekerDocsSlice.reducer
