import { Form, Input } from 'antd'
import { AllHTMLAttributes, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Password.module.scss'

interface IPasswordProps {
	confirmPassword: boolean
	setConfirmPassword: (value: boolean) => void
}

export const Password: FC<IPasswordProps> = ({
	confirmPassword,
	setConfirmPassword
}) => {
	const { t } = useTranslation()
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	useEffect(() => {
		if (password.trim() === confirm.trim() && password) setConfirmPassword(true)
		else setConfirmPassword(false)
	}, [password, confirm])
	return (
		<>
			<Input.Password
				className={styles.password}
				value={password}
				onChange={e => setPassword(e.currentTarget.value)}
				size="large"
				type="password"
				placeholder={t('password')}
			/>
			<Form.Item
				name="password"
				style={{ marginBottom: 30 }}
				className={styles.input}
				rules={[
					{ required: true, message: t('errorPassword') },
					{ min: 6, message: t('errorMinLength') }
				]}
			></Form.Item>
			<Input
				value={confirm}
				onChange={e => setConfirm(e.currentTarget.value)}
				size="large"
				type="password"
				placeholder={t('repeatPassword')}
			/>
			<Form.Item
				name="confirmPassword"
				className={styles.input}
				style={{ marginBottom: 30 }}
				rules={[
					{
						required: true,
						message: t('errorPassword')
					}
				]}
				help={
					!confirmPassword &&
					confirm && (
						<p className="text-rose-500">{t('errorConfirmPassword')}</p>
					)
				}
			></Form.Item>
		</>
	)
}
