import { Card } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const InfoStudent = ({ login = '123', password = '123' }) => {
	const { t } = useTranslation()

	return (
		<Card className="border-l-rose-500 mt-5 mb-14 rounded-3xl">
			<div>{t('welcome_message_student')}</div>
			<div>
				ввв
			</div>
			<div> sssssssss</div>
			<div>
				иии
			</div>
			<div> ыыыыы </div>
			<div> ыыыыы</div>
		</Card>
	)
}

export default InfoStudent
