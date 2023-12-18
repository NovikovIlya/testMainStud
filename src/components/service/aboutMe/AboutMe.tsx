import {
	Button,
	Card,
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
import { useEffect, useState } from 'react'
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

import { SkeletonPage } from './Skeleton'

export const AboutMe = () => {
	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(
		i18n.language
	)
	const email = useAppSelector(state => state.auth.user?.email)
	const dispatch = useDispatch()
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const [postUser] = usePostInfoUserMutation()
	const {
		data: userInfo,
		refetch,
		isLoading: isLoadingUser
	} = useGetInfoUserQuery()
	const [isEdit, setIsEdit] = useState(true)
	const formData = useAppSelector(state => state.Form)
	const user = useAppSelector(state => state.auth.user)
	const onSubmit = () => {
		postUser(formData)
		setIsEdit(true)
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
	const isStudent = role === 'STUD'
	if (isLoadingCountry || isLoadingUser) return <SkeletonPage />
	return (
		<div className="m-14 radio w-full max-w-2xl">
			<Space.Compact block direction="vertical" className="gap-5">
				<Typography.Title level={3}>{t('AboutMe')}</Typography.Title>
				<Space direction="vertical" size={'small'} className="w-full">
					<Typography.Text className=" mt-10 opacity-80 text-black text-sm font-normal">
						{t('gender')}
					</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2 rounded-md">
							<Typography.Text>
								{formData.gender === 'M' ? t('man') : t('woman')}
							</Typography.Text>
						</div>
					) : (
						<Radio.Group
							onChange={e => dispatch(gender(e.target.value))}
							value={formData.gender}
						>
							<Radio value={'M'}>{t('man')}</Radio>
							<Radio value={'W'}>{t('woman')}</Radio>
						</Radio.Group>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('surname')}</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2 rounded-md">
							<Typography.Text>{formData.surName || '-'}</Typography.Text>
						</div>
					) : (
						<Input
							placeholder={t('surname')}
							size="large"
							maxLength={200}
							className=""
							onChange={e => dispatch(surName(e.target.value))}
							value={formData.surName}
						/>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('name')}</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2  rounded-md">
							<Typography.Text>{formData.name || '-'}</Typography.Text>
						</div>
					) : (
						<Input
							placeholder={t('name')}
							size="large"
							className=""
							onChange={e => dispatch(name(e.target.value))}
							value={formData.name}
						/>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('middleName')}</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2 rounded-md">
							<Typography.Text>{formData.patronymic || '-'}</Typography.Text>
						</div>
					) : (
						<Input
							placeholder={t('middleName')}
							size="large"
							className=""
							onChange={e => dispatch(patronymic(e.target.value))}
							value={formData.patronymic}
						/>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('birth')}</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2 rounded-md">
							<Typography.Text>{formData.birthDay || '-'}</Typography.Text>
						</div>
					) : (
						<ConfigProvider locale={ruPicker}>
							<DatePicker
								placeholder={t('birth')}
								size="large"
								className="w-full"
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
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('citizen')}</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2 rounded-md">
							<Typography.Text>
								{countries?.find(el => el.id === formData.countryId)
									?.shortName || '-'}
							</Typography.Text>
						</div>
					) : (
						<Select
							placeholder={t('citizen')}
							size="large"
							className="w-full rounded-lg"
							value={formData.countryId}
							onChange={e => dispatch(country(e))}
							options={
								countries === undefined
									? []
									: countries.map(el => ({
											value: el.id,
											label: el.shortName
									  }))
							}
						/>
					)}
				</Space>
				<Space direction="vertical" size={'small'} className="w-full">
					<Typography.Text>{t('telephone')}</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2 rounded-md">
							<Typography.Text>+{formData.phone || '-'}</Typography.Text>
						</div>
					) : (
						<FormItem name="phone" className="w-full">
							<PhoneInput
								size="large"
								className="w-full"
								enableSearch
								onChange={e => {
									const fullPhone = `${e.countryCode}${e.areaCode}${e.phoneNumber}`
									dispatch(phone(fullPhone))
								}}
								value={formData.phone}
							/>
						</FormItem>
					)}
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('email')}</Typography.Text>
					{isEdit ? (
						<div className="bg-white p-2 rounded-md">
							<Typography.Text>{email || '-'}</Typography.Text>
						</div>
					) : (
						<Input
							placeholder={t('email')}
							size="large"
							className=""
							value={email !== '' ? email : ''}
						/>
					)}
				</Space>
				<Space
					direction="vertical"
					size={'small'}
					className={clsx('mt-4', isStudent && 'hidden')}
				>
					{isEdit ? (
						<Button
							className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							onClick={() => setIsEdit(false)}
						>
							{t('edit')}
						</Button>
					) : (
						<Button
							className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							onClick={() => onSubmit()}
						>
							{t('save')}
						</Button>
					)}
				</Space>
			</Space.Compact>
		</div>
	)
}
