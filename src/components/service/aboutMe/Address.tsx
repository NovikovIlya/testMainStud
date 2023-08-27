import { Button, Input, Radio, Select, Space, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { RootState, useAppSelector } from '../../../store'
import {
	getAbUsAddress,
	putAbUsAddress
} from '../../../store/creators/MainCreators'
import {
	allData,
	apartment,
	city,
	country,
	house,
	index,
	street
} from '../../../store/reducers/FormReducers/AddressReducer'
import { addCountries } from '../../../store/reducers/FormReducers/CountriesEducationReducer'
import { useGetCountriesQuery } from '../../../store/slice/countrySlice'

export const Address = () => {
	const { t, i18n } = useTranslation()
	const [value, setValue] = useState(0)
	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	const [IsError, setError] = useState<boolean>(false)

	const registrationAddressData = useAppSelector(
		(state: RootState) => state.Address.registrationAddress
	)
	const residenceAddressData = useAppSelector(
		(state: RootState) => state.Address.residenceAddress
	)
	const countryStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.countries
	)
	const dispatch = useDispatch()

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

	const onChange = (e: RadioChangeEvent) => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
	}

	const getData = async () => {
		const response = await getAbUsAddress(dispatch)
		if (response !== null) {
			dispatch(allData(response))
		}
	}

	const setChanges = async () => {
		const IsCorrectString = [
			residenceAddressData.city,
			residenceAddressData.street,
			registrationAddressData.city,
			registrationAddressData.street
		].some(el => !el || /^[\p{L}]+$/u.test(el))

		const IsCorrectNumber = [
			residenceAddressData.apartment,
			residenceAddressData.house,
			registrationAddressData.apartment,
			registrationAddressData.house
		].some(el => !el || /^[0-9]+$/u.test(el))

		const IsCorrectIndex = [
			residenceAddressData.index,
			registrationAddressData.index
		].some(el => !el || /^[0-9]{5,6}$/.test(el))

		if (!IsCorrectNumber || !IsCorrectString || !IsCorrectIndex) {
			console.log(IsCorrectNumber)
			console.log(IsCorrectString)
			console.log(IsCorrectIndex)
			setError(true)
		} else {
			var isNotEmpty = Object.values(residenceAddressData).some(
				el => el !== null
			)
			const status = await putAbUsAddress(
				{
					registrationAddress: registrationAddressData,
					residenceAddress:
						value === 0
							? registrationAddressData
							: isNotEmpty
							? residenceAddressData
							: null
				},
				dispatch
			)
			if (status === 403) {
				setError(true)
			} else {
				setError(false)
			}
		}
	}

	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Space direction="vertical" size={'small'}>
					<Typography.Title
						level={3}
						className="text-black text-2xl font-bold leading-normal"
					>
						Адрес
					</Typography.Title>
					<Typography.Text ellipsis>
						Заполнение полей должно выполняться согласно данным в паспорте
					</Typography.Text>
				</Space>

				<Typography.Text
					className="text-black text-sm font-bold leading-[18px]"
					ellipsis
				>
					Место постоянного жительства
				</Typography.Text>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Страна</Typography.Text>
					<Select
						placeholder="Страна гражданства"
						size="large"
						className="w-[624px] shadow "
						value={registrationAddressData.countryId}
						onChange={e =>
							dispatch(country({ target: 'registrationAddress', country: e }))
						}
						options={
							!countryStorage
								? []
								: countryStorage.map(el => ({
										value: el.id,
										label: el.shortName
								  }))
						}
					/>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Город</Typography.Text>
					<Input
						placeholder="Казань"
						size="large"
						maxLength={200}
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.city &&
								!/^[\p{L}]+$/u.test(registrationAddressData.city) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.city ? '' : registrationAddressData.city
						}
						onChange={e =>
							dispatch(
								city({ target: 'registrationAddress', city: e.target.value })
							)
						}
					/>
					{IsError &&
						registrationAddressData.city &&
						!/^[\p{L}]+$/u.test(registrationAddressData.city) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Улица</Typography.Text>
					<Input
						placeholder="Арбузова"
						maxLength={200}
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.street &&
								!/^[\p{L}]+$/u.test(registrationAddressData.street) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.street
								? ''
								: registrationAddressData.street
						}
						onChange={e =>
							dispatch(
								street({
									target: 'registrationAddress',
									street: e.target.value
								})
							)
						}
					/>
					{IsError &&
						registrationAddressData.street &&
						!/^[\p{L}]+$/u.test(registrationAddressData.street) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Дом</Typography.Text>
					<Input
						placeholder="39"
						maxLength={5}
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.house &&
								!/^[0-9]+$/.test(registrationAddressData.house) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.house
								? ''
								: registrationAddressData.house
						}
						onChange={e =>
							dispatch(
								house({ target: 'registrationAddress', house: e.target.value })
							)
						}
					/>
					{IsError &&
						registrationAddressData.house &&
						!/^[0-9]+$/.test(registrationAddressData.house) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Квартира</Typography.Text>
					<Input
						placeholder="88"
						maxLength={5}
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.apartment &&
								!/^[0-9]+$/.test(registrationAddressData.apartment) &&
								'border-rose-500'
						)}
						onChange={e =>
							dispatch(
								apartment({
									target: 'registrationAddress',
									apartment: e.target.value
								})
							)
						}
						value={
							!registrationAddressData.apartment
								? ''
								: registrationAddressData.apartment
						}
					/>
					{IsError &&
						registrationAddressData.apartment &&
						!/^[0-9]+$/.test(registrationAddressData.apartment) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Индекс</Typography.Text>
					<Input
						placeholder="456836"
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.index &&
								!/^[0-9]{5,6}$/.test(registrationAddressData.index) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.index
								? ''
								: registrationAddressData.index
						}
						onChange={e =>
							dispatch(
								index({ target: 'registrationAddress', index: e.target.value })
							)
						}
						maxLength={6}
					/>
					{IsError &&
						registrationAddressData.index &&
						!/^[0-9]{5,6}$/.test(registrationAddressData.index) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text ellipsis>
						Совпадает ли адрес регистрации с адресом фактического проживания?
					</Typography.Text>
					<Radio.Group defaultValue={0} onChange={onChange} value={value}>
						<Radio value={0}>Да</Radio>
						<Radio value={1}>Нет</Radio>
					</Radio.Group>
				</Space>
				<div className={clsx(!value && 'hidden')}>
					<Space direction="vertical" size={20}>
						<Typography.Text
							className="text-black text-sm font-bold leading-[18px]"
							ellipsis
						>
							Адрес фактического пребывания
						</Typography.Text>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Страна</Typography.Text>
							<Select
								placeholder="Страна гражданства"
								size="large"
								className="w-[624px] shadow "
								value={residenceAddressData.countryId}
								onChange={e =>
									dispatch(country({ target: 'residenceAddress', country: e }))
								}
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
							<Typography.Text>Город</Typography.Text>
							<Input
								placeholder="Казань"
								maxLength={200}
								size="large"
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData.city &&
										!/^[\p{L}]+$/u.test(residenceAddressData.city) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData.city ? '' : residenceAddressData.city
								}
								onChange={e =>
									dispatch(
										city({ target: 'residenceAddress', city: e.target.value })
									)
								}
							/>
							{IsError &&
								residenceAddressData.city &&
								!/^[\p{L}]+$/u.test(residenceAddressData.city) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Улица</Typography.Text>
							<Input
								placeholder="Арбузова"
								maxLength={200}
								size="large"
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData.street &&
										!/^[\p{L}]+$/u.test(residenceAddressData.street) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData.street
										? ''
										: residenceAddressData.street
								}
								onChange={e =>
									dispatch(
										street({
											target: 'residenceAddress',
											street: e.target.value
										})
									)
								}
							/>
							{IsError &&
								residenceAddressData.street &&
								!/^[\p{L}]+$/u.test(residenceAddressData.street) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Дом</Typography.Text>
							<Input
								placeholder="39"
								size="large"
								maxLength={5}
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData.house &&
										!/^[0-9]+$/.test(residenceAddressData.house) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData.house ? '' : residenceAddressData.house
								}
								onChange={e =>
									dispatch(
										house({ target: 'residenceAddress', house: e.target.value })
									)
								}
							/>
							{IsError &&
								residenceAddressData.house &&
								!/^[0-9]+$/.test(residenceAddressData.house) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>Квартира</Typography.Text>
							<Input
								placeholder="88"
								maxLength={5}
								size="large"
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData.apartment &&
										!/^[0-9]+$/.test(residenceAddressData.apartment) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData.apartment
										? ''
										: residenceAddressData.apartment
								}
								onChange={e =>
									dispatch(
										apartment({
											target: 'residenceAddress',
											apartment: e.target.value
										})
									)
								}
							/>
							{IsError &&
								residenceAddressData.apartment &&
								!/^[0-9]+$/.test(residenceAddressData.apartment) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>Индекс</Typography.Text>
							<Input
								placeholder="456836"
								size="large"
								maxLength={6}
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData.index &&
										!/^[0-9]{5,6}$/.test(residenceAddressData.index) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData.index ? '' : residenceAddressData.index
								}
								onChange={e =>
									dispatch(
										index({ target: 'residenceAddress', index: e.target.value })
									)
								}
							/>
							{IsError &&
								residenceAddressData.index &&
								!/^[0-9]{5,6}$/.test(residenceAddressData.index) && (
									<div className="text-sm text-rose-500">{t('BadIndex')}</div>
								)}
						</Space>
					</Space>
				</div>
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
