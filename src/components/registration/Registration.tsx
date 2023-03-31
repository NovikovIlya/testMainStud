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
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { IRegRequest, RegFormData } from '../../api/auth/types'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { regUser } from '../../store/auth/actionCreators'
import { Base_Registration_Errors } from '../../store/auth/actionCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Registration.module.scss'
import './Registration.scss'

const { Title } = Typography

export const Registration: FC = () => {
	let error = useSelector((state: RootState) => state.auth.regData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const [check, setCheck] = useState(false)
	const [PasEq, ChangePasEq] = useState(true)
	const ShowFirst = useRef(0)

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

	useEffect(() => {
		if (ShowFirst.current === 0) {
			ShowFirst.current = 1
			dispatch(Base_Registration_Errors())
		} else {
			ShowFirst.current = 0
		}
	}, [])

	const onFinish = (values: RegFormData) => {
		if (values.confirmPassword !== values.password) {
			ChangePasEq(false)
		} else {
			ChangePasEq(true)
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
	}

	return (
		<div className="flex items-center flex-col">
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
							validateStatus={
								error?.some(el => el.message.substring(0, 3) === 'эле')
									? 'error'
									: undefined
							}
							help={error?.map(el =>
								el.message.substring(0, 3) === 'эле' ? (
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
							validateStatus={
								error?.some(el => el.message.substring(0, 3) === 'эле')
									? 'error'
									: undefined
							}
							help={error?.map(el =>
								el.message.substring(0, 3) === 'эле' ? (
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
						validateStatus={
							error?.some(
								el =>
									el.message.substring(0, 3) === 'дли' ||
									el.message.substring(0, 3) === 'пар'
							) || PasEq === false
								? 'error'
								: undefined
						}
						help={
							PasEq === false ? (
								<div>
									Пожалуйста, убедитесь, что пароль и его подтвержение равны
								</div>
							) : (
								error?.map(el =>
									el.message.substring(0, 3) === 'дли' ||
									el.message.substring(0, 3) === 'пар' ? (
										<div key={el.message}>{el.message}</div>
									) : (
										''
									)
								)
							)
						}
					>
						<Input size="large" type="password" placeholder="Пароль" />
					</Form.Item>
					{PasEq && !error && (
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
						validateStatus={
							error?.some(el => el.message.substring(0, 3) === 'pas')
								? 'error'
								: undefined
						}
						help={error?.map(el =>
							el.message.substring(0, 3) === 'pas' ? (
								<div key={el.message}>{el.message}</div>
							) : (
								''
							)
						)}
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
		</div>
	)
}
