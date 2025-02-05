import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { ElectronicBookSvg } from '../../../assets/svg/ElectronicBookSvg'
import { Header } from '../../layout/Header'

import { DocumentFlow } from './DocumentFlow'
import { t } from 'i18next'

const navList = [
	{
		id: '/services/unifiedServiceCenter/documentFlow',
		icon: <ElectronicBookSvg />,
		name: t('Documents')
	}
]
export const NavUnifiedServiceCenter = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const handleNavigate = (url: string) => {
		navigate(url)
	}
	const handleList = navList.map(({ icon, name, id }, index) => {
		return (
			<li
				key={index}
				className={clsx(
					'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
					id === pathname && 'bg-[#F5F8FB]'
				)}
				onClick={() => handleNavigate(id)}
			>
				<div className="flex items-center gap-[10px]">
					{icon}
					<p className="text-base">{name}</p>
				</div>
			</li>
		)
	})
	return (
		<>
			<Header type="service" service={t('UnifiedServiceCenter')} />

			<div className="shadowNav mt-20">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 ">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] w-full mt-20">
				{pathname === navList[0].id && <DocumentFlow />}
			</div>
		</>
	)
}
