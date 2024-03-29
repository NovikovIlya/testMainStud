import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { ElectronicBookSvg } from '../../../assets/svg/ElectronicBookSvg'
import { Header } from '../../layout/Header'

import { Estimation } from './Estimation'
import {EvaluationTeachersWorkSvg} from "../../../assets/svg/EvaluationTeachersWorkSvg";
import {LeftMenu} from "../../leftMenu/LeftMenu";
import {navElectronicBook} from "../../../utils/navListForLeftMenu/navElectronicBook";
import {WrapperForServices} from "../../wrapperForServices/WrapperForServices";
import {AssessmentTeachers} from "./AssessmentTeachers";

export const NavElectronicBook = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const navList = [
		{
			id: '/services/electronicBook/estimation',
			icon: <ElectronicBookSvg />,
			name: t('ElectronicBook')
		},
		{
			id: '/services/electronicBook/evaluationTeachers',
			icon: <EvaluationTeachersWorkSvg/>,
			name: t('EvaluationTeachersWork')
		}
	]

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
