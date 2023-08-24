import { Form, Input } from 'antd'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	email: string
	error: IError | null
	changeEmail: (email: string) => void
}

export const Inputs: FC<IInputsProps> = ({ error, changeEmail, email }) => {
	const { t } = useTranslation()

	return (
		<>
			<Form.Item
				name="surname"
				style={{ marginBottom: 30 }}
				className={styles.input}
				validateStatus={
					error !== null &&
					error.details.length > 0 &&
					error.details.some(el => el.field === 'lastName')
						? 'error'
						: undefined
				}
				help={
					error !== null &&
					error.details.length > 0 &&
					error.details.some(el => el.field === 'lastName') && (
						<div>
							{error.details.map(el => {
								if (el.field === 'lastName') return <p>{el.message}</p>
								else return ''
							})}
						</div>
					)
				}
			>
				<Input size="large" placeholder={t('surname')} />
			</Form.Item>
			<Form.Item
				name="name"
				className={styles.input}
				style={{ marginBottom: 30 }}
				validateStatus={
					error !== null &&
					error.details.length > 0 &&
					error.details.some(el => el.field === 'firstName')
						? 'error'
						: undefined
				}
				help={
					error !== null &&
					error.details.length > 0 &&
					error.details.some(el => el.field === 'firstName') && (
						<div>
							{error.details.map(el => {
								if (el.field === 'firstName') return <p>{el.message}</p>
								else return ''
							})}
						</div>
					)
				}
			>
				<Input size="large" placeholder={t('name')} />
			</Form.Item>
			<Form.Item
				name="email"
				className={styles.input}
				style={{ marginBottom: 30 }}
				validateStatus={
					error !== null &&
					(error.details.length === 0 ||
						(error.details.length > 0 &&
							error.details.some(el => el.field === 'email')))
						? 'error'
						: undefined
				}
				help={
					error !== null &&
					((error.details.length === 0 && <div>{t('BadRegEmail')}</div>) ||
						(error.details.length > 0 &&
							error.details.some(el => el.field === 'email') && (
								<div>
									{error.details.map(el => {
										if (el.field === 'email') return <p>{el.message}</p>
										else return ''
									})}
								</div>
							)))
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
