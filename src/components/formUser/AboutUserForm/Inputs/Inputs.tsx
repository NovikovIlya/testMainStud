import { ConfigProvider, DatePicker, Input, Select } from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
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
import { useGetCountriesQuery } from '../../../../store/slice/countrySlice'

export const Inputs = ({ error }: { error: boolean }) => {
	const dispatch = useDispatch()
	const info = useAppSelector(state => state.Form)
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const { data } = useGetCountriesQuery(i18n.language)

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
					error && info.surName === '' && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(surName(e.target.value))
				}}
				value={info.surName}
			/>

			<span className="text-sm">{t('name')}</span>
			<Input
				size="large"
				type="text"
				placeholder={t('name')}
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && info.name === '' && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(name(e.target.value))
				}}
				value={info.name}
			/>

			<span className="text-sm">{t('middleName')}</span>
			<Input
				size="large"
				type="text"
				placeholder={t('middleName')}
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && info.patronymic === '' && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(patronymic(e.target.value))
				}}
				value={info.patronymic}
			/>

			<span className="text-sm">{t('birth')}</span>
			<ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
				<DatePicker
					className={clsx(
						'block mt-2 mb-4 shadow transition-all duration-500',
						error && info.birthDay === '' && 'border-rose-500'
					)}
					onChange={e =>
						dispatch(birthDay(e == null ? '' : e?.format('YYYY-MM-DD')))
					}
					placeholder={t('selectDate')}
					size="large"
					format={'DD.MM.YYYY'}
					value={
						info.birthDay !== ''
							? dayjs(
									info.birthDay.split('-').reverse().join('.'),
									'DD.MM.YYYY'
							  )
							: null
					}
				/>
			</ConfigProvider>
			<span className="text-sm">{t('citizen')}</span>
			<Select
				className="block mt-2 mb-4 shadow transition-all duration-500"
				size="large"
				onChange={e => {
					dispatch(country(e))
				}}
				defaultValue={1}
				options={
					data == null
						? []
						: data.map(el => ({ value: el.id, label: el.shortName }))
				}
			/>

			<span className="text-sm">{t('telephone')}</span>
			<Input
				size="large"
				type="text"
				maxLength={11}
				placeholder={t('telephone')}
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && info.phone.length !== 11 && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(phone(e.target.value))
				}}
				value={info.phone}
			/>
		</div>
	)
}
