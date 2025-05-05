import { Route, Routes, useLocation } from 'react-router-dom'

import { Header } from '../../layout/Header'
import { WrapperForServices } from '../../wrapperForServices/WrapperForServices'

import Catalog from './Catalog'
import VacancyView from './VacancyView'

export const NavJobSeeker = () => {
	const { pathname } = useLocation()
	return (
		<>
			<Header type="service" service="Каталог" />
			<WrapperForServices>
				{/* {pathname.includes('/services/jobseeker/catalog') && <Catalog />}
				{pathname.includes('/services/jobseeker/vacancyview') && <VacancyView type="CATALOG" />} */}
				<Routes>
					<Route path="/jobseeker/catalog" element={<Catalog />}></Route>
					<Route path="/jobseeker/vacancyview/:vacancyId" element={<VacancyView type="CATALOG" />}></Route>
				</Routes>
			</WrapperForServices>
		</>
	)
}
