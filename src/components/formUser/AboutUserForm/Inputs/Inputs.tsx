import { ConfigProvider, DatePicker, Input, Select } from 'antd'
import PhoneInput from 'antd-phone-input'
import FormItem from 'antd/es/form/FormItem'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { FC, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { RootState, useAppSelector } from '../../../../store'
import { useGetCountriesQuery } from '../../../../store/api/utilsApi'
import { addCountries } from '../../../../store/reducers/FormReducers/CountriesEducationReducer'
import {
	birthDay,
	country,
	name,
	patronymic,
	phone,
	surName
} from '../../../../store/reducers/FormReducers/FormReducer'

interface IInputProps {
	IsEmpty: boolean
}

export const Inputs: FC<IInputProps> = ({ IsEmpty }) => {
	const dispatch = useDispatch()
	const info = useAppSelector(state => state.Form)
	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const { data: countries } = useGetCountriesQuery(i18n.language, {
		skip: SkipCountriesQuery
	})
	const user = useAppSelector(state => state.auth.user)
	const countryStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.countries
	)
	//@ts-ignore
	const validator = (_, { valid }) => {
		if (valid()) return Promise.resolve()
		return Promise.reject('Invalid phone number')
	}
	useLayoutEffect(() => {
		if (user) {
			dispatch(surName(user.firstname))
			dispatch(name(user.lastname))
		}
	}, [])

	useLayoutEffect(() => {
		if (countryStorage) {
			changeQuerySkip(true)
		} else {
			changeQuerySkip(false)
		}
	}, [countryStorage])

	useLayoutEffect(() => {
		if (countries) {
			dispatch(addCountries(countries))
		}
	}, [countries])

	return (
		<div className="w-full">
			<span className="text-sm">{t('surname')}</span>
			<div className="mt-2 mb-4">
				<Input
					id="surName"
					size="large"
					type="text"
					maxLength={200}
					className={clsx(
						' transition-all duration-500',
						IsEmpty && !/^\p{L}+$/u.test(info.surName) && 'border-rose-500'
					)}
					onChange={e => {
						dispatch(surName(e.target.value))
					}}
					value={info.surName}
				/>

				{IsEmpty && !/^\p{L}+$/u.test(info.surName) && (
					<span className="text-red-500 text-sm">{t('EmptyFolder')}</span>
				)}
			</div>

			<span className="text-sm">{t('name')}</span>
			<div className="mt-2 mb-4">
				<Input
					size="large"
					type="text"
					maxLength={200}
					className={clsx(
						' transition-all duration-500',
						IsEmpty && !/^\p{L}+$/u.test(info.name) && 'border-rose-500'
					)}
					onChange={e => {
						dispatch(name(e.target.value))
					}}
					value={info.name}
				/>
				{IsEmpty && !/^\p{L}+$/u.test(info.name) && (
					<span className="text-red-500 text-sm">{t('EmptyFolder')}</span>
				)}
			</div>

			<span className="text-sm">{t('middleName')}</span>
			<div className="mt-2 mb-4">
				<Input
					size="large"
					type="text"
					placeholder={t('middleName')}
					maxLength={200}
					className={clsx(
						' transition-all duration-500',
						IsEmpty &&
							!/^\p{L}+$/u.test(info.patronymic) &&
							info.patronymic !== '' &&
							'border-rose-500'
					)}
					onChange={e => {
						dispatch(patronymic(e.target.value))
					}}
					value={info.patronymic}
				/>
				{IsEmpty &&
					!/^\p{L}+$/u.test(info.patronymic) &&
					info.patronymic !== '' && (
						<span className="text-red-500 text-sm">{t('EmptyFolder')}</span>
					)}
			</div>

			<span className="text-sm">{t('birth')}</span>
			<div className="mt-2 mb-4">
				<ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
					<DatePicker
						className={clsx(
							'block  transition-all duration-500',
							IsEmpty && info.birthDay === '' && 'border-rose-500'
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
				{IsEmpty && info.birthDay === '' && (
					<span className="text-red-500 text-sm">{t('EmptyFolder')}</span>
				)}
			</div>

			<span className="text-sm">{t('citizen')}</span>

			<Select
				className="mt-2 mb-4 block  transition-all duration-500"
				size="large"
				onChange={e => {
					dispatch(country(e))
				}}
				options={
					countryStorage == null
						? []
						: countryStorage.map(el => ({ value: el.id, label: el.shortName }))
				}
				value={info.countryId}
			/>

			<span className="text-sm">{t('telephone')}</span>
			<div className="mt-2 mb-4">
				<FormItem name="phone" rules={[{ validator }]}>
					<PhoneInput
						size="large"
						enableSearch
						onChange={e => {
							if (e.phoneNumber) dispatch(phone(e.phoneNumber.toString()))
						}}
						value={info.phone}
					/>
				</FormItem>
			</div>
		</div>
	)
}
