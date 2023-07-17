import { Button, Input, Select } from 'antd';
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	documentNumberSuccess,
	documentSeriesSuccess,
	educationCountrySeriesSuccess,
	educationLevelSuccess,
	idAdd,
	idDelete,
	nameOfInstituteSuccess
} from '../../../store/reducers/FormReducers/EducationReducer'
import { ImagesLayout } from '../ImagesLayout'

export const EducationForm = () => {
	const data = useRef(useAppSelector(state => state.Education))
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const navigate = useNavigate()
	const { t } = useTranslation()
	const state = useAppSelector(state => state.Education)
	data.current = state

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			if (userRole === 'applicant') navigate('/work')
			else navigate('/user')
		}
	}
	const saveInStore = () => {
		let IsEmpty = data.current.educationItems.some(
			item =>
				item.documentNumber === '' ||
				item.documentSeries === '' ||
				item.educationCountry === '' ||
				item.educationLevel === '' ||
				item.nameOfInstitute === ''
		)
		return IsEmpty
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const addEducation = () => {
		dispatch(
			idAdd(
				data.current.educationItems[data.current.educationItems.length - 1].id +
					1
			)
		)
	}
	const handleDeleteEducation = (id: number) => {
		console.log(id)
		dispatch(idDelete(id))
	}
	const HandleEducation = useCallback(
		(item: { id: number }) => {
			return (
				<div>
					<div className="flex self-start gap-4 mt-7">
						<p className="">{t('educationDocument')}</p>
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
							<p>{t('educationDocument')}</p>
							<Input
								placeholder={t('higherEducational')}
								size="large"
								className="mt-2"
								onChange={e =>
									dispatch(
										educationLevelSuccess({
											id: item.id,
											educationLevel: e.target.value
										})
									)
								}
								value={
									data.current.educationItems.filter(el => el.id === item.id)[0]
										.educationLevel
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
										educationCountrySeriesSuccess({
											id: item.id,
											educationCountry: e
										})
									)
								}
								options={[
									{ value: 'Российская Федерация' },
									{ value: 'Бангладеш' },
									{ value: 'Ботсвана' },
									{ value: 'Белиз' },
									{ value: 'Бруней' }
								]}
								value={
									data.current.educationItems.filter(
										element => element.id === item.id
									)[0].educationCountry
								}
							/>
						</div>
					</div>
					<p className="mt-4 self-start">{t('nameEducational')}</p>
					<Input
						placeholder={t('kfu')}
						size="large"
						className="mt-2"
						onChange={e =>
							dispatch(
								nameOfInstituteSuccess({
									id: item.id,
									nameOfInstitute: e.target.value
								})
							)
						}
						value={
							data.current.educationItems.filter(
								element => element.id === item.id
							)[0].nameOfInstitute
						}
					/>
					<div className="grid grid-cols-2 mt-4 gap-10 w-full max-sm:gap-5">
						<div>
							<p>{t('series')}</p>
							<Input
								placeholder="0000"
								size="large"
								className="mt-2"
								onChange={e =>
									dispatch(
										documentSeriesSuccess({
											id: item.id,
											documentSeries: e.target.value
										})
									)
								}
								value={
									data.current.educationItems.filter(
										element => element.id === item.id
									)[0].documentSeries
								}
								maxLength={4}
							/>
						</div>
						<div>
							<p>{t('number')}</p>
							<Input
								placeholder="0000"
								size="large"
								className="mt-2"
								onChange={e =>
									dispatch(
										documentNumberSuccess({
											id: item.id,
											documentNumber: e.target.value
										})
									)
								}
								value={
									data.current.educationItems.filter(
										element => element.id === item.id
									)[0].documentNumber
								}
								maxLength={4}
							/>
						</div>
					</div>
				</div>
			)
		},
		[data.current.educationItems.length]
	)
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="self-start text-xl">{t('education')}</h3>
					<div className="flex flex-col gap-10 w-full">
						{data.current.educationItems.map(item => (
							<HandleEducation id={item.id} key={item.id} />
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