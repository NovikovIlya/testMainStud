import {
	Button,
	Checkbox,
	Form,
	Input,
	Radio,
	RadioChangeEvent,
	Typography
} from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { IRegRequest, RegFormData } from '../../api/auth/types'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { regUser } from '../../store/auth/actionCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Registration.module.scss'
import './Registration.scss'

const { Title } = Typography

export const Registration: FC = () => {
	const error = useSelector((state: RootState) => state.auth.regData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const [check, setCheck] = useState(false)

	let new_user: IRegRequest = {
		lastName: '',
		firstName: '',
		middleName: null,
		phone: null,
		password: '',
		email: null
	}

	const onChangeRadio = (e: RadioChangeEvent) => setValue(e.target.value)

	const onChangeCheckbox = (e: CheckboxChangeEvent) =>
		setCheck(e.target.checked)

	const onFinish = (values: RegFormData) => {
		if (values?.phone) {
			dispatch(
				regUser({
					...new_user,
					lastName: values.surname,
					firstName: values.name,
					phone: values.phone,
					password: values.password
				})
			)
		}
		if (values?.email) {
			dispatch(
				regUser({
					...new_user,
					lastName: values.surname,
					firstName: values.name,
					email: values.email,
					password: values.password
				})
			)
		}
	}
	console.log(error)

	return (
		<>
			<BackMainPage />
			<div className={styles.main}>
				<Form
					name="login"
					className={styles.loginForm}
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item>
						<Title className={styles.title}>Регистрация</Title>
						<Radio.Group
							onChange={onChangeRadio}
							defaultValue={0}
							size="large"
							className={styles.switcher}
							buttonStyle="solid"
						>
							<Radio.Button value={0}>По Email</Radio.Button>
							<Radio.Button value={1}>По номеру</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						name="surname"
						className={styles.input}
						messageVariables={{ another: 'good' }}
						rules={[
							{ type: 'string' },
							{ required: true, message: 'Пожалуйста, введите свою фамилию!' }
						]}
					>
						<Input size="large" placeholder="Фамилия" />
					</Form.Item>
					<Form.Item
						name="name"
						className={styles.input}
						rules={[
							{ type: 'string' },
							{ required: true, message: 'Пожалуйста, введите свое имя!' }
						]}
					>
						<Input size="large" placeholder="Имя" />
					</Form.Item>
					{value ? (
						<Form.Item
							name="phone"
							className={styles.input}
							rules={[
								{ type: 'string' },
								{ required: true, message: 'Пожалуйста, введите свой телефон!' }
							]}
							validateStatus={error !== null ? 'error' : undefined}
							help={error?.map(el =>
								el.message.substring(0, 3) !== 'pas' ? (
									<div key={el.message}>{el.message}</div>
								) : (
									''
								)
							)}
						>
							<Input size="large" type="tel" placeholder="Телефон" />
						</Form.Item>
					) : (
						<Form.Item
							name="email"
							className={styles.input}
							rules={[
								{ type: 'email' },
								{
									required: true,
									message: 'Пожалуйста, введите свою электронную почту!'
								}
							]}
							validateStatus={error !== null ? 'error' : undefined}
							help={error?.map(el =>
								el.message.substring(0, 3) === 'ema' ? (
									<div key={el.message}>{el.message}</div>
								) : (
									''
								)
							)}
						>
							<Input size="large" placeholder="Электронная почта" />
						</Form.Item>
					)}
					<Form.Item
						name="password"
						className={styles.input}
						rules={[{ required: true, message: '' }]}
						validateStatus={error !== null ? 'error' : undefined}
						help={error?.map(el =>
							el.message.substring(0, 3) === 'pas' ? (
								<div key={el.message}>{el.message}</div>
							) : (
								''
							)
						)}
					>
						<Input size="large" type="password" placeholder="Пароль" />
					</Form.Item>
					{!error && (
						<div className={styles.passwordText}>
							Пароль должен содержать от 8 символов, буквы верхнего и нижнего
							регистра, а также цифры
						</div>
					)}
					<Form.Item
						name="confirmPassword"
						className={styles.input}
						rules={[
							{
								required: true,
								message: 'Пожалуйста, подтвердите свой пароль!'
							}
						]}
					>
						<Input
							size="large"
							type="password"
							placeholder="Повторите пароль"
						/>
					</Form.Item>
					<Form.Item>
						<div className={styles.buttons}>
							<Button size="large" type="primary" htmlType="submit">
								Далее
							</Button>
							<Checkbox
								className={styles.check}
								onChange={onChangeCheckbox}
								checked={check}
							>
								<p className={styles.termsUse}>
									Я принимаю пользовательское соглашение и даю разрешение
									порталу КФУ на обработку моих персональных данных в
									соотвествии с Федеральным законом №152-ФЗ от 27.07.2006 года
									“О персональных данных”
								</p>
							</Checkbox>
							<div className={styles.login}>
								<span>
									Уже есть профиль?{' '}
									<Link className={styles.link} to="/login">
										Войдите
									</Link>
								</span>
								<Link to={'https://kpfu.ru/'} className={styles.kpfu}>
									kpfu.ru
								</Link>
							</div>
						</div>
					</Form.Item>
				</Form>
				<Faq />
			</div>
		</>
	)
}
