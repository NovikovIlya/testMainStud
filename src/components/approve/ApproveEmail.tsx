import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useApproveEmailMutation } from '../../store/api/serviceApi'

import { CardForm } from './cardForm'

export const ApproveEmail = () => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const [approve] = useApproveEmailMutation()
	useEffect(() => {
		try {
			approve({
				id: searchParams.get('id'),
				hash: searchParams.get('hash')
			})
		} catch (e) {
			navigate('/user')
			console.error(e)
		}
	}, [])

	const buttonEffect = () => {
		navigate('/infoUser')
	}

	const closeEffect = () => {}
	return (
		<CardForm
			buttonEffect={buttonEffect}
			closeEffect={closeEffect}
			withDots={false}
			mainTittle="Добро пожаловать"
			secondTittle={
				<span>
					"Здесь нужен интересный приветственный текст о том, что может делать
					пользователь. Не следует, однако, забывать, что высокотехнологичная
					концепция общественного уклада не даёт нам иного выбора, кроме
					определения новых предложений."
				</span>
			}
			buttonText="Начнём"
			buttonBgBlue={false}
		/>
	)
}
