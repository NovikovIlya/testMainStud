import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IRole, TypeRole } from '../../../api/types'

const initialState: IRole = {
	role: 'GUEST'
}

export const InfoUserReducer = createSlice({
	name: 'InfoUser',
	initialState,
	reducers: {
		putRole: (state, action: PayloadAction<TypeRole>) => {
			state.role = action.payload
		}
	}
})

export const { putRole } = InfoUserReducer.actions

export default InfoUserReducer.reducer

export const selectState = (state: RootState) => state.InfoUser
