import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const AdaptiveHandler = () => {
	const { pathname } = useLocation()

	const responsiveIndex = ['/user']

	useEffect(() => {
		console.log(pathname)
		let isResponsive = responsiveIndex.find(url => url === pathname)
		let viewport = document.querySelector('meta[name=viewport]')
		viewport &&
			viewport.setAttribute('content', `${isResponsive ? 'width=device-width, initial-scale=1' : 'width=1366'}`)
	}, [pathname])

	return <Outlet />
}
