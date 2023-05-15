import { Form, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IRegFormData } from '../../api/types'
import logo from '../../assets/images/group.webp'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
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
	const error = useSelector((state: RootState) => state.AuthReg.regData.error)
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)
	const [check, setCheck] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState(true)

	useEffect(() => {
		if (error !== null) {
			dispatch(DeleteRegistrationErrors())
		}
	}, [dispatch, error])

	const onFinish = (values: IRegFormData) => {
		if (values.confirmPassword !== values.password) setConfirmPassword(false)
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
				<img className={styles.img} src={logo} alt="group" />
				<Faq />
			</div>
		</div>
	)
}
