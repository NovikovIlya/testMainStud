import { ConfigProvider, DatePicker, Input, Select } from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { IError, IUserData } from '../../../../api/types'
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
	IsEmpty: boolean
}

export const Inputs: FC<IInputProps> = ({ IsEmpty }) => {
	const dispatch = useDispatch()
	const info = useAppSelector(state => state.Form)
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const { data } = useGetCountriesQuery(i18n.language)

	const userData: IUserData = JSON.parse(localStorage.getItem('userInfo') || '')

	const InitDefaultValues = (infoUser: IUserData) => {
		infoUser.birthday !== '' && dispatch(birthDay(infoUser.birthday))
		infoUser.firstname !== '' && dispatch(name(infoUser.firstname))
		infoUser.lastname !== '' && dispatch(surName(infoUser.lastname))
		infoUser.middlename !== '' && dispatch(patronymic(infoUser.middlename))
	}

	useEffect(() => {
		if (localStorage.getItem('userInfo') !== null) {
			InitDefaultValues(userData)
		}
	}, [])

	return (
		<div className="w-full">
			<span className="text-sm">{t('surname')}</span>
			<div className="mt-2 mb-4">
				<Input
					id="surName"
					size="large"
					type="text"
					placeholder={t('surname')}
					maxLength={200}
					className={clsx(
						'shadow transition-all duration-500',
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
					placeholder={t('name')}
					maxLength={200}
					className={clsx(
						'shadow transition-all duration-500',
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
						'shadow transition-all duration-500',
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
							'block shadow transition-all duration-500',
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
				className="mt-2 mb-4 block shadow transition-all duration-500"
				size="large"
				onChange={e => {
					dispatch(country(e))
				}}
				options={
					data == null
						? []
						: data.map(el => ({ value: el.id, label: el.shortName }))
				}
				value={info.countryId}
			/>

			<span className="text-sm">{t('telephone')}</span>
			<div className="mt-2 mb-4">
				<Input
					size="large"
					type="text"
					maxLength={16}
					placeholder={'+7 999 898-88-00'}
					className={clsx(
						'shadow transition-all duration-500',
						IsEmpty &&
							!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(
								info.phone
							) &&
							'border-rose-500'
					)}
					onChange={e => {
						dispatch(phone(e.target.value))
					}}
					value={info.phone}
				/>
				{IsEmpty &&
					!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(
						info.phone
					) && <span className="text-red-500 text-sm">{t('BadPhone')}</span>}
			</div>
		</div>
	)
}
