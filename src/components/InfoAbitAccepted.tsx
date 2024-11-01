import { Card } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next';

const InfoAbitAccepted = ( { login='123', password='123' }) => {
    const { t } = useTranslation();

	return (
		<Card className='border-l-rose-500 mt-5'>
			<div>{t('welcome_message')}</div>
            <div><span dangerouslySetInnerHTML={{ __html: t('account_creation_message', { login, password }) }} /></div>
            <div> {t('yandex_instructions_title')}</div>
            <div>1) <span dangerouslySetInnerHTML={{ __html: t('yandex_step_1') }} /></div>
            <div> 2) {t('yandex_step_2', { login })} </div>
            <div> 3) {t('yandex_step_3')}</div>
		</Card>
	)
}

export default InfoAbitAccepted
