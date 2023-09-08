import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CardForm } from '../approve/cardForm'

interface ICheckEmailProps {
	email: string
}

export const CheckEmail: FC<ICheckEmailProps> = ({ email }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const buttonEffect = () => {
		console.log("it's buttons effect")
	}

	const closeEffect = () => {
		navigate('/registration')
	}
	return (
		<CardForm
			buttonEffect={buttonEffect}
			closeEffect={closeEffect}
			withDots={true}
			mainTittle={t('CheckEmail')}
			secondTittle={
				<span>
					{t('SendTo')} <span className="font-bold">{email}</span>
					{t('SendEmail')}
				</span>
			}
			buttonText={t('Resend')}
			buttonBgBlue={true}
		/>
	)
}
