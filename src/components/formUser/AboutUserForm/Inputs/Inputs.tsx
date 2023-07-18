import { DatePicker, DatePickerProps, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import {
	birthDay,
	country,
	name,
	patronymic,
	phone,
	surName
} from '../../../../store/reducers/FormReducers/FormReducer'

export const Inputs = ({ error }: { error: boolean }) => {
	dayjs.locale('ru')
	const dispatch = useDispatch()
	const data = useAppSelector(state => state.Form)
	const { t } = useTranslation()
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		dispatch(birthDay(dateString))
	}
	return (
		<div>
			<span className="text-sm">{t('surname')}</span>
			<Input
				id="surName"
				size="large"
				type="text"
				placeholder={t('surname')}
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.surName && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(surName(e.target.value))
				}}
				value={data.surName}
			/>

			<span className="text-sm">{t('name')}</span>
			<Input
				size="large"
				type="text"
				placeholder={t('name')}
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.name && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(name(e.target.value))
				}}
				value={data.name}
			/>

			<span className="text-sm">{t('middleName')}</span>
			<Input
				size="large"
				type="text"
				placeholder={t('middleName')}
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.patronymic && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(patronymic(e.target.value))
				}}
				value={data.patronymic !== null ? data.patronymic : ''}
			/>

			<span className="text-sm">{t('birth')}</span>
			<DatePicker
				className={clsx(
					'block mt-2 mb-4 shadow transition-all duration-500',
					error && !data.birthDay && 'border-rose-500'
				)}
				onChange={onChange}
				placeholder={t('selectDate')}
				size="large"
				format={'DD.MM.YYYY'}
				value={
					data.birthDay != null ? dayjs(data.birthDay, 'DD.MM.YYYY') : null
				}
			/>
			<span className="text-sm">{t('citizen')}</span>
			<Select
				className="block mt-2 mb-4 shadow transition-all duration-500"
				size="large"
				onChange={e => {
					dispatch(country(e))
				}}
				defaultValue={data.country}
				options={[
					{ value: 'Российская Федерация' },
					{ value: 'Бангладеш' },
					{ value: 'Ботсвана' },
					{ value: 'Белиз' },
					{ value: 'Бруней' }
				]}
			/>

			<span className="text-sm">{t('telephone')}</span>
			<Input
				size="large"
				type="text"
				maxLength={11}
				placeholder={t('telephone')}
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.phone && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(phone(e.target.value))
				}}
				value={data.phone}
			/>
		</div>
	)
}
