import { Button, Input, Select } from 'antd'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	documentNumber,
	documentSeries,
	educationCountrySeries,
	educationLevel,
	idAdd,
	idDelete,
	nameOfInstitute
} from '../../../store/reducers/FormReducers/EducationReducer'
import { ImagesLayout } from '../ImagesLayout'

export const EducationForm = () => {
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [error, setError] = useState(false)
	const data = useAppSelector(state => state.Education)

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			if (userRole === 'applicant') navigate('/work')
			else navigate('/user')
		} else {
			setError(true)
		}
	}
	const saveInStore = () => {
		let IsEmpty = data.some(
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
		dispatch(idAdd(data[data.length - 1].id + 1))
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
						{data.map(item => (
							<div>
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
										<p>{t('educationDocument')}</p>
										<Input
											placeholder={t('higherEducational')}
											size="large"
											className={clsx(
												'mt-2',
												!data[item.id].educationLevel &&
													error &&
													'border-rose-500'
											)}
											onChange={e => {
												dispatch(
													educationLevel({
														id: item.id,
														educationLevel: e.target.value
													})
												)
											}}
											value={data[item.id].educationLevel}
										/>
									</div>
									<div>
										<p>{t('countryEducation')}</p>
										<Select
											className="block mt-2"
											size="large"
											onChange={e =>
												dispatch(
													educationCountrySeries({
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
												data.filter(element => element.id === item.id)[0]
													.educationCountry
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
										!data[item.id].nameOfInstitute && error && 'border-rose-500'
									)}
									onChange={e => {
										dispatch(
											nameOfInstitute({
												id: item.id,
												nameOfInstitute: e.target.value
											})
										)
									}}
									value={data[item.id].nameOfInstitute}
								/>
								<div className="grid grid-cols-2 mt-4 gap-10 w-full max-sm:gap-5">
									<div>
										<p>{t('series')}</p>
										<Input
											placeholder="0000"
											size="large"
											className={clsx(
												'mt-2',
												!data.filter(element => element.id === item.id)[0]
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
												data.filter(element => element.id === item.id)[0]
													.documentSeries
											}
											maxLength={4}
										/>
									</div>
									<div>
										<p>{t('number')}</p>
										<Input
											placeholder="0000"
											size="large"
											className={clsx(
												'mt-2',
												!data[item.id].documentNumber &&
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
											value={data[item.id].documentNumber}
											maxLength={4}
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
