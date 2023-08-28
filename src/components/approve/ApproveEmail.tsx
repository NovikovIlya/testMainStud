import { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { approveEmail } from '../../store/creators/MainCreators'

import { CardForm } from './cardForm'

export const ApproveEmail = () => {
	const cookies = new Cookies()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (searchParams.get('id') !== null && searchParams.get('hash') !== null) {
			dispatch(
				approveEmail({
					id: searchParams.get('id'),
					hash: searchParams.get('hash')
				})
			)
		}
		navigate('/infoUser')
	})

	const buttonEffect = () => {
		if (
			localStorage.getItem('access') !== null ||
			localStorage.getItem('userInfo') !== null ||
			cookies.get('refresh') !== undefined
		) {
			navigate('/infoUser')
		}
	}

	const closeEffect = () => {
		navigate('/')
	}
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
