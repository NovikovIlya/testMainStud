import { Form, Input } from 'antd'
import { FC } from 'react'

import { IError } from '../../../api/auth/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	value: number
	error: IError[] | null
}

export const Inputs: FC<IInputsProps> = ({ value, error }) => {
	return (
		<>
			{value ? (
				<Form.Item
					name="phone"
					className={styles.input}
					rules={[
						{ type: 'string' },
						{ required: true, message: 'Пожалуйста, введите свой телефон!' }
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
					<Input
						className="phone"
						size="large"
						type="tel"
						placeholder="Телефон"
					/>
				</Form.Item>
			) : (
				<Form.Item
					className={styles.input}
					name="email"
					rules={[
						{ type: 'string' },
						{
							required: true,
							message: 'Пожалуйста, введите свою электронную почту!'
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
				rules={[
					{ required: true, message: 'Пожалуйста, введите свой пароль!' }
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
				<Input.Password
					className={styles.password}
					size="large"
					type="password"
					placeholder="Пароль"
				/>
			</Form.Item>
			<p className={styles.forgot}>Не помню пароль</p>
		</>
	)
}
