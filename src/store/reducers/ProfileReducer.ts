import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IError, IProfileState, IUserData } from '../../api/types'
import { RootState } from '../index'

const initialState: IProfileState = {
	profileData: {
		error: null,
		CurrentData: null
	}
}

export const ProfileReducer = createSlice({
	name: 'Profile',
	initialState,
	reducers: {
		ProfileSuccess: (state, action: PayloadAction<IUserData>) => {
			state.profileData.CurrentData = action.payload
			state.profileData.error = null
		},
		ProfileFailure: (state, action: PayloadAction<IError>) => {
			state.profileData.error = action.payload
		}
	}
})

export const { ProfileFailure, ProfileSuccess } = ProfileReducer.actions

export default ProfileReducer.reducer

export const selectState = (state: RootState) => state.Profile
