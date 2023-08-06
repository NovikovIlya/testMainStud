import { Button, DatePicker, DatePickerProps, Input, Select } from 'antd'
import enPicker from 'antd/lib/date-picker/locale/en_US'
import ruPicker from 'antd/lib/date-picker/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	FIO,
	dateIssue,
	divisionCode,
	documentTypeId,
	eMail,
	inn,
	issuedBy,
	passportNumber,
	passportSeries,
	phone,
	registrationAddress,
	residenceAddress,
	snils
} from '../../../store/reducers/FormReducers/ParentReducer'
import { ImagesLayout } from '../ImagesLayout'

export const ParentForm = () => {
	const { t, i18n } = useTranslation()
	const [error, setError] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const data = useAppSelector(state => state.Parent)

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		if (!saveInStore()) navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const saveInStore = () => {
		if (
			[
				data.FIO,
				data.dateIssue,
				data.divisionCode,
				data.eMail,
				data.inn,
				data.issuedBy,
				data.documentTypeId,
				data.passportNumber,
				data.passportSeries,
				data.phone,
				data.snils
			].some(el => el === '')
		) {
			setError(true)
			return true
		} else return false
	}
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		dateString !== '' && dispatch(dateIssue(dateString))
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-start justify-center p-5">
					<div className="text-black text-[20px] font-bold">
						Информация о родителях
					</div>
					<div className="text-black text-[14px] mt-7 font-normal self-start">
						ФИО родителя
					</div>
					<Input
						placeholder="Безухов Пьер Кириллович"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.FIO === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(FIO(e.target.value))}
						value={data.FIO}
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						Номер телефона родителя
					</div>
					<Input
						placeholder="+7 999 898-88-00"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.phone === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(phone(e.target.value))}
						value={data.phone}
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						Email родителя
					</div>
					<Input
						placeholder="BezuPr@gmail.com"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.eMail === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(eMail(e.target.value))}
						value={data.eMail}
					/>
					<div className="text-black text-[20px] mt-7 font-bold">
						Документы родителя
					</div>
					<div className="text-black text-[14px] mt-7 font-bold">
						Тип документа
					</div>
					<Select
						className="mt-2 w-full shadow rounded-lg"
						size="large"
						defaultValue={data.documentTypeId}
						options={[
							{ value: 1, label: 'Паспорт РФ' },
							{ value: 2, label: 'свидетельство о рождении' },
							{ value: 3, label: 'загранпаспорт' }
						]}
						onChange={e => dispatch(documentTypeId(e))}
					/>
					<div className="w-[151px] h-[19px] text-black text-[14px] font-bold mt-4">
						Данные документа
					</div>
					<div className="grid grid-cols-2 w-full gap-4">
						<div className="mt-4">
							<div className=" text-black text-[14px] font-normal">
								Код подразделения
							</div>
							<Input
								placeholder="000-000"
								size="large"
								className={clsx(
									'mt-2 shadow',
									error && data.divisionCode === '' && 'border-rose-500'
								)}
								onChange={e => dispatch(divisionCode(e.target.value))}
								value={data.divisionCode}
							/>
						</div>
						<div className="mt-4">
							<div className="text-black text-[14px] font-normal">
								Когда выдан
							</div>
							<DatePicker
								className={clsx(
									'mt-2 shadow w-full',
									error && data.dateIssue === '' && 'border-rose-500'
								)}
								onChange={onChange}
								locale={i18n.language === 'ru' ? ruPicker : enPicker}
								size="large"
								placeholder="ДД.ММ.ГГГГ"
								format={'DD.MM.YYYY'}
								value={
									data.dateIssue !== ''
										? dayjs(data.dateIssue, 'DD.MM.YYYY')
										: null
								}
							/>
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">Серия</div>
							<Input
								placeholder="000-000"
								size="large"
								className={clsx(
									'mt-2 shadow',
									error && data.passportSeries === '' && 'border-rose-500'
								)}
								onChange={e => dispatch(passportSeries(e.target.value))}
								value={data.passportSeries}
							/>
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">Номер</div>
							<Input
								placeholder="0000"
								size="large"
								className={clsx(
									'mt-2 shadow',
									error && data.passportNumber === '' && 'border-rose-500'
								)}
								onChange={e => dispatch(passportNumber(e.target.value))}
								value={data.passportNumber}
							/>
						</div>
					</div>
					<div className="mt-4 w-full">
						<p>Кем выдан</p>
						<Input
							placeholder="УФМС по Республике Татарстан"
							size="large"
							className={clsx(
								'mt-2 shadow',
								error && data.issuedBy === '' && 'border-rose-500'
							)}
							onChange={e => dispatch(issuedBy(e.target.value))}
							value={data.issuedBy}
						/>
					</div>
					<div className="text-black text-[14px] mt-4 font-bold">
						Дополнительные документы
					</div>
					<div className="text-black text-[14px] font-normal mt-4">СНИЛС</div>
					<Input
						placeholder="0000"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.snils === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(snils(e.target.value))}
						value={data.snils}
					/>
					<div className="text-black text-[14px] font-normal mt-4">ИНН</div>
					<Input
						placeholder="0000"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.inn === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(inn(e.target.value))}
						value={data.inn}
					/>
					<div className="text-black text-[20px] font-bold mt-7">Адрес</div>
					<div className="text-black text-[14px] font-normal mt-7">
						Адрес регистрации
					</div>
					<Input
						placeholder="РФ, г. Казань, ул. Адорацкого, д.3, кв. 88"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.registrationAddress === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(registrationAddress(e.target.value))}
						value={data.registrationAddress}
					/>
					<div className="text-black text-[14px] mt-4 font-normal">
						Адрес проживания
					</div>
					<Input
						placeholder="РФ, г. Казань, ул. Адорацкого, д.3, кв. 88"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.residenceAddress === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(residenceAddress(e.target.value))}
						value={data.residenceAddress}
					/>

					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className="w-[200px] h-[50px] font-bold rounded-full border-[#3073D7] text-[#3073D7]"
						>
							Назад
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] h-[50px] rounded-full"
						>
							Далее
						</Button>
					</div>
					<Button
						onClick={handleSkip}
						type="text"
						className="rounded-full w-[200px] font-bold h-[50px] mt-8 self-center"
					>
						Заполнить позже
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}
