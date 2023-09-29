import { Space, Typography } from 'antd'
import { Button, DatePicker, Input, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IEducationError, IEducationState } from '../../../api/types'
import { RootState, useAppSelector } from '../../../store'
import {
	useGetCountriesQuery,
	useGetEducationLevelQuery
} from '../../../store/api/utilsApi'
import {
	addEducationItemRequest,
	deleteEducationItemRequest,
	getEducationItemRequest,
	putEducationItemRequest
} from '../../../store/creators/MainCreators'
import {
	addCountries,
	addEducations
} from '../../../store/reducers/FormReducers/CountriesEducationReducer'
import { allData } from '../../../store/reducers/FormReducers/EducationReducer'
import {
	countryId,
	documentNumber,
	documentSeries,
	educationLevelId,
	graduateYear,
	idAdd,
	nameOfInstitute,
	specialization
} from '../../../store/reducers/FormReducers/EducationReducer'
import { ImagesLayout } from '../ImagesLayout'

export const EducationForm = () => {
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	const { data: educationLevel } = useGetEducationLevelQuery(i18n.language, {
		skip: SkipCountriesQuery
	})
	const { data: countries } = useGetCountriesQuery(i18n.language, {
		skip: SkipCountriesQuery
	})
	const [IsEmpty, changeIsEmpty] = useState<boolean>(false)
	const info = useAppSelector(state => state.Education)

	useEffect(() => {
		if (educationLevel && countries) {
			dispatch(addEducations(educationLevel))
			dispatch(addCountries(countries))
			changeQuerySkip(true)
		} else {
			changeQuerySkip(false)
		}
	}, [educationLevel, countries])

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = async () => {
		if (userRole === 'SEEKER') navigate('/work')
		else navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const countriesStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.countries
	)
	const educationStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.educations
	)
	const educationData = useAppSelector(state => state.Education)

	const getData = async () => {
		const response = await getEducationItemRequest(dispatch)
		if (response !== null) {
			dispatch(allData(response))
		}
	}

	const [updateItems, setUpdate] = useState<boolean>(true)
	const [IsError, setError] = useState<IEducationError | null>(null)

	const convertToString = (field: any): string => {
		if (typeof field === 'string') {
			return field
		} else {
			return ''
		}
	}

	const checkEducationItem = (item: IEducationState): boolean => {
		var haveError = false

		var errorPattern = {
			id: item.id,
			nameOfInstitute: false,
			documentNumber: false,
			documentSeries: false,
			graduateYear: false,
			specialization: false
		}

		if (
			item.documentNumber === null ||
			(item.documentNumber !== null && !/^[0-9]{4}$/.test(item.documentNumber))
		) {
			haveError = true
			errorPattern.documentNumber = true
		}

		if (
			item.documentSeries === null ||
			(item.documentSeries !== null && !/^[0-9]{4}$/.test(item.documentSeries))
		) {
			haveError = true
			errorPattern.documentSeries = true
		}
		if (
			item.nameOfInstitute === null ||
			(item.nameOfInstitute !== null &&
				(/\s\s/.test(item.nameOfInstitute) ||
					!/^[\p{L}\s()0-9]+$/u.test(item.nameOfInstitute)))
		) {
			haveError = true
			errorPattern.nameOfInstitute = true
		}
		if (
			item.specialization === null ||
			(item.specialization !== null &&
				(/\s\s/.test(item.specialization) ||
					!/^[\p{L}\s.,]+$/u.test(item.specialization)))
		) {
			haveError = true
			errorPattern.specialization = true
		}
		if (!item.graduateYear) {
			haveError = true
			errorPattern.graduateYear = true
		}

		haveError && setError(errorPattern)
		IsError !== null && !haveError && setError(null)

		return haveError
	}

	const handleUpdateEducation = async (item: IEducationState) => {
		if (!checkEducationItem(item)) {
			const status = await putEducationItemRequest(
				item.id.toString(),
				{
					nameOfInstitute: item.nameOfInstitute,
					documentNumber: item.documentNumber,
					documentSeries: item.documentSeries,
					graduateYear: item.graduateYear,
					specialization: item.specialization,
					educationLevelId: item.educationLevelId,
					countryId: item.countryId
				},

				dispatch
			)
			if (status === 200) {
				setUpdate(true)
			} else {
				console.log('403')
			}
		}
	}

	const handleDeleteEducation = async (id: string) => {
		const response = await deleteEducationItemRequest(id, dispatch)
		if (response === 200) setUpdate(true)
		else console.log('403')
	}

	const handleAddEducation = async () => {
		const item = {
			nameOfInstitute: null,
			documentNumber: null,
			documentSeries: null,
			graduateYear: null,
			specialization: null,
			educationLevelId: 1,
			countryId: 1
		}
		const response = await addEducationItemRequest(item, dispatch)
		if (response === 200) setUpdate(true)
		else console.log('403')
	}

	useEffect(() => {
		if (educationLevel && countries) {
			dispatch(addEducations(educationLevel))
			dispatch(addCountries(countries))
			changeQuerySkip(true)
		} else {
			changeQuerySkip(false)
		}
	}, [educationLevel, countries])

	useEffect(() => {
		if (updateItems) {
			getData()
			setUpdate(false)
		}
	}, [updateItems])
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="self-start text-xl">{t('education')}</h3>
					<div className="flex flex-col gap-10 w-full">
						{educationData.map((item, index) => (
							<div key={item.id}>
								<Space>
									<Typography.Text ellipsis className="font-bold mr-3">
										{t('educationDocument')}
									</Typography.Text>
									<Typography.Text
										onClick={() => handleDeleteEducation(item.id.toString())}
										className={clsx(
											'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px] mr-3',
											index === 0 && 'hidden'
										)}
									>
										{t('Delete')}
									</Typography.Text>
									<Typography.Text
										onClick={() => handleUpdateEducation(item)}
										className={clsx(
											'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]'
										)}
									>
										{t('Save')}
									</Typography.Text>
								</Space>
								<div className="grid grid-cols-2 gap-10 mt-5 w-full max-sm:grid-cols-1 max-sm:gap-4">
									<div>
										<p>{t('higherEducational')}</p>

										<Select
											className="w-full mt-2"
											size="large"
											defaultValue={
												educationData.filter(el => el.id === item.id)[0]
													.educationLevelId
											}
											value={educationData[0].educationLevelId}
											options={
												!educationStorage
													? []
													: educationStorage.map(el => ({
															value: el.id,
															label: el.name
													  }))
											}
											onChange={e =>
												dispatch(
													educationLevelId({ id: item.id, educationLevelId: e })
												)
											}
										/>
									</div>
									<div>
										<p>{t('countryEducation')}</p>

										<Select
											className="w-full mt-2"
											size="large"
											onChange={e =>
												dispatch(
													countryId({
														id: item.id,
														countryId: e
													})
												)
											}
											options={
												countriesStorage === null
													? []
													: countriesStorage.map(el => ({
															value: el.id,
															label: el.shortName
													  }))
											}
											value={item.countryId}
										/>
									</div>
								</div>
								<p className="mt-4 self-start">{t('nameEducational')}</p>
								<div className="mt-2">
									<Input
										placeholder={t('kfu')}
										maxLength={250}
										size="large"
										className={clsx(
											'shadow ',
											IsError &&
												IsError.id === item.id &&
												IsError.nameOfInstitute &&
												'border-rose-500'
										)}
										value={convertToString(
											educationData.filter(el => el.id === item.id)[0]
												.nameOfInstitute
										)}
										onChange={e =>
											dispatch(
												nameOfInstitute({
													id: item.id,
													nameOfInstitute: e.target.value
												})
											)
										}
									/>
									{IsError &&
										IsError.id === item.id &&
										IsError.nameOfInstitute && (
											<div className="text-sm text-rose-500">
												{t('EmptyFolder')}
											</div>
										)}
								</div>
								<div className="grid grid-cols-2 mt-4 gap-x-10 gap-y-4 w-full max-sm:gap-5">
									<div>
										<p>{t('diplomaSeries')}</p>
										<div className="mt-2">
											<Input
												placeholder="0000"
												size="large"
												maxLength={4}
												className={clsx(
													'shadow ',
													IsError &&
														IsError.id === item.id &&
														IsError.documentSeries &&
														'border-rose-500'
												)}
												value={convertToString(
													educationData.filter(el => el.id === item.id)[0]
														.documentSeries
												)}
												onChange={e =>
													dispatch(
														documentSeries({
															id: item.id,
															documentSeries: e.target.value
														})
													)
												}
											/>
											{IsError &&
												IsError.id === item.id &&
												IsError.documentSeries && (
													<div className="text-sm text-rose-500">
														{t('EmptyFolder')}
													</div>
												)}
										</div>
									</div>
									<div>
										<p>{t('diplomaNumber')}</p>
										<div className="mt-2">
											<Input
												placeholder="0000"
												size="large"
												maxLength={4}
												className={clsx(
													'shadow ',
													IsError &&
														IsError.id === item.id &&
														IsError.documentNumber &&
														'border-rose-500'
												)}
												value={convertToString(
													educationData.filter(el => el.id === item.id)[0]
														.documentNumber
												)}
												onChange={e =>
													dispatch(
														documentNumber({
															id: item.id,
															documentNumber: e.target.value
														})
													)
												}
											/>
											{IsError &&
												IsError.id === item.id &&
												IsError.documentNumber && (
													<div className="text-sm text-rose-500">
														{t('EmptyFolder')}
													</div>
												)}
										</div>
									</div>
									<div>
										<p>{t('graduateYear')}</p>
										<div className="mt-2">
											<DatePicker
												className={clsx(
													'shadow w-full',
													IsError &&
														IsError.id === item.id &&
														IsError.graduateYear &&
														'border-rose-500'
												)}
												onChange={e => {
													dispatch(
														graduateYear({
															id: item.id,
															graduateYear:
																e == null ? '' : e.format('YYYY').toString()
														})
													)
												}}
												size="large"
												placeholder={new Date().getFullYear().toString()}
												picker="year"
												value={
													convertToString(
														educationData.filter(el => el.id === item.id)[0]
															.graduateYear
													) !== ''
														? dayjs(
																convertToString(
																	educationData.filter(
																		el => el.id === item.id
																	)[0].graduateYear
																),
																'YYYY'
														  )
														: null
												}
											/>
											{IsError &&
												IsError.id === item.id &&
												IsError.graduateYear && (
													<div className="text-sm text-rose-500">
														{t('DateError')}
													</div>
												)}
										</div>
									</div>
									<div>
										<p>{t('specialization')}</p>
										<div className="mt-2">
											<Input
												placeholder={t('webDesign')}
												size="large"
												className={clsx(
													'w-full shadow ',
													IsError &&
														IsError.id === item.id &&
														IsError.specialization &&
														'border-rose-500'
												)}
												value={convertToString(
													educationData.filter(el => el.id === item.id)[0]
														.specialization
												)}
												onChange={e =>
													dispatch(
														specialization({
															id: item.id,
															specialization: e.target.value
														})
													)
												}
											/>
											{IsError &&
												IsError.id === item.id &&
												IsError.specialization && (
													<div className="text-sm text-rose-500">
														{t('EmptyFolder')}
													</div>
												)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-10 flex flex-col items-center">
						<Button
							className="rounded-full text-center p-0 w-8 h-8 text-xl"
							type="primary"
							onClick={handleAddEducation}
						>
							+
						</Button>
						<p className="opacity-40 text-sm mt-2">{t('add')}</p>
						<p className="opacity-40 text-sm lowercase">{t('education')}</p>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className="w-[200px] h-[50px] font-bold rounded-full border-[#3073D7] text-[#3073D7]"
						>
							{t('back')}
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] font-bold h-[50px] rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<div className="w-full flex justify-center">
						<Button
							onClick={handleSkip}
							type="text"
							className="rounded-full w-[200px]  h-[50px] mt-8"
						>
							{t('fillLater')}
						</Button>
					</div>
				</div>
			</div>
		</ImagesLayout>
	)
}
