import { Card } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const InfoStudent = ({ login = '123', password = '123' }) => {
	const { t } = useTranslation()

	return (
		<Card className="border-l-rose-500 mt-5 mb-14 rounded-3xl text-base shadow-md ">
			<div className='font-bold'>{t('welcome_message_student')}</div>
			<div>
			<div>{t('welcome_message_student1')}</div>
			</div>
			<div> 	{t('welcome_message_student2')}  <a  href={`mailto:${t('welcome_message_studentMail')}`}>{t('welcome_message_studentMail')}</a></div>
			<div>
			<div>{t('welcome_message_student3')}  <a rel="noopener noreferrer" target="_blank"  href='https://forms.yandex.ru/cloud/681ae464505690c4ba036f1b'>{t('welcome_message_student3Form')}</a></div>
			</div>
			<div> 	<div>{t('welcome_message_student4')}</div> </div>
			
		</Card>
	)
}

export default InfoStudent
