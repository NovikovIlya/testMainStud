import { Form, Typography } from 'antd'
import { AllHTMLAttributes, FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { IError } from '../../api/types'
import logo from '../../assets/images/group.webp'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { registerUser } from '../../store/creators/MainCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Registration.module.scss'
import './Registration.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'
import { Password } from './password/Password'
import { Switcher } from './switcher/Switcher'

const { Title } = Typography

interface IRegForm {
	surname: string
	name: string
	email?: string
	phone?: string
	password: string
	confirmPassword: string
}

export const Registration: FC = () => {
	const error = useSelector((state: RootState) => state.AuthReg.regData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const [check, setCheck] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState(true)

	const onFinish = (values: IRegForm) => {
		values.email == null
			? console.log('phone')
			: dispatch(
					registerUser({
						lastName: values.surname,
						password: values.password,
						firstName: values.name,
						email: values.email,
						agreement: 'true'
					})
			  )
		if (values.confirmPassword !== values.password) setConfirmPassword(false)
		else setConfirmPassword(true)
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
					<Inputs error={error} value={value} ErrorPrinter={ErrorPrinter} />
					<Password
						confirmPassword={confirmPassword}
						error={error}
						ErrorPrinter={ErrorPrinter}
					/>
					<Buttons check={check} setCheck={setCheck} />
				</Form>
				<img className={styles.img} src={logo} alt="group" />
				<Faq />
			</div>
		</div>
	)
}

const ErrorPrinter = (
	searchWord: string,
	error: IError[] | null
): AllHTMLAttributes<HTMLDivElement> => {
	if (error == null) {
		return <></>
	}
	return (
		<>
			{error.map(el => {
				if (el.message.indexOf(searchWord) >= 0)
					return <div key={el.message}>{el.message}</div>
				else return null
			})}
		</>
	)
}
