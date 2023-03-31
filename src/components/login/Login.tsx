import { Form, Typography } from 'antd'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState, useAppDispatch } from '../../store'
import { getAccessToken, loginUser } from '../../store/auth/actionCreators'
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
	const error = useSelector((state: RootState) => state.auth.authData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)

	const onFinish = (values: {
		email?: string
		phone?: string
		password: string
	}) => {
		const dataApi = async () => {
			if (values?.email) {
				await dispatch(
					loginUser({ username: values.email, password: values.password })
				)
			}
			if (values?.phone) {
				await dispatch(
					loginUser({ username: values.phone, password: values.password })
				)
			}
			const res = await dispatch(getAccessToken())
			if (res !== null) {
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
