import { DatePicker, DatePickerProps, Input, Select } from 'antd'
import enPicker from 'antd/lib/date-picker/locale/en_US'
import ruPicker from 'antd/lib/date-picker/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
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
	const dispatch = useDispatch()
	const data = useAppSelector(state => state.Form)
	const { t, i18n } = useTranslation()
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		dateString !== '' && dispatch(birthDay(dateString))
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
					error && data.surName === '' && 'border-rose-500'
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
					error && data.name === '' && 'border-rose-500'
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
					error && data.patronymic === '' && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(patronymic(e.target.value))
				}}
				value={data.patronymic}
			/>

			<span className="text-sm">{t('birth')}</span>
			<DatePicker
				className={clsx(
					'block mt-2 mb-4 shadow transition-all duration-500',
					error && data.birthDay === '' && 'border-rose-500'
				)}
				locale={i18n.language === 'ru' ? ruPicker : enPicker}
				onChange={onChange}
				placeholder={t('selectDate')}
				size="large"
				format={'DD.MM.YYYY'}
				value={data.birthDay !== '' ? dayjs(data.birthDay, 'DD.MM.YYYY') : null}
			/>
			<span className="text-sm">{t('citizen')}</span>
			<Select
				className="block mt-2 mb-4 shadow transition-all duration-500"
				size="large"
				onChange={e => {
					dispatch(country(e))
				}}
				defaultValue={1}
				options={[
					{ value: 1, label: 'Российская Федерация' },
					{ value: 2, label: 'Бангладеш' },
					{ value: 3, label: 'Ботсвана' },
					{ value: 4, label: 'Белиз' },
					{ value: 5, label: 'Бруней' }
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
					error && data.phone.length !== 11 && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(phone(e.target.value))
				}}
				value={data.phone}
			/>
		</div>
	)
}
