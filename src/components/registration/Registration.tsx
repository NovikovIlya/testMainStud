import { Form, Typography } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IError, IRegForm } from '../../api/types'
import logo from '../../assets/images/group.png'
import { RootState } from '../../store'
import { useRegisterMutation } from '../../store/api/authApiSlice'
import { BackMainPage } from '../back-main-page/BackMainPage'
import { Faq } from '../faq/Faq'

import styles from './Registration.module.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'
import { Password } from './password/Password'

const { Title } = Typography

interface IRegProps {
	changeEmail: (email: string) => void
	email: string
}

export const Registration: FC<IRegProps> = ({ changeEmail, email }) => {
	const navigate = useNavigate()
	const [error, setError] = useState<IError | null>(null)

	const { t } = useTranslation()
	const [check, setCheck] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState(false)

	const [register] = useRegisterMutation()

	const onFinish = async (values: IRegForm) => {
		try {
			const regData = await register({
				lastName: values.surname,
				password: values.password,
				firstName: values.name,
				email: values.email,
				agreement: 'true'
			}).unwrap()
			navigate('/registration/checkingEmail')
		} catch (e: any) {
			setError(e.data)
			console.error(e)
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
					<Inputs email={email} error={error} changeEmail={changeEmail} />
					<Password
						error={error}
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
