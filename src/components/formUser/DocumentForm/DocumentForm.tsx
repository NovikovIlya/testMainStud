import { Button, DatePicker, Input, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	dateIssue,
	divisionCode,
	inn,
	issuedBy,
	nameDocument,
	passwordNumber,
	passwordSeries,
	snils
} from '../../../store/reducers/FormReducers/DocumentReducer'
import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	dayjs.locale('ru')
	const { t } = useTranslation()
	const [error, setError] = useState(false)
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const data = useAppSelector(state => state.Document)

	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			if (userRole === 'schoolboy') navigate('/parent')
			else navigate('/education')
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const saveInStore = () => {
		if (
			[
				data.dateIssue,
				data.divisionCode,
				data.inn,
				data.issuedBy,
				data.nameDocument,
				data.passwordNumber,
				data.passwordSeries,
				data.snils
			].some(el => el === '')
		) {
			setError(true)
			return true
		} else return false
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center px-5">
					<div className="flex w-full flex-col">
						<p className="text-xl font-bold">{t('documents')}</p>
						<span className="mt-4 text-sm">{t('documentType')}</span>
						<Select
							className="mt-2"
							size="large"
							onChange={e => dispatch(nameDocument(e))}
							defaultValue={data.nameDocument}
							options={[
								{ value: 'Паспорт РФ' },
								{ value: 'свидетельство о рождении' },
								{ value: 'загранпаспорт' }
							]}
						/>
					</div>
					<div className="flex w-full flex-col mt-4 text-sm">
						<span>{t('passportData')}</span>
						<div className="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1 max-sm:gap-4">
							<div>
								<p>{t('divisionCode')}</p>
								<Input
									placeholder="000-000"
									size="large"
									value={data?.divisionCode}
									className={clsx(
										'mt-2 shadow ',
										error && !data.divisionCode && 'border-rose-500'
									)}
									maxLength={7}
									onChange={e => dispatch(divisionCode(e.currentTarget.value))}
								/>
							</div>
							<div>
								<p>{t('whenIssued')}</p>
								<DatePicker
									className={clsx(
										'mt-2 shadow w-full',
										error && !data.dateIssue && 'border-rose-500'
									)}
									onChange={e => {
										if (e != null) {
											dispatch(dateIssue(e.format('DD.MM.YYYY')))
										}
									}}
									size="large"
									format={'DD.MM.YYYY'}
									placeholder={t('date')}
									value={
										data.dateIssue != null
											? dayjs(data.dateIssue, 'DD.MM.YYYY')
											: null
									}
								/>
							</div>
							<div>
								<p>{t('series')}</p>
								<Input
									placeholder="0000"
									size="large"
									className={clsx(
										'mt-2 shadow ',
										error && !data.passwordSeries && 'border-rose-500'
									)}
									maxLength={4}
									onChange={e => dispatch(passwordSeries(e.target.value))}
									value={data.passwordSeries != null ? data.passwordSeries : ''}
								/>
							</div>
							<div>
								<p>{t('number')}</p>
								<Input
									placeholder="0000"
									size="large"
									className={clsx(
										'mt-2 shadow ',
										error && !data.passwordNumber && 'border-rose-500'
									)}
									maxLength={4}
									onChange={e => dispatch(passwordNumber(e.target.value))}
									value={data.passwordNumber != null ? data.passwordNumber : ''}
								/>
							</div>
						</div>
						<div className="mt-4">
							<p>{t('issuedWhom')}</p>
							<Input
								placeholder={t('location')}
								size="large"
								className={clsx(
									'mt-2 shadow ',
									error && !data.issuedBy && 'border-rose-500'
								)}
								onChange={e => dispatch(issuedBy(e.target.value))}
								value={data.issuedBy != null ? data.issuedBy : ''}
							/>
						</div>
					</div>
					<div className="mt-4 w-full">
						<p className="text-sm">{t('additionalDocuments')}</p>
						<div className="flex text-sm flex-col w-full mt-4">
							<p>{t('snils')}</p>
							<Input
								size="large"
								placeholder="0000"
								className={clsx(
									'mt-2 shadow ',
									error && !data.snils && 'border-rose-500'
								)}
								maxLength={4}
								onChange={e => dispatch(snils(e.target.value))}
								value={data.snils}
							/>
							<p className="mt-4">{t('inn')}</p>
							<Input
								size="large"
								placeholder="0000"
								maxLength={4}
								className={clsx(
									'mt-2 shadow ',
									error && !data.inn && 'border-rose-500'
								)}
								onChange={e => dispatch(inn(e.target.value))}
								value={data.inn}
							/>
						</div>
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
							className="w-[200px] h-[50px]  font-bold rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<Button
						onClick={handleSkip}
						type="text"
						className="rounded-full w-[200px] h-[50px] mt-8"
					>
						{t('fillLater')}
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}
