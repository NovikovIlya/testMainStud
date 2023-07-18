import { Form, Input } from 'antd';
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	value: number
	error: IError[] | null
}

export const Inputs: FC<IInputsProps> = ({ value, error }) => {
	const { t } = useTranslation()
	return (
		<>
			{value ? (
				<Form.Item
					name="phone"
					className={styles.input}
					rules={[
						{ type: 'string' },
						{ required: true, message: t('errorPhone') }
					]}
					style={{ marginBottom: 30 }}
					validateStatus={error !== null ? 'error' : undefined}
					help={error?.map(el =>
						el.message.substring(0, 3) !== 'pas' ? (
							<div key={el.message}>{el.message}</div>
						) : (
							''
						)
					)}
				>
					<Input
						className="phone"
						size="large"
						type="tel"
						placeholder={t('telephone')}
					/>
				</Form.Item>
			) : (
				<Form.Item
					className={styles.input}
					name="email"
					style={{ marginBottom: 30 }}
					rules={[
						{ type: 'string' },
						{
							required: true,
							message: t('errorEmail')
						}
					]}
					validateStatus={error !== null ? 'error' : undefined}
					help={error?.map(el =>
						el.message.substring(0, 3) !== 'pas' ? (
							<div key={el.message}>{el.message}</div>
						) : (
							''
						)
					)}
				>
					<Input className="email" size="large" placeholder="Email" />
				</Form.Item>
			)}

			<Form.Item
				name="password"
				className={styles.input}
				style={{ marginBottom: 30 }}
				rules={[{ required: true, message: t('errorPassword') }]}
				validateStatus={error !== null ? 'error' : undefined}
				help={error?.map(el =>
					el.message.substring(0, 3) !== 'pas' ? (
						<div key={el.message}>{el.message}</div>
					) : (
						''
					)
				)}
			>
				<Input.Password
					className={styles.password}
					size="large"
					type="password"
					placeholder={t('password')}
				/>
			</Form.Item>
			<p className={styles.forgot}>{t('rememberPassword')}</p>
		</>
	)
}