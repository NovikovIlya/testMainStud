import { Form, Input } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	error: IError | null
}
export const Inputs: FC<IInputsProps> = ({ error }) => {
	const { t } = useTranslation()
	const [values, changeValues] = useState({ email: '', password: '' })
	console.log(values)
	return (
		<>
			<Form.Item
				className={styles.input}
				name="email"
				style={{ marginBottom: 30 }}
				validateStatus={error !== null ? 'error' : undefined}
				help={
					error == null
						? ''
						: error.details.length > 0 && error.details[0].field === 'username'
						? error.details[0].message
						: error.error
				}
			>
				<Input
					className="email"
					type="text"
					size="large"
					placeholder="Email/Login"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				className={styles.input}
				style={{ marginBottom: 30 }}
				validateStatus={error !== null ? 'error' : undefined}
				help={
					error == null
						? ''
						: error.details.length > 0 && error.details[0].field === 'password'
						? error.details[0].message
						: error.error
				}
			>
				<Input.Password
					className={styles.password}
					size="large"
					type="password"
					placeholder={t('password')}
					value={values.password.replaceAll(' ', '6')}
					onChange={e =>
						changeValues({
							...values,
							password: e.target.value
						})
					}
				/>
			</Form.Item>
			<p className={styles.forgot}>{t('rememberPassword')}</p>
		</>
	)
}
