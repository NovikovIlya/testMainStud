import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useApproveEmailMutation } from '../../store/api/serviceApi'
import { setCredentials } from '../../store/reducers/authSlice'
import { InitialState } from '../../store/type'

import { CardForm } from './cardForm'

export const ApproveEmail = () => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const [approve] = useApproveEmailMutation()
	const dispatch = useDispatch()
	useEffect(() => {
		try {
			const fetchData = async () => {
				const data:
					| {
							data: InitialState
					  }
					| {
							error: FetchBaseQueryError | SerializedError
					  } = await approve({
					id: searchParams.get('id'),
					hash: searchParams.get('hash')
				})
				console.log(data)
				//@ts-ignore
				dispatch(setCredentials(data.data))
			}

			fetchData()
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
