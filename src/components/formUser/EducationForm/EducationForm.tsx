import { Button, DatePicker, DatePickerProps, Input, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
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
	const { data: educationLevel } = useGetEducationLevelQuery(i18n.language)
	const { data: countries } = useGetCountriesQuery(i18n.language)
	const [error, setError] = useState(false)
	const info = useAppSelector(state => state.Education)

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			if (userRole === 'SEEKER') navigate('/work')
			else navigate('/user')
		} else {
			setError(true)
		}
	}
	const saveInStore = () => {
		let IsEmpty = info.some(
			item =>
				item.documentNumber === '' ||
				item.documentSeries === '' ||
				item.nameOfInstitute === '' ||
				item.graduateYear === '' ||
				item.specialization === ''
		)
		return IsEmpty
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
											className="block mt-2"
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
												educationLevel == null
													? []
													: educationLevel.map(el => ({
															value: el.id,
															label: el.name
													  }))
											}
											value={
												info.filter(element => element.id === item.id)[0]
													.educationLevelId
											}
										/>
									</div>
									<div>
										<p>{t('countryEducation')}</p>
										<Select
											className="block mt-2"
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
												countries == null
													? []
													: countries.map(el => ({
															value: el.id,
															label: el.shortName
													  }))
											}
											value={
												info.filter(element => element.id === item.id)[0]
													.countryId
											}
										/>
									</div>
								</div>
								<p className="mt-4 self-start">{t('nameEducational')}</p>
								<Input
									placeholder={t('kfu')}
									size="large"
									className={clsx(
										'mt-2',
										!info[item.id].nameOfInstitute && error && 'border-rose-500'
									)}
									onChange={e => {
										dispatch(
											nameOfInstitute({
												id: item.id,
												nameOfInstitute: e.target.value
											})
										)
									}}
									value={info[item.id].nameOfInstitute}
								/>
								<div className="grid grid-cols-2 mt-4 gap-x-10 gap-y-4 w-full max-sm:gap-5">
									<div>
										<p>{t('diplomaSeries')}</p>
										<Input
											placeholder="0000"
											size="large"
											className={clsx(
												'mt-2',
												!info.filter(element => element.id === item.id)[0]
													.documentSeries &&
													error &&
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
											value={
												info.filter(element => element.id === item.id)[0]
													.documentSeries
											}
											maxLength={4}
										/>
									</div>
									<div>
										<p>{t('diplomaNumber')}</p>
										<Input
											placeholder="0000"
											size="large"
											className={clsx(
												'mt-2',
												!info[item.id].documentNumber &&
													error &&
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
											value={info[item.id].documentNumber}
											maxLength={4}
										/>
									</div>
									<div>
										<p>{t('graduateYear')}</p>
										<DatePicker
											className={clsx(
												'mt-2 shadow w-full',
												error &&
													info[item.id].graduateYear === '' &&
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
									</div>
									<div>
										<p>{t('specialization')}</p>
										<Input
											placeholder={t('webDesign')}
											size="large"
											className={clsx(
												'mt-2',
												error &&
													info[item.id].specialization === '' &&
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
											value={info[item.id].specialization}
										/>
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
