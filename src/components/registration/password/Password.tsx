import { Form, Input } from 'antd'
import { AllHTMLAttributes, FC } from 'react'

import { IError } from '../../../api/types'

import styles from './Password.module.scss'

interface IPasswordProps {
	error: IError[] | null
	confirmPassword: boolean
	ErrorPrinter: (
		searchWord: string,
		error: IError[] | null
	) => AllHTMLAttributes<HTMLDivElement>
}

export const Password: FC<IPasswordProps> = ({
	error,
	confirmPassword,
	ErrorPrinter
}) => {
	return (
		<>
			<Form.Item
				name="password"
				className={styles.input}
				rules={[{ required: true, message: '' }]}
				validateStatus={
					error?.some(
						el =>
							el.message.indexOf('пароль') >= 0 ||
							el.message.indexOf('пароля') >= 0
					) || confirmPassword === false
						? 'error'
						: undefined
				}
				help={
					<>
						{ErrorPrinter('пароль', error)}
						{ErrorPrinter('пароля', error)}
					</>
				}
			>
				<Input.Password
					className={styles.password}
					size="large"
					type="password"
					placeholder="Пароль"
				/>
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				className={styles.input}
				rules={[
					{
						required: true,
						message: 'Пожалуйста, подтвердите свой пароль!'
					}
				]}
				validateStatus={confirmPassword === false ? 'error' : undefined}
				help={
					<>
						{!confirmPassword && (
							<>Поле не соответсвует указанному паролю выше</>
						)}
					</>
				}
			>
				<Input size="large" type="password" placeholder="Повторите пароль" />
			</Form.Item>
		</>
	)
}
