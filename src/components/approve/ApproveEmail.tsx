import { useEffect } from 'react'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { approveEmail } from '../../store/creators/MainCreators'
import { Layout } from '../layout/Layout'

import { CardForm } from './cardForm'

interface IApproveProps {
	changeIsLogin: (IsLogIn: boolean) => void
}

export const ApproveEmail: FC<IApproveProps> = ({ changeIsLogin }) => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log(searchParams.get('id'), searchParams.get('hash'))
		if (searchParams.get('id') !== null && searchParams.get('hash') !== null) {
			dispatch(
				approveEmail({
					id: searchParams.get('id'),
					hash: searchParams.get('hash')
				})
			)
			changeIsLogin(false)
			navigate('/profile')
		}
	})

	const buttonEffect = () => {
		console.log("it's buttons effect")
	}

	const closeEffect = () => {
		console.log("it's close effect")
	}
	return (
		<CardForm
			buttonEffect={buttonEffect}
			closeEffect={closeEffect}
			withDots={false}
			mainTittle="Добро пожаловать"
			secondTittle="Здесь нужен интересный приветственный текст о том, что может делать пользователь. Не следует, однако, забывать, что высокотехнологичная концепция общественного уклада не даёт нам иного выбора, кроме определения новых предложений."
			buttonText="Начнём"
			buttonBgBlue={false}
		/>
	)
}
