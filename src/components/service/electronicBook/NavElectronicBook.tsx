import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Header } from '../../layout/Header'
import { Estimation } from './Estimation'
import {LeftMenu} from "../../leftMenu/LeftMenu";
import {navElectronicBook} from "../../../utils/navListForLeftMenu/navElectronicBook";
import {WrapperForServices} from "../../wrapperForServices/WrapperForServices";
import {AssessmentTeachers} from "./AssessmentTeachers/AssessmentTeachers";

export const NavElectronicBook = () => {
	const { pathname } = useLocation()
	const { t } = useTranslation()

	return (
		<>
			<Header type="service" service={t('ElectronicBookService')} />
			<LeftMenu navList={navElectronicBook}/>
			<WrapperForServices>
				{pathname === navElectronicBook[0].id && <Estimation />}
				{pathname === navElectronicBook[1].id && <AssessmentTeachers/>}
			</WrapperForServices>
		</>
	)
}
