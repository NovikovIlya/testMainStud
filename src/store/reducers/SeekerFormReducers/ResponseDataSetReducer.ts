import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { dataSet: boolean } = { dataSet: false }

export const DataSet = createSlice({
	name: 'DataSet',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<boolean>) => {
			state.dataSet = action.payload
		}
	}
})

export const { setData } = DataSet.actions

export default DataSet.reducer
