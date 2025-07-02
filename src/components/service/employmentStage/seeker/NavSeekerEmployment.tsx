import { Route, Routes, useLocation } from 'react-router-dom'

import { Stages } from './Stages'
import { SeekerEmployment } from './seekerEmployment'

export const NavSeekerEmployment = () => {
	const { pathname } = useLocation()

	return (
		<>
			<Routes>
				<Route path="" element={<SeekerEmployment />}></Route>
				<Route path="/stages/:vacancyId/:respondId" element={<Stages />}></Route>
			</Routes>
			{/* {pathname === '/services/myresponds/employment' && <SeekerEmployment />} */}
			{/* {pathname.match('services/myresponds/employment/stages/*') && <Stages />} */}
		</>
	)
}
