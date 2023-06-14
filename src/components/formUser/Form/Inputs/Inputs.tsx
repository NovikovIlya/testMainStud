import { DatePicker, Form, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const Inputs = () => {
	dayjs.locale('ru')
	const handleChange = (value: string) => {
		console.log(`selected ${value}`)
	}
	return (
		<div>
			<span className="text-sm">Фамилия</span>
			<Input
				size="large"
				type="text"
				placeholder="Фамилия"
				className="mt-2 mb-4"
			/>

			<span className="text-sm">Имя</span>
			<Input size="large" type="text" placeholder="Имя" className="mt-2 mb-4" />

			<span className="text-sm">Отчество</span>
			<Input
				size="large"
				type="text"
				placeholder="Отчество"
				className="mt-2 mb-4"
			/>

			<span className="text-sm">Дата рождения</span>
			<DatePicker
				className="block mt-2 mb-4"
				onChange={(e: dayjs.Dayjs | null) => {
					console.log(e?.format)
				}}
				locale={locale}
				size="large"
				format={'DD.MM.YYYY'}
			/>

			<span className="text-sm">Страна гражданина</span>
			<Select
				defaultValue="lucy"
				className="block mt-2 mb-4"
				size="large"
				onChange={handleChange}
				options={[
					{ value: 'jack', label: 'Бангладеш' },
					{ value: 'lucy', label: 'Ботсвана' },
					{ value: 'Yiminghe', label: 'Белиз' },
					{ value: 'disabled', label: 'Бруней' }
				]}
			/>

			<span className="text-sm">Телефон</span>
			<Input
				size="large"
				type="text"
				maxLength={11}
				placeholder="Телефон"
				className="mt-2 mb-4"
			/>
		</div>
	)
}
