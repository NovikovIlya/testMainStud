import { useLocation } from 'react-router-dom'

import { Stages } from './Stages'
import { SeekerEmployment } from './seekerEmployment'

export const NavSeekerEmployment = () => {
	const { pathname } = useLocation()

	return (
		<>
			{pathname === '/services/myresponds/employment' && <SeekerEmployment />}
			{pathname.match('services/myresponds/employment/stages/*') && <Stages />}
		</>
	)
}
