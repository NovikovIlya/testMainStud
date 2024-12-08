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
import { useLocalStorageState } from 'ahooks'

export const Address = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const { data: countries, isLoading: isLoadingCountries } =useGetCountriesQuery(i18n.language)
	const {data: address,refetch,isLoading: isLoadingAddress,isSuccess} = useGetAddressQuery()
	const [acceptedData,setAcceptedData] = useLocalStorageState<any>('acceptedData',{defaultValue:null})
    const [typeAcc, _] = useLocalStorageState<any>('typeAcc',{  defaultValue: 'STUD',});
	const [postAddress] = usePostAddressMutation()
	const [isEdit, setIsEdit] = useState(false)
	const [isResident, setIsResident] = useState(0)
	const registrationAddress = useAppSelector(state => state.Address.registrationAddress)
	const residenceAddress = useAppSelector(state => state.Address.residenceAddress)
	console.log('isResident',isResident)
	const isChanged = typeAcc === 'OTHER' ||  (typeAcc === 'ABITUR' && !acceptedData[0])
	
	useEffect(()=>{
		if(isSuccess){
			const isEqual = JSON.stringify(address?.residenceAddress) === JSON.stringify(address?.registrationAddress)
			if(isEqual){
				setIsResident(0)
				return
			}
			const isNullresidenceAddress = Object.values(address?.residenceAddress).every((item:any)=>!item)
			setIsResident(isNullresidenceAddress ? 0 : 1)

		}
	},[isSuccess])

	useEffect(() => {
		address && dispatch(allData(address))
	}, [refetch, address, dispatch])

	const onSubmit = () => {
		postAddress(
			{ 
				residenceAddress: isResident  ? residenceAddress : null, 
				registrationAddress, 
				isResident 
			})
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
									item => item.id === registrationAddress.countryId
								)?.shortName || '-'}
							</Typography.Text>
						</div>
					) : (
						<Select
							
							size="large"
							className="w-full  rounded-lg"
							value={registrationAddress.countryId}
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
								{registrationAddress.city || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
							required
							size="large"
							maxLength={200}
							value={registrationAddress.city}
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
								{registrationAddress.street || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
						required
							maxLength={200}
							size="large"
							value={registrationAddress.street}
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
								{registrationAddress.house || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
						required
							maxLength={5}
							size="large"
							value={registrationAddress.house}
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
								{registrationAddress.apartment || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
						required
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
							value={registrationAddress.apartment}
						/>
					)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Index')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{registrationAddress.index || '-'}
							</Typography.Text>
						</div>
					) : (
						<Input
						required
							size="large"
							value={registrationAddress.index}
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
							<div className='text-red-500'>Чтобы данные сохранились, заполните форму ниже</div>
						</Typography.Text>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Country')}</Typography.Text>
							{!isEdit ? (
								<div className="bg-white p-2 h-10 rounded-md">
									<Typography.Text>
										{countries?.find(
											item => item.id === residenceAddress.countryId
										)?.shortName || '-'}
									</Typography.Text>
								</div>
							) : (
								<Select
								
									size="large"
									className="w-full rounded-lg"
									value={residenceAddress.countryId}
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
										{residenceAddress.city || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
								required
									maxLength={200}
									size="large"
									value={residenceAddress.city}
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
										{residenceAddress.street || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
								required
									maxLength={200}
									size="large"
									value={residenceAddress.street}
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
										{residenceAddress.house || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
								required
									size="large"
									maxLength={5}
									value={residenceAddress.house}
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
										{residenceAddress.apartment || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
								required
									maxLength={5}
									size="large"
									value={residenceAddress.apartment}
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
										{residenceAddress.index || '-'}
									</Typography.Text>
								</div>
							) : (
								<Input
								required
									size="large"
									maxLength={6}
									value={residenceAddress.index}
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
					className={clsx('mt-4', !isChanged && 'hidden')}
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
