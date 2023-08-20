import { Form, Input } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	error: IError | null
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
				validateStatus={error !== null ? 'error' : undefined}
				help={
					error == null ? (
						''
					) : error.details.length > 0 ? (
						<div>
							{error.details.map(el => {
								if (el.field === 'lastName') return <p>{el.message}</p>
								else return ''
							})}
						</div>
					) : (
						error.error
					)
				}
			>
				<Input size="large" placeholder={t('surname')} />
			</Form.Item>
			<Form.Item
				name="name"
				className={styles.input}
				style={{ marginBottom: 30 }}
				validateStatus={error !== null ? 'error' : undefined}
				help={
					error == null ? (
						''
					) : error.details.length > 0 ? (
						<div>
							{error.details.map(el => {
								if (el.field === 'firstName') return <p>{el.message}</p>
								else return ''
							})}
						</div>
					) : (
						error.error
					)
				}
			>
				<Input size="large" placeholder={t('name')} />
			</Form.Item>
			<Form.Item
				name="email"
				className={styles.input}
				style={{ marginBottom: 30 }}
				validateStatus={error !== null ? 'error' : undefined}
				help={
					error == null ? (
						''
					) : error.details.length > 0 ? (
						<div>
							{error.details.map(el => {
								if (el.field === 'email') return <p>{el.message}</p>
								else return ''
							})}
						</div>
					) : (
						error.error
					)
				}
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
