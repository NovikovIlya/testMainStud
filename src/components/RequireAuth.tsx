import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '../store'

export const RequireAuth = () => {
	const token = useAppSelector(state => state.auth.accessToken)
	const location = useLocation()
	return token ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ form: location }} replace />
	)
}
