import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IinfoUserState, roleType } from '../../../api/types'

const initialState: IinfoUserState = {
	role: ''
}

export const InfoUserReducer = createSlice({
	name: 'InfoUser',
	initialState,
	reducers: {
		roleSuccess: (state, action: PayloadAction<roleType>): IinfoUserState => {
			return { ...state, role: action.payload }
		}
	}
})

export const { roleSuccess } = InfoUserReducer.actions

export default InfoUserReducer.reducer

export const selectState = (state: RootState) => state.InfoUser
