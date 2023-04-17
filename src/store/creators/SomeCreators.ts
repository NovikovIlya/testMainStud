import { Dispatch } from '@reduxjs/toolkit'

import {
	LogInFailure,
	LogOutSuccess,
	RegistFailure
} from '../reducers/AuthRegReducer'

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
