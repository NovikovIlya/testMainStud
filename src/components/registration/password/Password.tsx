import { Form, Input } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Password.module.scss'

interface IPasswordProps {
	confirmPassword: boolean
	setConfirmPassword: (value: boolean) => void
	error: IError | null
}

export const Password: FC<IPasswordProps> = ({
	confirmPassword,
	setConfirmPassword,
	error
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
			<Form.Item
				name="password"
				style={{ marginBottom: 30 }}
				className={styles.input}
				validateStatus={error !== null ? 'error' : undefined}
				help={
					error == null ? (
						''
					) : error.details.length > 0 ? (
						<div>
							{error.details.map(el => {
								if (el.field === 'password') return <p>{el.message}</p>
								else return ''
							})}
						</div>
					) : (
						error.error
					)
				}
			>
				<Input.Password
					className={styles.password}
					value={password}
					onChange={e => setPassword(e.currentTarget.value)}
					size="large"
					type="password"
					placeholder={t('password')}
				/>
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				className={styles.input}
				style={{ marginBottom: 30 }}
				help={
					!confirmPassword &&
					confirm && (
						<p className="text-rose-500">{t('errorConfirmPassword')}</p>
					)
				}
			>
				<Input
					value={confirm}
					onChange={e => setConfirm(e.currentTarget.value)}
					size="large"
					type="password"
					placeholder={t('repeatPassword')}
				/>
			</Form.Item>
		</>
	)
}
