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
	return (
		<>
			<Form.Item
				className={styles.input}
				name="email"
				style={{ marginBottom: 30 }}
				validateStatus={error !== null ? 'error' : undefined}
				help={error !== null && <div>{t('LoginError')}</div>}
			>
				<Input
					className="email"
					maxLength={100}
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
				help={error !== null && <div>{t('LoginError')}</div>}
			>
				<Input.Password
					className={styles.password}
					size="large"
					maxLength={100}
					type="password"
					placeholder={t('password')}
				/>
			</Form.Item>
			<p className={styles.forgot}>{t('rememberPassword')}</p>
		</>
	)
}
