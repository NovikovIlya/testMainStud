import { useLocation } from 'react-router-dom'
import { SeekerEmployment } from './seekerEmployment'
import { Stages } from './Stages'

export const NavSeekerEmployment = () => {
	const { pathname } = useLocation()

	return (
		<>
			{pathname === '/services/myresponds/employment' && <SeekerEmployment />}
			{pathname.match('services/myresponds/employment/stages/*') && <Stages />}
		</>
	)
}
