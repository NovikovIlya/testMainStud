import { DatePicker, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { FC } from 'react'

import { IformCompProps } from '../../../../api/types'

export const Inputs: FC<IformCompProps> = ({ changeForm, formData }) => {
	dayjs.locale('ru')
	return (
		<div>
			<span className="text-sm">Фамилия</span>
			<Input
				id="surName"
				size="large"
				type="text"
				placeholder="Фамилия"
				className="mt-2 mb-4"
				onChange={e => {
					console.log(formData)
					changeForm({
						...formData,
						surName: e.target.value
					})
				}}
			/>

			<span className="text-sm">Имя</span>
			<Input
				size="large"
				type="text"
				placeholder="Имя"
				className="mt-2 mb-4"
				onChange={e => {
					changeForm({
						...formData,
						name: e.target.value
					})
				}}
			/>

			<span className="text-sm">Отчество</span>
			<Input
				size="large"
				type="text"
				placeholder="Отчество"
				className="mt-2 mb-4"
				onChange={e => {
					changeForm({
						...formData,
						patronymic: e.target.value
					})
				}}
			/>

			<span className="text-sm">Дата рождения</span>
			<DatePicker
				className="block mt-2 mb-4"
				locale={locale}
				size="large"
				format={'DD.MM.YYYY'}
				onChange={e => {
					if (e != null) {
						changeForm({
							...formData,
							birthDay: e.format('DD.MM.YYYY')
						})
					}
				}}
			/>
			<span className="text-sm">Страна гражданина</span>
			<Select
				defaultValue="Бангладеш"
				className="block mt-2 mb-4"
				size="large"
				onChange={e => {
					changeForm({
						...formData,
						country: e
					})
				}}
				options={[
					{ value: 'Бангладеш' },
					{ value: 'Ботсвана' },
					{ value: 'Белиз' },
					{ value: 'Бруней' }
				]}
			/>

			<span className="text-sm">Телефон</span>
			<Input
				size="large"
				type="text"
				maxLength={11}
				placeholder="Телефон"
				className="mt-2 mb-4"
				onChange={e => {
					changeForm({
						...formData,
						phoneNumber: e.target.value
					})
				}}
			/>
		</div>
	)
}
