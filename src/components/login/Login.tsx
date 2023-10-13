import { Form, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/images/group.png'
import { RootState } from '../../store'
import { loginUser } from '../../store/creators/MainCreators'
import { clearLoginErrors } from '../../store/creators/SomeCreators'
import { useLoginMutation } from '../../store/reducers/authApiSlice'
import { setCredentials } from '../../store/reducers/authSlice'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Login.module.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'

const { Title } = Typography

export const Login = () => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const error = useSelector((state: RootState) => state.AuthReg.authData.error)
	const dispatch = useDispatch()
	const [login] = useLoginMutation()

	useEffect(() => {
		clearLoginErrors(dispatch)
	}, [i18n.language])

	const onFinish = async (values: { email: string; password: string }) => {
		try {
			const userData = await login({
				username: values.email,
				password: values.password
			}).unwrap()
			dispatch(setCredentials({ ...userData }))
			localStorage.setItem('user', JSON.stringify(userData.user))
			localStorage.setItem('access', JSON.stringify(userData.accessToken))
			localStorage.setItem('refresh', JSON.stringify(userData.refreshToken))
			navigate('/user')
		} catch (e) {
			console.log(e)
		}
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
					<Title className={styles.title}>{t('authorization')}</Title>

					<Inputs error={error} />
					<Buttons />
				</Form>
				<div className="flex items-start mt-10">
					<img
						className="max-lg:hidden w-[400px] h-[400px]"
						src={logo}
						alt="group"
					/>
				</div>
				<Faq />
			</div>
		</div>
	)
}
