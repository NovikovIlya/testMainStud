import { ConfigProvider, DatePicker, Input, Select } from 'antd'
import PhoneInput from 'antd-phone-input'
import FormItem from 'antd/es/form/FormItem'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../store'
import { useGetInfoUserQuery } from '../../../store/api/formApi'
import { useGetCountriesQuery } from '../../../store/api/utilsApi'
import {
	allData,
	birthDay,
	country,
	name,
	patronymic,
	phone,
	surName
} from '../../../store/reducers/FormReducers/FormReducer'
import { validator } from '../../../utils/validPhone'

export const Inputs = () => {
	const dispatch = useDispatch()
	const { data: userInfo, refetch } = useGetInfoUserQuery()
	const { t, i18n } = useTranslation()
	const info = useAppSelector(state => state.Form)
	dayjs.locale(i18n.language)
	const { data: countries } = useGetCountriesQuery(i18n.language)
	const user = useAppSelector(state => state.auth.user)

	useEffect(() => {
		if (user) {
			dispatch(surName(user.firstname))
			dispatch(name(user.lastname))
		}
	}, [user, dispatch])
	
	useEffect(() => {
		refetch()
		userInfo && dispatch(allData(userInfo))
	}, [userInfo, dispatch, refetch])

	return (
		<div className="w-full">
			<span className="text-sm">{t('surname')}</span>
			<div className="mt-2 mb-4">
				<Input
					disabled
					id="surName"
					size="large"
					type="text"
					maxLength={200}
					onChange={e => {
						dispatch(surName(e.target.value))
					}}
					value={info.surName}
				/>
			</div>

			<span className="text-sm">{t('name')}</span>
			<div className="mt-2 mb-4">
				<Input
					disabled
					size="large"
					type="text"
					maxLength={200}
					onChange={e => {
						dispatch(name(e.target.value))
					}}
					value={info.name}
				/>
			</div>

			<span className="text-sm">{t('middleName')}</span>
			<div className="mt-2 mb-4">
				<Input
					size="large"
					type="text"
					placeholder={t('middleName')}
					maxLength={200}
					onChange={e => {
						dispatch(patronymic(e.target.value))
					}}
					value={info.patronymic}
				/>
			</div>

			<span className="text-sm">{t('birth')}</span>
			<div className="mt-2 mb-4">
				<ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
					<DatePicker
						className={'block'}
						onChange={(e: any) => dispatch(birthDay(e == null ? '' : e.format('YYYY-MM-DD')))}
						placeholder={t('selectDate')}
						size="large"
						format={'DD.MM.YYYY'}
						value={null}
					/>
				</ConfigProvider>
			</div>

			<span className="text-sm">{t('citizen')}</span>

			<Select
				className="mt-2 mb-4 block"
				size="large"
				onChange={e => {
					dispatch(country(e))
				}}
				options={countries === undefined ? [] : countries.map(el => ({ value: el.id, label: el.shortName }))}
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
