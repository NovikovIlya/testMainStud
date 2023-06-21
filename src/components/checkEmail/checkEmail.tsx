import { useNavigate } from 'react-router-dom'

import { CardForm } from '../approve/cardForm'

export const CheckEmail = () => {
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
			secondTittle="На почту Molodec@gmail.com выслано приветственное письмо. Для завершения регистрации Вам необходимо перейти по ссылке, указанной в письме "
			buttonText="Выслать повторно"
			buttonBgBlue={true}
		/>
	)
}
