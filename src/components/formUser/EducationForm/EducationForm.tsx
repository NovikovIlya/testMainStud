import { Button, DatePicker, Input, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState, useAppSelector } from '../../../store'
import { setEducation } from '../../../store/creators/MainCreators'
import {
	addCountries,
	addEducations
} from '../../../store/reducers/FormReducers/CountriesEducationReducer'
import {
	countryId,
	documentNumber,
	documentSeries,
	educationLevelId,
	graduateYear,
	idAdd,
	idDelete,
	nameOfInstitute,
	specialization
} from '../../../store/reducers/FormReducers/EducationReducer'
import { useGetCountriesQuery } from '../../../store/slice/countrySlice'
import { useGetEducationLevelQuery } from '../../../store/slice/educationLevelSlice'
import { ImagesLayout } from '../ImagesLayout'

export const EducationForm = () => {
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const [SkipCountriesQuery, changeQuerySkip] = useState<{
		countries: boolean
		educations: boolean
	}>({ countries: true, educations: true })
	const { data: educationLevel } = useGetEducationLevelQuery(i18n.language, {
		skip: SkipCountriesQuery.educations
	})
	const { data: countries } = useGetCountriesQuery(i18n.language, {
		skip: SkipCountriesQuery.countries
	})
	const [IsEmpty, changeIsEmpty] = useState<boolean>(false)
	const info = useAppSelector(state => state.Education)
	const countriesStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.countries
	)
	const educationStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.educations
	)

	useEffect(() => {
		if (educationStorage) {
			changeQuerySkip({ ...SkipCountriesQuery, educations: true })
		} else {
			changeQuerySkip({ ...SkipCountriesQuery, educations: false })
		}
		if (countriesStorage) {
			changeQuerySkip({ ...SkipCountriesQuery, countries: true })
		} else {
			changeQuerySkip({ ...SkipCountriesQuery, countries: false })
		}
	}, [educationStorage, countriesStorage])

	useEffect(() => {
		if (educationLevel) {
			dispatch(addEducations(educationLevel))
			changeQuerySkip({ ...SkipCountriesQuery, educations: true })
		} else {
			changeQuerySkip({ ...SkipCountriesQuery, educations: false })
		}
		if (countries) {
			dispatch(addCountries(countries))
			changeQuerySkip({ ...SkipCountriesQuery, countries: true })
		} else {
			changeQuerySkip({ ...SkipCountriesQuery, countries: false })
		}
	}, [educationLevel, countries])

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = async () => {
		if (await IsOK()) {
			if (userRole === 'SEEKER') navigate('/work')
			else navigate('/user')
		}
	}

	const covertToString = (data: any): string => {
		if (typeof data === 'string') return data
		else return ''
	}

	const IsOK = async () => {
		let IsCorrectStrFields = info.some(item =>
			[item.nameOfInstitute, item.specialization].some(
				el => el !== null && /^[\p{L}\s()0-9]+$/u.test(el) && !/\s\s/.test(el)
			)
		)
		let IsCorrectPasswordData = info.some(item =>
			[item.documentNumber, item.documentSeries].some(
				el => el !== null && /^[0-9]{4}$/.test(el)
			)
		)
		let IsCorrectDate = info.some(item => item.graduateYear !== '')
		if (!IsCorrectStrFields || !IsCorrectPasswordData || !IsCorrectDate) {
			changeIsEmpty(true)
			return false
		}
		const requestData = info.map(({ id, ...rest }) => rest)
		const response = await setEducation({ educations: requestData }, dispatch)

		if (response === 200) return true
		else {
			if (response === 403) {
				navigate('/')
			}
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const addEducation = () => {
		dispatch(idAdd(info[info.length - 1].id + 1))
	}
	const handleDeleteEducation = (id: number) => {
		dispatch(idDelete(id))
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="self-start text-xl">{t('education')}</h3>
					<div className="flex flex-col gap-10 w-full">
						{info.map(item => (
							<div key={item.id}>
								<div className="flex self-start gap-4 mt-7">
									<p>{t('educationDocument')}</p>
									{item.id !== 0 && (
										<p
											onClick={() => handleDeleteEducation(item.id)}
											className="opacity-40 text-sm cursor-pointer"
										>
											{t('remove')}
										</p>
									)}
								</div>
								<div className="grid grid-cols-2 gap-10 mt-5 w-full max-sm:grid-cols-1 max-sm:gap-4">
									<div>
										<p>{t('higherEducational')}</p>

										<Select
											className="w-full mt-2"
											size="large"
											onChange={e =>
												dispatch(
													educationLevelId({
														id: item.id,
														educationLevelId: e
													})
												)
											}
											options={
												educationStorage === null
													? []
													: educationStorage.map(el => ({
															value: el.id,
															label: el.name
													  }))
											}
											value={item.educationLevelId}
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
											'w-full',
											IsEmpty &&
												item.nameOfInstitute !== null &&
												(!/^[\p{L}\s()0-9]+$/u.test(item.nameOfInstitute) ||
													/\s\s/.test(item.nameOfInstitute)) &&
												'border-rose-500'
										)}
										onChange={e => {
											dispatch(
												nameOfInstitute({
													id: item.id,
													nameOfInstitute: e.target.value
												})
											)
										}}
										value={covertToString(info[item.id].nameOfInstitute)}
									/>
									{IsEmpty &&
										item.nameOfInstitute !== null &&
										(!/^[\p{L}\s()0-9]+$/u.test(item.nameOfInstitute) ||
											/\s\s/.test(item.nameOfInstitute)) && (
											<span className="text-red-500 text-sm">
												{t('EmptyFolder')}
											</span>
										)}
								</div>
								<div className="grid grid-cols-2 mt-4 gap-x-10 gap-y-4 w-full max-sm:gap-5">
									<div>
										<p>{t('diplomaSeries')}</p>
										<div className="mt-2">
											<Input
												placeholder="0000"
												size="large"
												className={clsx(
													'w-full',
													IsEmpty &&
														item.documentSeries !== null &&
														!/^[0-9]{4}$/.test(item.documentSeries) &&
														'border-rose-500'
												)}
												onChange={e =>
													dispatch(
														documentSeries({
															id: item.id,
															documentSeries: e.target.value
														})
													)
												}
												value={covertToString(
													info.filter(element => element.id === item.id)[0]
														.documentSeries
												)}
												maxLength={4}
											/>
											{IsEmpty &&
												item.documentSeries !== null &&
												!/^[0-9]{4}$/.test(item.documentSeries) && (
													<span className="text-red-500 text-sm">
														{t('EmptyFolder')}
													</span>
												)}
										</div>
									</div>
									<div>
										<p>{t('diplomaNumber')}</p>
										<div className="mt-2">
											<Input
												placeholder="0000"
												size="large"
												className={clsx(
													'w-full',
													IsEmpty &&
														item.documentNumber !== null &&
														!/^[0-9]{4}$/.test(item.documentNumber) &&
														'border-rose-500'
												)}
												onChange={e =>
													dispatch(
														documentNumber({
															id: item.id,
															documentNumber: e.target.value
														})
													)
												}
												value={covertToString(info[item.id].documentNumber)}
												maxLength={4}
											/>
											{IsEmpty &&
												item.documentNumber !== null &&
												!/^[0-9]{4}$/.test(item.documentNumber) && (
													<span className="text-red-500 text-sm">
														{t('EmptyFolder')}
													</span>
												)}
										</div>
									</div>
									<div>
										<p>{t('graduateYear')}</p>
										<div className="mt-2">
											<DatePicker
												className={clsx(
													'shadow w-full',
													IsEmpty &&
														item.graduateYear === '' &&
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
													info[item.id].graduateYear !== ''
														? dayjs(info[item.id].graduateYear, 'YYYY')
														: null
												}
											/>
											{IsEmpty && item.graduateYear === '' && (
												<span className="text-red-500 text-sm">
													{t('DateError')}
												</span>
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
													'w-full',
													IsEmpty &&
														item.specialization !== null &&
														(!/^[\p{L}\s()]+$/u.test(item.specialization) ||
															/\s\s/.test(item.specialization)) &&
														'border-rose-500'
												)}
												onChange={e =>
													dispatch(
														specialization({
															id: item.id,
															specialization: e.target.value
														})
													)
												}
												value={covertToString(info[item.id].specialization)}
												maxLength={400}
											/>
											{IsEmpty &&
												item.specialization !== null &&
												(!/^[\p{L}\s()]+$/u.test(item.specialization) ||
													/\s\s/.test(item.specialization)) && (
													<span className="text-red-500 text-sm">
														{t('EmptyFolder')}
													</span>
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
							onClick={addEducation}
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
