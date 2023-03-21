import { Button, Form, Input, Radio, RadioChangeEvent, Typography } from 'antd'
//import { IAuthRequest } from '../../api/auth/types'
// import { ILoginRequest } from '../../api/auth/types'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { getAccessToken, loginUser } from '../../store/auth/actionCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import { GosSvg } from './GosSvg'
import styles from './Login.module.scss'

const { Title } = Typography

export const Login: FC = () => {
	const navigate = useNavigate()
	const isLoading = useSelector(
		(state: RootState) => state.auth.authData.isLoading
	)
	const error = useSelector((state: RootState) => state.auth.authData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)

	const onChangeRadio = (e: RadioChangeEvent) => setValue(e.target.value)

	const onFinish = (values: { email: string; password: string }) => {
		// console.log('Received values of form: ', values)
		const dataApi = async () => {
			await dispatch(
				loginUser({ username: values.email, password: values.password })
			)
			if (error === null) {
				navigate('/profile')
			}
		}
		dataApi()
		// name()
		// dispatch(loginUser({ ...values }))
	}

	return (
		<div>
			<BackMainPage />
			<div
				className={
					!isLoading
						? styles.main
						: classNames(styles.main, 'bg-gray-600 animate-pulse opacity-30')
				}
			>
				<Form
					name="login"
					className={styles.loginForm}
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item>
						<Title className={styles.title}>Авторизация</Title>
						<Radio.Group
							onChange={onChangeRadio}
							defaultValue={0}
							size="large"
							className={styles.switcher}
							buttonStyle="solid"
						>
							<Radio.Button value={0}>По Email</Radio.Button>
							<Radio.Button value={1}>По номеру телефона</Radio.Button>
						</Radio.Group>
					</Form.Item>

					{value ? (
						<Form.Item
							name="phone"
							rules={[
								{ type: 'string' },
								{ required: true, message: 'Please input your Phone!' }
							]}
							validateStatus={error !== null ? 'error' : undefined}
							help={error !== null ? error[0].message : ''}
						>
							<Input size="large" type="tel" placeholder="Телефон" />
						</Form.Item>
					) : (
						<Form.Item
							name="email"
							rules={[
								{ type: 'email' },
								{ required: true, message: 'Please input your Email!' }
							]}
							validateStatus={error !== null ? 'error' : undefined}
							help={error !== null ? error[0].message : ''}
						>
							<Input size="large" placeholder="Email" />
						</Form.Item>
					)}

					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
						validateStatus={error !== null ? 'error' : undefined}
						help={error !== null ? error[0].message : ''}
					>
						<Input.Password
							className={styles.password}
							size="large"
							type="password"
							placeholder="Пароль"
						/>
					</Form.Item>

					<p className={styles.forgot}>Не помню пароль</p>
					<Form.Item>
						<div className={styles.buttons}>
							<Button
								className={styles.login}
								size="large"
								type="primary"
								htmlType="submit"
							>
								Войти
							</Button>

							<Button
								className={styles.gos}
								onClick={e => {
									e.preventDefault()
								}}
								size="large"
								type="primary"
								ghost
								htmlType="submit"
							>
								Войти через
								<GosSvg />
							</Button>
							<div className={styles.reg}>
								<span>
									Нет профиля?{' '}
									<Link className={styles.link} to="/registration">
										Зарегистрируйтесь
									</Link>
								</span>
								<span className={styles.kpfu}>kpfu.ru</span>
							</div>
						</div>
					</Form.Item>
				</Form>
				<Faq />
			</div>
		</div>
	)
}
