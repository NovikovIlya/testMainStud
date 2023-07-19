import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IinfoUserState, TypeRole } from '../../../api/types'

const initialState: IinfoUserState = {
	role: 'guest'
}

export const InfoUserReducer = createSlice({
	name: 'InfoUser',
	initialState,
	reducers: {
		role: (state, action: PayloadAction<TypeRole>) => {
			state.role = action.payload
		}
	}
})

export const { role } = InfoUserReducer.actions

export default InfoUserReducer.reducer

export const selectState = (state: RootState) => state.InfoUser
