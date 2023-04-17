import { Form, Typography } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { RequestFolLogIn } from '../../store/creators/MainCreators'
import { DeleteLogInErrors } from '../../store/creators/SomeCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Login.module.scss'
import './Login.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'
import { Switcher } from './switcher/Switcher'

const { Title } = Typography

export const Login: FC = () => {
	const navigate = useNavigate()
	const error = useSelector((state: RootState) => state.AuthReg.authData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const JustOnce = useRef(0)

	useEffect(() => {
		if (JustOnce.current === 0) {
			JustOnce.current = 1
			dispatch(DeleteLogInErrors())
		} else {
			JustOnce.current = 0
		}
	}, [])

	const onFinish = (values: {
		email?: string
		phone?: string
		password: string
	}) => {
		const dataApi = async () => {
			if (values?.email) {
				await dispatch(
					RequestFolLogIn({ username: values.email, password: values.password })
				)
			}
			if (values?.phone) {
				await dispatch(
					RequestFolLogIn({ username: values.phone, password: values.password })
				)
			}
			if (localStorage.getItem('access') !== null) {
				navigate('/profile')
			}
		}
		dataApi()
	}

	return (
		<div className={styles.wrapper}>
			<BackMainPage />
			<div className={styles.main}>
				<Form
					name="login"
					className={styles.loginForm}
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Title className={styles.title}>Авторизация</Title>

					<Switcher setValue={setValue} />
					<Inputs error={error} value={value} />
					<Buttons />
				</Form>
				<Faq />
			</div>
		</div>
	)
}
