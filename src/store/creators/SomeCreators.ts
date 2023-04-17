import { Dispatch } from '@reduxjs/toolkit'

import {
	LogInFailure,
	LogOutSuccess,
	RegistFailure
} from '../reducers/AuthRegReducer'
import { ProfileSuccess } from '../reducers/ProfileReducer'

export const ReloadState =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(
			ProfileSuccess(JSON.parse(localStorage.getItem('user_data') || '{}'))
		)
	}

export const LogOut =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(LogOutSuccess())
	}

export const DeleteLogInErrors =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(LogInFailure([]))
	}

export const DeleteRegistrationErrors =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(RegistFailure([]))
	}
