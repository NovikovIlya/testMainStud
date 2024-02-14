import { useLocation } from 'react-router-dom'

import { CreatePractical } from './CreatePractical'
import { ViewPractical } from './ViewPractical'

export const Practical = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createPractical')) return <CreatePractical />
	else return <ViewPractical />
}
