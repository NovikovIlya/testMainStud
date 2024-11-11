import { Button, Input, Radio, Select, Space, Typography } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../store'
import {
	useGetAddressQuery,
	usePostAddressMutation
} from '../../../store/api/formApi'
import { useGetCountriesQuery } from '../../../store/api/utilsApi'
import {
	allData,
	apartment,
	city,
	country,
	house,
	index,
	street
} from '../../../store/reducers/FormReducers/AddressReducer'

import { SkeletonPage } from './Skeleton'

export const Address = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const { data: countries, isLoading: isLoadingCountries } =
		useGetCountriesQuery(i18n.language)
	const {
		data: address,
		refetch,
		isLoading: isLoadingAddress
	} = useGetAddressQuery()
	const [postAddress] = usePostAddressMutation()
	const [isEdit, setIsEdit] = useState(false)
	const [isResident, setIsResident] = useState(
		address?.residenceAddress ? 0 : 1
	)
	const registrationAddressData = useAppSelector(
		state => state.Address.registrationAddress
	)
	const residenceAddressData = useAppSelector(
		state => state.Address.residenceAddress
	)
	const isStudent = role === 'STUD'
	useEffect(() => {
		address && dispatch(allData(address))
	}, [refetch, address, dispatch])
	const onSubmit = () => {
		postAddress({ residenceAddressData, registrationAddressData, isResident })
		setIsEdit(false)
	}
	if (isLoadingCountries || isLoadingAddress) return <SkeletonPage />
	return (
		<div className="m-14 radio w-full max-w-2xl">
			<Space.Compact block direction="vertical" className="gap-5">
				<Space direction="vertical" size={'small'}>
					<Typography.Title
						level={3}
						className="text-black text-2xl font-bold leading-normal"
					>
						{t('adress')}
					</Typography.Title>
					<Typography.Text ellipsis>{t('FillPassport')}</Typography.Text>
				</Space>

				<Typography.Text
					className="text-black text-sm font-bold leading-[18px]"
					ellipsis
				>
					{t('PlaceResidence')}
				</Typography.Text>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Country')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{countries?.find(
									item => item.id === registrationAddressData.countryId
								)?.shortName || '-'}
							</Typography.Text>
						</div>
					) : (
						<Select
							size="large"
							className="w-full  rounded-lg"
							value={registrationAddressData.countryId}
							onChange={e =>
								dispatch(country({ target: 'registrationAddress', country: e }))
							}
							options={
								!countries
									? []
									: countries.map(el => ({
											value: el.id,
											label: el.shortName
									  }))
							}
						/>
					)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('City')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{registrationAddressData.city || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
							size="large"
							maxLength={200}
							value={registrationAddressData.city}
							onChange={e =>
								dispatch(
									city({ target: 'registrationAddress', city: e.target.value })
								)
							}
						/>
					)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Street')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{registrationAddressData.street || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
							maxLength={200}
							size="large"
							value={registrationAddressData.street}
							onChange={e =>
								dispatch(
									street({
										target: 'registrationAddress',
										street: e.target.value
									})
								)
							}
						/>
					)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('House')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{registrationAddressData.house || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
							maxLength={5}
							size="large"
							value={registrationAddressData.house}
							onChange={e =>
								dispatch(
									house({
										target: 'registrationAddress',
										house: e.target.value
									})
								)
							}
						/>
					)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Flat')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{registrationAddressData.apartment || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
							maxLength={5}
							size="large"
							onChange={e =>
								dispatch(
									apartment({
										target: 'registrationAddress',
										apartment: e.target.value
									})
								)
							}
							value={registrationAddressData.apartment}
						/>
					)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Index')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{registrationAddressData.index || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
							size="large"
							value={registrationAddressData.index}
							onChange={e =>
								dispatch(
									index({
										target: 'registrationAddress',
										index: e.target.value
									})
								)
							}
							maxLength={6}
						/>
					)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text ellipsis>{t('MatchAddress')}</Typography.Text>
					{!isEdit ? (
						<div className=" p-2 h-10 rounded-md">
							<Typography.Text>
								{!isResident ? t('Yes') : t('No')}
							</Typography.Text>
						</div>
					) : (
						<Radio.Group
							defaultValue={0}
							onChange={() =>
								setIsResident(prevState => (prevState === 0 ? 1 : 0))
							}
							value={isResident}
						>
							<Radio value={0}>{t('Yes')}</Radio>
							<Radio value={1}>{t('No')}</Radio>
						</Radio.Group>
					)}
				</Space>
				<div className={clsx(!isResident && 'hidden', 'w-full max-w-2xl')}>
					<Space.Compact direction="vertical" block className="gap-5">
						<Typography.Text
							className="text-black text-sm font-bold leading-[18px]"
							ellipsis
						>
							{t('AddressStay')}
						</Typography.Text>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Country')}</Typography.Text>
							{!isEdit ? (
								<div className="bg-white p-2 h-10 rounded-md">
									<Typography.Text>
										{countries?.find(
											item => item.id === residenceAddressData.countryId
										)?.shortName || '-'}
									</Typography.Text>
								</div>
							) : (
								<Select
									size="large"
									className="w-full rounded-lg"
									value={residenceAddressData.countryId}
									onChange={e =>
										dispatch(
											country({
												target: 'residenceAddress',
												country: typeof e === 'string' ? 1 : e
											})
										)
									}
									options={
										countries == null
											? []
											: countries.map(el => ({
													value: el.id,
													label: el.shortName
											  }))
									}
								/>
							)}
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('City')}</Typography.Text>
							{!isEdit ? (
								<div className="bg-white p-2 h-10 rounded-md">
									<Typography.Text>
										{residenceAddressData.city || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
									maxLength={200}
									size="large"
									value={residenceAddressData.city}
									onChange={e =>
										dispatch(
											city({ target: 'residenceAddress', city: e.target.value })
										)
									}
								/>
							)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Street')}</Typography.Text>
							{!isEdit ? (
								<div className="bg-white p-2 h-10 rounded-md">
									<Typography.Text>
										{residenceAddressData.street || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
									maxLength={200}
									size="large"
									value={residenceAddressData.street}
									onChange={e =>
										dispatch(
											street({
												target: 'residenceAddress',
												street: e.target.value
											})
										)
									}
								/>
							)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('House')}</Typography.Text>
							{!isEdit ? (
								<div className="bg-white p-2 h-10 rounded-md">
									<Typography.Text>
										{residenceAddressData.house || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
									size="large"
									maxLength={5}
									value={residenceAddressData.house}
									onChange={e =>
										dispatch(
											house({
												target: 'residenceAddress',
												house: e.target.value
											})
										)
									}
								/>
							)}
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Flat')}</Typography.Text>
							{!isEdit ? (
								<div className="bg-white p-2 h-10 rounded-md">
									<Typography.Text>
										{residenceAddressData.apartment || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
									maxLength={5}
									size="large"
									value={residenceAddressData.apartment}
									onChange={e =>
										dispatch(
											apartment({
												target: 'residenceAddress',
												apartment: e.target.value
											})
										)
									}
								/>
							)}
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Index')}</Typography.Text>
							{!isEdit ? (
								<div className="bg-white p-2 h-10 rounded-md">
									<Typography.Text>
										{residenceAddressData.index || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
									size="large"
									maxLength={6}
									value={residenceAddressData.index}
									onChange={e =>
										dispatch(
											index({
												target: 'residenceAddress',
												index: e.target.value
											})
										)
									}
								/>
							)}
						</Space>
					</Space.Compact>
				</div>
				<Space
					direction="vertical"
					size={'small'}
					className={clsx('mt-4', isStudent && 'hidden')}
				>
					{!isEdit ? (
						<Button
							className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							onClick={() => {
								setIsEdit(true)
							}}
						>
							{t('edit')}
						</Button>
					) : (
						<Button
							className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							onClick={onSubmit}
						>
						 Сохранить
						</Button>
					)}
				</Space>
			</Space.Compact>
		</div>
	)
}
