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
import PhoneInput from 'antd-phone-input'
import FormItem from 'antd/es/form/FormItem'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../store'
import {
	useGetInfoUserQuery,
	usePostInfoUserMutation
} from '../../../store/api/formApi'
import { useGetCountriesQuery } from '../../../store/api/utilsApi'
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
import { validator } from '../../../utils/validPhone'

export const AboutMe = () => {
	const { t, i18n } = useTranslation()
	const { data: countries } = useGetCountriesQuery(i18n.language)
	const email = useAppSelector(state => state.auth.user?.email)
	const dispatch = useDispatch()
	const role = useAppSelector(state => state.auth.user?.roles)
	const [postUser] = usePostInfoUserMutation()
	const { data: userInfo, refetch } = useGetInfoUserQuery()

	const formData = useAppSelector(state => state.Form)
	const user = useAppSelector(state => state.auth.user)
	const onSubmit = () => {
		postUser(formData)
	}
	useEffect(() => {
		if (user) {
			dispatch(surName(user.firstname))
			dispatch(name(user.lastname))
		}
	}, [])
	useEffect(() => {
		refetch()
		userInfo && dispatch(allData(userInfo))
	}, [userInfo])
	console.log(formData.phone)

	if (!role) return <></>
	const isStudent = role[0].type === 'STUD'
	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title level={3}>{t('AboutMe')}</Typography.Title>
				<Space direction="vertical" size={'small'}>
					<Typography.Text className=" mt-10 opacity-80 text-black text-sm font-normal">
						{t('gender')}
					</Typography.Text>
					<Radio.Group
						disabled={isStudent}
						onChange={e => dispatch(gender(e.target.value))}
						value={formData.gender}
					>
						<Radio value={'M'}>{t('man')}</Radio>
						<Radio value={'W'}>{t('woman')}</Radio>
					</Radio.Group>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('surname')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder={t('surname')}
						size="large"
						maxLength={200}
						className="w-[624px]"
						onChange={e => dispatch(surName(e.target.value))}
						value={formData.surName}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('name')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder={t('name')}
						size="large"
						className="w-[624px]"
						onChange={e => dispatch(name(e.target.value))}
						value={formData.name}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('middleName')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder={t('middleName')}
						size="large"
						className="w-[624px]"
						onChange={e => dispatch(patronymic(e.target.value))}
						value={formData.patronymic}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('birth')}</Typography.Text>
					<ConfigProvider locale={ruPicker}>
						<DatePicker
							disabled={isStudent}
							placeholder={t('birth')}
							size="large"
							className="w-[624px]"
							format={'DD.MM.YYYY'}
							onChange={e =>
								dispatch(birthDay(!e ? '' : e.format('YYYY-MM-DD')))
							}
							value={
								formData.birthDay
									? dayjs(
											formData.birthDay.split('-').reverse().join('.'),
											'DD.MM.YYYY'
									  )
									: null
							}
						/>
					</ConfigProvider>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('citizen')}</Typography.Text>
					<Select
						disabled={isStudent}
						placeholder={t('citizen')}
						size="large"
						className="w-[624px]  rounded-lg"
						value={formData.countryId}
						onChange={e => dispatch(country(e))}
						options={
							countries == null
								? []
								: countries.map(el => ({
										value: el.id,
										label: el.shortName
								  }))
						}
					/>
				</Space>
				<Space direction="vertical" size={'small'} className="w-full">
					<Typography.Text>{t('telephone')}</Typography.Text>
					<FormItem name="phone" rules={[{ validator }]} className="w-full">
						<PhoneInput
							size="large"
							className="w-full"
							enableSearch
							onChange={e => {
								if (e.phoneNumber) dispatch(phone(e.phoneNumber.toString()))
							}}
							value={formData.phone}
						/>
					</FormItem>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('email')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder={t('email')}
						size="large"
						className="w-[624px]  "
						value={email !== '' ? email : ''}
					/>
				</Space>
				<Space
					direction="vertical"
					size={'small'}
					className={clsx('mt-4', isStudent && 'hidden')}
				>
					<Button
						className="border-solid border-bluekfu border-[1px] text-bluekfu rounded-md"
						onClick={() => onSubmit()}
					>
						{t('edit')}
					</Button>
				</Space>
			</Space>
		</div>
	)
}
