import { Form, Input } from 'antd'
import { FC } from 'react'

import { IError } from '../../../api/types'

import styles from './Password.module.scss'

interface IPasswordProps {
	error: IError[] | null
	confirmPassword: boolean
}

export const Password: FC<IPasswordProps> = ({ error, confirmPassword }) => {
	return (
		<>
			<Form.Item
				name="password"
				className={styles.input}
				rules={[{ required: true, message: '' }]}
				validateStatus={
					error?.some(el => el.message.substring(0, 3) === 'pas') ||
					confirmPassword === false
						? 'error'
						: undefined
				}
				help={
					confirmPassword === false ? (
						<div>
							Пожалуйста, убедитесь, что пароль и его подтвержение равны
						</div>
					) : (
						error?.map(el =>
							el.message.substring(0, 3) === 'pas' ? (
								<div key={el.message}>{el.message}</div>
							) : (
								''
							)
						)
					)
				}
			>
				<Input.Password
					className={styles.password}
					size="large"
					type="password"
					placeholder="Пароль"
				/>
			</Form.Item>
			{confirmPassword && !error && (
				<div className={styles.passwordText}>
					Пароль должен содержать от 8 символов, буквы верхнего и нижнего
					регистра, а также цифры
				</div>
			)}
			<Form.Item
				name="confirmPassword"
				className={styles.input}
				rules={[
					{
						required: true,
						message: 'Пожалуйста, подтвердите свой пароль!'
					}
				]}
				validateStatus={
					error?.some(el => el.message.substring(0, 3) === 'pas')
						? 'error'
						: undefined
				}
				help={error?.map(el =>
					el.message.substring(0, 3) === 'pas' ? (
						<div key={el.message}>{el.message}</div>
					) : (
						''
					)
				)}
			>
				<Input size="large" type="password" placeholder="Повторите пароль" />
			</Form.Item>
		</>
	)
}
