import { Form, Typography } from 'antd'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/images/group.webp'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { loginUser } from '../../store/creators/MainCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Login.module.scss'
import './Login.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'
import { Switcher } from './switcher/Switcher'

const { Title } = Typography

interface ILoginProps {
	changeIsLogin: (IsLogIn: boolean) => void
}

export const Login: FC<ILoginProps> = ({ changeIsLogin }) => {
	const navigate = useNavigate()
	const error = useSelector((state: RootState) => state.AuthReg.authData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)

	const onFinish = (values: {
		email?: string
		phone?: string
		password: string
	}) => {
		const request = async () => {
			let res = null
			if (values?.email) {
				res = await dispatch(
					loginUser({ username: values.email, password: values.password })
				)
			}
			if (values?.phone) {
				res = await dispatch(
					loginUser({ username: values.phone, password: values.password })
				)
			}
			if (res === 200) {
				navigate('/profile')
				changeIsLogin(false)
			}
		}
		request()
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
				<img className='max-lg:hidden' src={logo} alt="group" />
				<Faq />
			</div>
		</div>
	)
}
