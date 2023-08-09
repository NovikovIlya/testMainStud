import { Form, Input } from 'antd'
import React, { AllHTMLAttributes, FC } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	error: IError[] | null
	changeEmail: (email: string) => void
}

export const Inputs: FC<IInputsProps> = ({ error, changeEmail }) => {
	const { t } = useTranslation()
	return (
		<>
			<Form.Item
				name="surname"
				style={{ marginBottom: 30 }}
				className={styles.input}
				rules={[
					{ type: 'string' },
					{ required: true, message: t('errorSurnameName') }
				]}
			>
				<Input size="large" placeholder={t('surname')} />
			</Form.Item>
			<Form.Item
				name="name"
				className={styles.input}
				style={{ marginBottom: 30 }}
				rules={[
					{ type: 'string' },
					{ required: true, message: t('errorName') }
				]}
			>
				<Input size="large" placeholder={t('name')} />
			</Form.Item>
			<Form.Item
				name="Email"
				className={styles.input}
				style={{ marginBottom: 30 }}
				rules={[
					{ type: 'email', message: t('errorEmail') },
					{
						required: true,
						message: t('errorEmail')
					}
				]}
			>
				<Input
					size="large"
					placeholder={t('email')}
					onChange={e => changeEmail(e.target.value)}
				/>
			</Form.Item>
		</>
	)
}
