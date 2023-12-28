import { Form, Input } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../api/types'

interface IPasswordProps {
	error: IError | null
}

export const Password: FC<IPasswordProps> = ({ error }) => {
	const { t } = useTranslation()
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')

	return (
		<>
			<Form.Item
				name="password"
				style={{ marginBottom: 30 }}
				validateStatus={
					error !== null &&
					error.details.length > 0 &&
					error.details.some(el => el.field === 'password')
						? 'error'
						: undefined
				}
				help={
					error !== null &&
					error.details.length > 0 &&
					error.details.some(el => el.field === 'password') && (
						<div>
							{error.details.map(el => {
								if (el.field === 'password') return <p>{el.message}</p>
								else return ''
							})}
						</div>
					)
				}
			>
				<Input.Password
					className="px-5 py-3"
					value={password}
					onChange={e => setPassword(e.currentTarget.value)}
					size="large"
					type="password"
					required
					placeholder={t('password')}
				/>
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				style={{ marginBottom: 30 }}
				help={
					confirm &&
					password !== confirm && (
						<p className="text-rose-500">{t('errorConfirmPassword')}</p>
					)
				}
			>
				<Input
					value={confirm}
					onChange={e => setConfirm(e.currentTarget.value)}
					size="large"
					type="password"
					className="px-5 py-3"
					required
					placeholder={t('repeatPassword')}
				/>
			</Form.Item>
		</>
	)
}
