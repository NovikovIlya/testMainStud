import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { CardForm } from '../approve/cardForm'

interface ICheckEmailProps {
	email: string
}

export const CheckEmail: FC<ICheckEmailProps> = ({ email }) => {
	const navigate = useNavigate()
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
			mainTittle="Проверьте почту"
			secondTittle={
				<span>
					На почту <span className="font-bold">{email}</span> выслано
					приветственное письмо. Для завершения регистрации Вам необходимо
					перейти по ссылке, указанной в письме
				</span>
			}
			buttonText="Выслать повторно"
			buttonBgBlue={true}
		/>
	)
}
