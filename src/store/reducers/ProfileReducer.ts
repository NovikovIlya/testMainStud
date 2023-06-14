import { PayloadAction, createSlice } from '@reduxjs/toolkit';



import { IError, IProfileState, IUserData } from '../../api/types';
import { RootState } from '../index';


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
		ProfileSuccess: (
			state,
			action: PayloadAction<IUserData>
		): IProfileState => {
			return {
				...state,
				profileData: {
					...state.profileData,
					error: null,
					CurrentData: action.payload
				}
			}
		},
		ProfileFailure: (
			state,
			action: PayloadAction<IError[]>
		): IProfileState => ({
			...state,
			profileData: {
				...state.profileData,
				error: action.payload
			}
		})
	}
})

export const { ProfileFailure, ProfileSuccess } = ProfileReducer.actions

export default ProfileReducer.reducer

export const selectState = (state: RootState) => state.Profile