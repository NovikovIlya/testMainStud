import { Form, Input } from 'antd'
import React, { FC } from 'react'

import { IError } from '../../../api/types'

import styles from './Inputs.module.scss'

interface IInputsProps {
	error: IError[] | null
	value: number
}

export const Inputs: FC<IInputsProps> = ({ error, value }) => {
	return (
		<>
			<Form.Item
				name="surname"
				className={styles.input}
				rules={[
					{ type: 'string' },
					{ required: true, message: 'Пожалуйста, введите свою фамилию!' }
				]}
			>
				<Input size="large" placeholder="Фамилия" />
			</Form.Item>
			<Form.Item
				name="name"
				className={styles.input}
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
					rules={[
						{ type: 'string' },
						{ required: true, message: 'Пожалуйста, введите свой телефон!' }
					]}
					validateStatus={
						error?.some(el => el.message.substring(0, 3) === 'ema')
							? 'error'
							: undefined
					}
					help={error?.map(el =>
						el.message.substring(0, 3) === 'ema' ? (
							<div key={el.message}>{el.message}</div>
						) : (
							''
						)
					)}
				>
					<Input size="large" type="tel" placeholder="Телефон" />
				</Form.Item>
			) : (
				<Form.Item
					name="email"
					className={styles.input}
					rules={[
						{ type: 'email' },
						{
							required: true,
							message: 'Пожалуйста, введите свою электронную почту!'
						}
					]}
					validateStatus={
						error?.some(el => el.message.substring(0, 3) === 'ema')
							? 'error'
							: undefined
					}
					help={error?.map(el =>
						el.message.substring(0, 3) === 'ema' ? (
							<div key={el.message}>{el.message}</div>
						) : (
							''
						)
					)}
				>
					<Input size="large" placeholder="Электронная почта" />
				</Form.Item>
			)}
		</>
	)
}
