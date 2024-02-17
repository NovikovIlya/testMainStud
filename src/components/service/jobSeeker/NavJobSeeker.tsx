import { useLocation } from 'react-router-dom'

import Catalog from './Catalog'
import VacancyView from './VacancyView'

export const NavJobSeeker = () => {
	const { pathname } = useLocation()
	return (
		<>
			{pathname.includes('/services/jobseeker/catalog') && <Catalog />}
			{pathname.includes('/services/jobseeker/vacancyview') && <VacancyView />}
		</>
	)
}
