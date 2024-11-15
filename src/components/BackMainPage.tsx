import { Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { ArrowLeftSvg } from '../assets/svg'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const { Link } = Typography
export const BackMainPage = ({notAuth=false}) => {
	const { t, i18n } = useTranslation()
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const paramValue = searchParams.get('lan');

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	useEffect(() => {
		document.title = t('pageTitle'); 
	}, [t]);

	  
	return (
		<div className="flex w-full items-center justify-between px-8">
			<div className=" flex w-fit items-center gap-[10px] my-[50px] ml-[50px] cursor-pointer ">
				{notAuth ? <div className='h-3'></div> : <><ArrowLeftSvg />
				<Link style={{ color: 'black' }} href="/user">
					{t('backPage')}
				</Link></>}
			</div>
			<Select
				defaultValue={paramValue==='eng' ? 'en' : i18n.language}
				style={{ width: 100 }}
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
