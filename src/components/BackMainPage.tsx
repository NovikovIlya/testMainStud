import { Select, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { ArrowLeftSvg } from '../assets/svg'

const { Link } = Typography

export const BackMainPage = ({ className,notAuth = false }:{className?:string, notAuth?:boolean}) => {
	const { t, i18n } = useTranslation()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const paramValue = searchParams.get('lan')

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	useEffect(() => {
		document.title = t('pageTitle')
	}, [t])

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

	return (
		<div className={`${className} flex w-full items-center justify-between  pr-8 pl-0  absolute ${isMobile ? 'hidden' : ''}`}>
			<div className=" flex w-fit items-center gap-[10px] my-[50px] ml-[50px] cursor-pointer ">
				{notAuth ? (
					<div className="h-3"></div>
				) : (
					<div className='hover:shadow  flex gap-2 items-center p-2 m-[-8px] rounded-lg'>
						<ArrowLeftSvg className='opacity-50'  />
						<Link style={{ color: 'black' }} href="/user">
							{t('backPage')}
						</Link>
					</div>
				)}
			</div>
			<Select
				className="hover:shadow rounded p-1 duration-300"
				defaultValue={paramValue === 'eng' ? 'en' : i18n.language}
				style={{ width: 75 }}
				bordered={false}
				onChange={e => changeLanguage(e.valueOf())}
				options={[
					{ value: 'ru', label: 'Рус' },
					{ value: 'en', label: 'Eng' }
				]}
			/>
		</div>
	)
}
