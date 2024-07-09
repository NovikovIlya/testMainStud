import { Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { ArrowLeftSvg } from '../assets/svg'
import { useEffect } from 'react'

const { Link } = Typography
export const BackMainPage = () => {
	const { t, i18n } = useTranslation()

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	useEffect(() => {
		document.title = t('pageTitle'); 
	}, [t]);

	  
	return (
		<div className="flex w-full items-center justify-between px-4">
			<div className=" flex w-fit items-center gap-[10px] my-[50px] ml-[50px] cursor-pointer ">
				<ArrowLeftSvg />
				<Link style={{ color: 'black' }} href="">
					{t('backPage')}
				</Link>
			</div>
			<Select
				defaultValue={i18n.language}
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
