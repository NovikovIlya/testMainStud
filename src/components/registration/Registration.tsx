import { Form, Typography } from 'antd'
import { AllHTMLAttributes, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IError } from '../../api/types'
import logo from '../../assets/images/group.png'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { registerUser } from '../../store/creators/MainCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Registration.module.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'
import { Password } from './password/Password'

const { Title } = Typography

interface IRegForm {
	surname: string
	name: string
	email?: string
	phone?: string
	password: string
	confirmPassword: string
}

interface IRegProps {
	changeEmail: (email: string) => void
}

export const Registration: FC<IRegProps> = ({ changeEmail }) => {
	const navigate = useNavigate()
	const error = useSelector((state: RootState) => state.AuthReg.regData.error)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const [check, setCheck] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState(false)

	const onFinish = async (values: IRegForm) => {
		navigate('/registration/checkingEmail')
		if (values.confirmPassword !== values.password) {
			setConfirmPassword(false)
		} else {
			setConfirmPassword(true)
			if (values.email != null) {
				const response = await dispatch(
					registerUser({
						lastName: values.surname,
						password: values.password,
						firstName: values.name,
						email: values.email,
						agreement: 'true'
					})
				)
				if (response === 200) {
					navigate('/registration/checkingEmail')
				}
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
					<Title className={styles.title}>{t('registration')}</Title>
					<Inputs error={error} changeEmail={changeEmail} />
					<Password
						confirmPassword={confirmPassword}
						setConfirmPassword={setConfirmPassword}
					/>
					<Buttons check={check} setCheck={setCheck} />
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
