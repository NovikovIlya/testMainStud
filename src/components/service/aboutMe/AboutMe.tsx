import {
	Button,
	ConfigProvider,
	DatePicker,
	Input,
	Radio,
	Select,
	Space,
	Typography
} from 'antd'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { RootState, useAppSelector } from '../../../store'
import {
	getFormRequest,
	putFormRequest
} from '../../../store/creators/MainCreators/AbUsUnit'
import { addCountries } from '../../../store/reducers/FormReducers/CountriesEducationReducer'
import {
	allData,
	birthDay,
	country,
	gender,
	name,
	patronymic,
	phone,
	surName
} from '../../../store/reducers/FormReducers/FormReducer'
import { useGetCountriesQuery } from '../../../store/slice/countrySlice'

export const AboutMe = () => {
	const { t, i18n } = useTranslation()
	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	const [IsError, setError] = useState<boolean>(false)
	const formData = useAppSelector((state: RootState) => state.Form)
	const dispatch = useDispatch()
	const user = JSON.parse(localStorage.getItem('userInfo') || '')
	const countryStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.countries
	)

	const getData = async () => {
		const response = await getFormRequest(dispatch)
		if (response !== null) {
			dispatch(allData(response))
		}
	}

	const setChanges = async () => {
		const IsCorrectNS = [formData.name, formData.surName].some(el =>
			/^\p{L}+$/u.test(el)
		)

		const IsCorrectPatronymic =
			/^\p{L}+$/u.test(formData.patronymic) || formData.patronymic === ''

		const IsCorrectPhone =
			/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(formData.phone)

		if (
			!IsCorrectNS ||
			!IsCorrectPatronymic ||
			!IsCorrectPhone ||
			formData.birthDay === ''
		) {
			setError(true)
		} else {
			const status = await putFormRequest(formData, dispatch)
			if (status === 403) {
				setError(true)
			} else {
				setError(false)
			}
		}
	}

	const { data: countries } = useGetCountriesQuery(i18n.language, {
		skip: SkipCountriesQuery
	})

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		if (!countryStorage) changeQuerySkip(false)
	}, [countryStorage])

	useEffect(() => {
		if (countries) {
			dispatch(addCountries(countries))
			changeQuerySkip(true)
		}
	}, [countries])

	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title level={3}>Обо мне</Typography.Title>
				<Space direction="vertical" size={'small'}>
					<Typography.Text className=" mt-10 opacity-80 text-black text-sm font-normal">
						Пол
					</Typography.Text>
					<Radio.Group
						onChange={e => dispatch(gender(e.target.value))}
						value={formData.gender}
					>
						<Radio value={'M'}>Мужской</Radio>
						<Radio value={'W'}>Женский</Radio>
					</Radio.Group>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Фамилия</Typography.Text>
					<Input
						placeholder="Фамилия"
						size="large"
						maxLength={200}
						className={clsx(
							'w-[624px] shadow ',
							IsError &&
								!/^\p{L}+$/u.test(formData.surName) &&
								'border-rose-500'
						)}
						onChange={e => dispatch(surName(e.target.value))}
						value={formData.surName}
					/>
					{IsError && !/^\p{L}+$/u.test(formData.surName) && (
						<div className="text-sm text-rose-500">{t('EmptyFolder')}</div>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Имя</Typography.Text>
					<Input
						placeholder="Имя"
						size="large"
						className={clsx(
							'w-[624px] shadow ',
							IsError && !/^\p{L}+$/u.test(formData.name) && 'border-rose-500'
						)}
						onChange={e => dispatch(name(e.target.value))}
						value={formData.name}
					/>
					{IsError && !/^\p{L}+$/u.test(formData.name) && (
						<div className="text-sm text-rose-500">{t('EmptyFolder')}</div>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Отчество</Typography.Text>
					<Input
						placeholder="Отчество"
						size="large"
						className={clsx(
							'w-[624px] shadow ',
							IsError &&
								!/^\p{L}+$/u.test(formData.patronymic) &&
								formData.patronymic !== '' &&
								'border-rose-500'
						)}
						onChange={e => dispatch(patronymic(e.target.value))}
						value={formData.patronymic}
					/>
					{IsError &&
						!/^\p{L}+$/u.test(formData.patronymic) &&
						formData.patronymic !== '' && (
							<div className="text-sm text-rose-500">{t('BadPatronymic')}</div>
						)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Дата рождения</Typography.Text>
					<ConfigProvider locale={ruPicker}>
						<DatePicker
							placeholder="Дата рождения"
							size="large"
							className={clsx(
								'w-[624px] shadow ',
								IsError && formData.birthDay === '' && 'border-rose-500'
							)}
							format={'DD.MM.YYYY'}
							onChange={e =>
								dispatch(birthDay(e == null ? '' : e?.format('YYYY-MM-DD')))
							}
							value={
								formData.birthDay === ''
									? null
									: dayjs(
											formData.birthDay.split('-').reverse().join('.'),
											'DD.MM.YYYY'
									  )
							}
						/>
					</ConfigProvider>
					{IsError && formData.birthDay === '' && (
						<div className="text-sm text-rose-500">{t('DateError')}</div>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Страна гражданства</Typography.Text>
					<Select
						placeholder="Страна гражданства"
						size="large"
						className="w-[624px] shadow "
						value={formData.countryId}
						onChange={e => dispatch(country(e))}
						options={
							countryStorage == null
								? []
								: countryStorage.map(el => ({
										value: el.id,
										label: el.shortName
								  }))
						}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Телефон</Typography.Text>
					<Input
						placeholder="+7 999 898-88-00"
						size="large"
						className={clsx(
							'w-[624px] shadow ',
							IsError &&
								!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(
									formData.phone
								) &&
								'border-rose-500'
						)}
						onChange={e => dispatch(phone(e.target.value))}
						value={formData.phone}
					/>
					{IsError &&
						!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(
							formData.phone
						) && <div className="text-sm text-rose-500">{t('BadPhone')}</div>}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Электронная почта</Typography.Text>
					<Input
						placeholder="Электронная почта"
						size="large"
						className="w-[624px] shadow "
						value={user !== '' ? user.email : ''}
					/>
				</Space>
				<Space direction="vertical" size={'small'} className="mt-4">
					<Button
						className="border-solid border-bluekfu border-[1px] text-bluekfu rounded-md"
						onClick={() => setChanges()}
					>
						Изменить
					</Button>
				</Space>
			</Space>
		</div>
	)
}
