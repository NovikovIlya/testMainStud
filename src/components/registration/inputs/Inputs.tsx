import { Form, Input } from 'antd'
import React, { AllHTMLAttributes, FC } from 'react'

import { IError } from '../../../api/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	error: IError[] | null
	value: number
	ErrorPrinter: (
		searchWord: string,
		error: IError[] | null
	) => AllHTMLAttributes<HTMLDivElement>
	changeEmail: (email: string) => void
}

export const Inputs: FC<IInputsProps> = ({
	error,
	value,
	ErrorPrinter,
	changeEmail
}) => {
	return (
		<>
			<Form.Item
				name="surname"
				style={{ marginBottom: 30 }}
				className={styles.input}
				rules={[
					{ type: 'string' },
					{ required: true, message: 'Пожалуйста, введите свою фамилию!' }
				]}
				validateStatus={
					error?.some(el => el.message.indexOf('фамилия') >= 0)
						? 'error'
						: undefined
				}
				help={<>{ErrorPrinter('фам', error)}</>}
			>
				<Input size="large" placeholder="Фамилия" />
			</Form.Item>
			<Form.Item
				name="name"
				className={styles.input}
				style={{ marginBottom: 30 }}
				rules={[
					{ type: 'string' },
					{ required: true, message: 'Пожалуйста, введите свое имя!' }
				]}
			>
				<Input size="large" placeholder="Имя" />
			</Form.Item>
			{value ? (
				<Form.Item
					name="phone"
					className={styles.input}
					style={{ marginBottom: 30 }}
					rules={[
						{ type: 'string' },
						{ required: true, message: 'Пожалуйста, введите свой телефон!' }
					]}
					validateStatus={
						error?.some(el => el.message.indexOf('имя') >= 0)
							? 'error'
							: undefined
					}
					help={<>{ErrorPrinter('имя', error)}</>}
				>
					<Input size="large" type="tel" placeholder="Телефон" />
				</Form.Item>
			) : (
				<Form.Item
					name="email"
					className={styles.input}
					style={{ marginBottom: 30 }}
					rules={[
						{ type: 'email' },
						{
							required: true,
							message: 'Пожалуйста, введите свою электронную почту!'
						}
					]}
					validateStatus={
						error?.some(
							el =>
								el.message.indexOf('почты') >= 0 ||
								el.message.indexOf('e-mail') >= 0
						)
							? 'error'
							: undefined
					}
					help={
						<>
							<>{ErrorPrinter('почты', error)}</>
							<>{ErrorPrinter('e-mail', error)}</>
						</>
					}
				>
					<Input
						size="large"
						placeholder="Электронная почта"
						onChange={e => changeEmail(e.target.value)}
					/>
				</Form.Item>
			)}
		</>
	)
}
