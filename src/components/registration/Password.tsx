import { Form, Input } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IPasswordProps } from '../../models/registration'

export const Password: FC<IPasswordProps> = ({ error }) => {
	const { t } = useTranslation()
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [passwordError, setPasswordError] = useState<string>('')
	const [confirmError, setConfirmError] = useState<string>('')

	const validatePassword = (value: string) => {
		if (!value) {
			setPasswordError(t('passwordRequired'))
			return false
		}
		if (value.length < 8 || value.length > 256) {
			setPasswordError(t('passwordLength'))
			return false
		}
		if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z]).+$/.test(value)) {
			setPasswordError(t('passwordComplexity'))
			return false
		}
		setPasswordError('')
		return true
	}

	const validateConfirm = (value: string) => {
		if (!value) {
			setConfirmError(t('confirmPasswordRequired'))
			return false
		}
		if (value !== password) {
			setConfirmError(t('errorConfirmPassword'))
			return false
		}
		setConfirmError('')
		return true
	}

	const handlePasswordChange = (value: string) => {
		setPassword(value)
		validatePassword(value)
		// Также проверяем подтверждение, если оно уже заполнено
		if (confirm) {
			validateConfirm(confirm)
		}
	}

	const handleConfirmChange = (value: string) => {
		setConfirm(value)
		validateConfirm(value)
	}

	return (
		<>
			<Form.Item
				name="password"
				style={{ marginBottom: 30 }}
				validateStatus={
					passwordError || 
					(error !== null &&
					error?.details?.length > 0 &&
					error?.details?.some(el => el.field === 'password'))
						? 'error'
						: undefined
				}
				help={
					<>
						{passwordError && (
							<p className="text-red-500 mt-1 mb-0">{passwordError}</p>
						)}
						{error !== null &&
						error?.details?.length > 0 &&
						error?.details?.some(el => el.field === 'password') && (
							<div className="text-red-500">
								{error.details.map((el, index) => {
									if (el.field === 'password') 
										return <p key={`password-error-${index}`} className="mt-1 mb-0">{el.message}</p>
									else return null
								})}
							</div>
						)}
					</>
				}
			>
				<Input.Password
					className="px-5 py-3"
					value={password}
					onChange={e => handlePasswordChange(e.currentTarget.value)}
					onBlur={e => validatePassword(e.currentTarget.value)}
					size="large"
					type="password"
					placeholder={t('password')}
				/>
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				style={{ marginBottom: 30 }}
				validateStatus={confirmError ? 'error' : undefined}
				help={
					confirmError && (
						<p className="text-red-500 mt-1 mb-0">{confirmError}</p>
					)
				}
			>
				<Input.Password
					value={confirm}
					onChange={e => handleConfirmChange(e.currentTarget.value)}
					onBlur={e => validateConfirm(e.currentTarget.value)}
					size="large"
					type="password"
					className="px-5 py-3"
					placeholder={t('repeatPassword')}
				/>
			</Form.Item>
		</>
	)
}