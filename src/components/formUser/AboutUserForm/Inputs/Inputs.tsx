import { ConfigProvider, DatePicker, Input, Select } from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { IError } from '../../../../api/types'
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

interface IInputProps {
	error: IError | null
}

export const Inputs: FC<IInputProps> = ({ error }) => {
	const dispatch = useDispatch()
	const info = useAppSelector(state => state.Form)
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const { data } = useGetCountriesQuery(i18n.language)

	return (
		<div className="w-full">
			<span className="text-sm">{t('surname')}</span>
			<p className="mt-2 mb-4">
				<Input
					id="surName"
					size="large"
					type="text"
					placeholder={t('surname')}
					className={clsx(
						'shadow transition-all duration-500',
						error !== null &&
							error.details.some(el => el.field === 'lastname') &&
							'border-rose-500'
					)}
					onChange={e => {
						dispatch(surName(e.target.value))
					}}
					value={info.surName}
				/>
				{error !== null && (
					<span className="text-red-500 text-sm">
						{error.details.map(el => {
							if (el.field === 'lastname') return <p>{el.message}</p>
							else return ''
						})}
					</span>
				)}
			</p>

			<span className="text-sm">{t('name')}</span>
			<p className="mt-2 mb-4">
				<Input
					size="large"
					type="text"
					placeholder={t('name')}
					className={clsx(
						'shadow transition-all duration-500',
						error !== null &&
							error.details.some(el => el.field === 'firstname') &&
							'border-rose-500'
					)}
					onChange={e => {
						dispatch(name(e.target.value))
					}}
					value={info.name}
				/>
				{error !== null && (
					<span className="text-red-500 text-sm">
						{error.details.map(el => {
							if (el.field === 'firstname') return <p>{el.message}</p>
							else return ''
						})}
					</span>
				)}
			</p>

			<span className="text-sm">{t('middleName')}</span>
			<p className="mt-2 mb-4">
				<Input
					size="large"
					type="text"
					placeholder={t('middleName')}
					className={clsx(
						'shadow transition-all duration-500',
						error !== null &&
							error.details.some(el => el.field === 'middlename') &&
							'border-rose-500'
					)}
					onChange={e => {
						dispatch(patronymic(e.target.value))
					}}
					value={info.patronymic}
				/>
				{error !== null && (
					<span className="text-red-500 text-sm">
						{error.details.map(el => {
							if (el.field === 'middlename') return <p>{el.message}</p>
							else return ''
						})}
					</span>
				)}
			</p>

			<span className="text-sm">{t('birth')}</span>
			<p className="mt-2 mb-4">
				<ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
					<DatePicker
						className={clsx(
							'block shadow transition-all duration-500',
							error !== null && info.birthDay === '' && 'border-rose-500'
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
				{info.birthDay === '' && error !== null && (
					<p className="text-red-500 text-sm">{t('DateError')}</p>
				)}
			</p>
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
			<p className="mt-2 mb-4">
				<Input
					size="large"
					type="text"
					maxLength={11}
					placeholder={t('telephone')}
					className={clsx(
						'shadow transition-all duration-500',
						error !== null &&
							error.details.some(el => el.field === 'phone') &&
							'border-rose-500'
					)}
					onChange={e => {
						dispatch(phone(e.target.value))
					}}
					value={info.phone}
				/>
				{error !== null && (
					<span className="text-red-500 text-sm">
						{error.details.map(el => {
							if (el.field === 'phone') return <p>{el.message}</p>
							else return ''
						})}
					</span>
				)}
			</p>
		</div>
	)
}
