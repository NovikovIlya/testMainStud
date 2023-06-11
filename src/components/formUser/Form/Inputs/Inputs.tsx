import { DatePicker, Form, Input } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { FC } from 'react'

import styles from './Inputs.module.scss'

interface IinputsProps {
	setValue: (data: any) => void
}

export const Inputs: FC<IinputsProps> = ({ setValue }) => {
	dayjs.locale('ru')

	return (
		<div className={styles.main}>
			<span className={styles.textStyles}>Фамилия</span>
			<Form.Item
				className="m-0"
				name="sureName"
				rules={[
					{
						required: true,
						message: 'Пожалуйста, введите вашу фамилию'
					}
				]}
			>
				<Input
					size="large"
					type="text"
					placeholder="Фамилия"
					className={styles.inputBlock}
				/>
			</Form.Item>
			<span className={styles.textStyles}>Имя</span>
			<Form.Item
				className="m-0"
				name="name"
				rules={[
					{
						required: true,
						message: 'Пожалуйста, введите ваше имя'
					}
				]}
			>
				<Input
					size="large"
					type="text"
					placeholder="Имя"
					className={styles.inputBlock}
				/>
			</Form.Item>
			<span className={styles.textStyles}>Отчество</span>
			<Form.Item
				className="m-0"
				name="patronymic"
				rules={[
					{
						required: true,
						message: 'Пожалуйста, введите ваше отчество'
					}
				]}
			>
				<Input
					size="large"
					type="text"
					placeholder="Отчество"
					className={styles.inputBlock}
				/>
			</Form.Item>
			<span className={styles.textStyles}>Дата рождения</span>
			<Form.Item
				className="m-0"
				rules={[
					{
						required: true,
						message: 'Пожалуйста, введите вашу дату рождения'
					}
				]}
			>
				<DatePicker
					onChange={value => setValue(value?.format('DD.MM.YYYY'))}
					locale={locale}
					className={styles.inputBlock}
					size="large"
					format={'DD.MM.YYYY'}
				/>
			</Form.Item>
			<span className={styles.textStyles}>Страна гражданина</span>
			<Form.Item
				className="m-0"
				name="country"
				rules={[
					{
						required: true,
						message: 'Пожалуйста, введите вашу страну'
					}
				]}
			>
				<Input
					size="large"
					type="text"
					placeholder="Страна гражданина"
					className={styles.inputBlock}
				/>
			</Form.Item>
			<span className={styles.textStyles}>Телефон</span>
			<Form.Item
				className="m-0"
				name="phone"
				rules={[
					{
						required: true,
						message: 'Пожалуйста, введите ваш номер телефона'
					}
				]}
			>
				<Input
					size="large"
					type="text"
					maxLength={11}
					placeholder="Телефон"
					className={styles.inputBlock}
				/>
			</Form.Item>
		</div>
	)
}
