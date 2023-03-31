import { Form, Input, Radio, RadioChangeEvent, Typography } from 'antd'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { IRegRequest, RegFormData } from '../../api/auth/types'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { regUser } from '../../store/auth/actionCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Registration.module.scss'
import './Registration.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'
import { Password } from './password/Password'
import { Switcher } from './switcher/Switcher'

const { Title } = Typography

export const Registration: FC = () => {
	let error = useSelector((state: RootState) => state.auth.regData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const [check, setCheck] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState(true)

	let new_user: IRegRequest = {
		lastName: '',
		firstName: '',
		middleName: null,
		phone: null,
		password: '',
		email: null
	}

	const onChangeRadio = (e: RadioChangeEvent) => setValue(e.target.value)

	const onFinish = (values: RegFormData) => {
		if (values.confirmPassword !== values.password) {
			setConfirmPassword(false)
		} else {
			setConfirmPassword(true)
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
		<div className={styles.wrapper}>
			<BackMainPage />
			<div className={styles.main}>
				<Form
					name="login"
					className={styles.loginForm}
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Title className={styles.title}>Регистрация</Title>
					<Switcher setValue={setValue} />
					<Inputs error={error} value={value} />
					<Password confirmPassword={confirmPassword} error={error} />
					<Buttons check={check} setCheck={setCheck} />
				</Form>
				<Faq />
			</div>
		</div>
	)
}
