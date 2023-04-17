import { Form, Typography } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { IRegFormData, IRegRequest } from '../../api/auth/types'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
// import { RequestForRegistration } from '../../store/creators/MainCreators'
import { DeleteRegistrationErrors } from '../../store/creators/SomeCreators'
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
	let error = useSelector((state: RootState) => state.AuthReg.regData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const [check, setCheck] = useState(false)
	const JustOnce = useRef(0)
	const [confirmPassword, setConfirmPassword] = useState(true)

	let new_user: IRegRequest = {
		lastName: '',
		firstName: '',
		middleName: null,
		phone: null,
		password: '',
		email: null
	}

	useEffect(() => {
		if (JustOnce.current === 0) {
			JustOnce.current = 1
			dispatch(DeleteRegistrationErrors())
		} else {
			JustOnce.current = 0
		}
	}, [])

	const onFinish = (values: IRegFormData) => {
		if (values.confirmPassword !== values.password) {
			setConfirmPassword(false)
		} else {
			// setConfirmPassword(true)
			// if (values?.phone) {
			// 	dispatch(
			// 		RequestForRegistration({
			// 			...new_user,
			// 			lastName: values.surname,
			// 			firstName: values.name,
			// 			phone: values.phone,
			// 			password: values.password
			// 		})
			// 	)
			// }
			// if (values?.email) {
			// 	dispatch(
			// 		RequestForRegistration({
			// 			...new_user,
			// 			lastName: values.surname,
			// 			firstName: values.name,
			// 			email: values.email,
			// 			password: values.password
			// 		})
			// 	)
			// }
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
