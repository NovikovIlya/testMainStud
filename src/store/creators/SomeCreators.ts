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

export const clearLoginErrors =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(loginFailure(null))
	}

export const clearRegistrationErrors =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(registrationFailure(null))
	}
