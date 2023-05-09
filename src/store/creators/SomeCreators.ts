import { Dispatch } from '@reduxjs/toolkit'

import {
	loginFailure,
	logoutSuccess,
	registrationFailure
} from '../reducers/AuthRegReducer'

export const logout =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(logoutSuccess())
	}

export const DeleteLogInErrors =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(loginFailure([]))
	}

export const DeleteRegistrationErrors =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(registrationFailure([]))
	}
