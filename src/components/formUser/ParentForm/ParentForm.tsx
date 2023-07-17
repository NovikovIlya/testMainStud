import { Button, DatePicker, DatePickerProps, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	FIO,
	dateIssue,
	divisionCode,
	eMail,
	inn,
	issuedBy,
	nameDocument,
	passwordNumber,
	passwordSeries,
	phone,
	registrationAddress,
	residenceAddress,
	snils
} from '../../../store/reducers/FormReducers/ParentReducer'
import { ImagesLayout } from '../ImagesLayout'

export const ParentForm = () => {
	dayjs.locale('ru')
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
				data.nameDocument,
				data.passwordNumber,
				data.passwordSeries,
				data.phone,
				data.snils
			].some(el => el === '')
		)
			return true
		else return false
	}
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		dispatch(dateIssue(dateString))
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
						className="mt-2 shadow"
						onChange={e => dispatch(FIO(e.target.value))}
						value={data.FIO}
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						Номер телефона родителя
					</div>
					<Input
						placeholder="+7 999 898-88-00"
						size="large"
						className="mt-2 shadow"
						onChange={e => dispatch(phone(e.target.value))}
						value={data.phone}
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						Email родителя
					</div>
					<Input
						placeholder="BezuPr@gmail.com"
						size="large"
						className="mt-2 shadow"
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
						defaultValue={data.nameDocument}
						options={[
							{ value: 'Паспорт РФ' },
							{ value: 'свидетельство о рождении' },
							{ value: 'загранпаспорт' }
						]}
						onChange={e => dispatch(nameDocument(e))}
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
								className="mt-2 shadow"
								onChange={e => dispatch(divisionCode(e.target.value))}
								value={data.divisionCode}
							/>
						</div>
						<div className="mt-4">
							<div className="text-black text-[14px] font-normal">
								Когда выдан
							</div>
							<DatePicker
								className="mt-2 shadow w-full"
								onChange={onChange}
								size="large"
								placeholder="ДД.ММ.ГГГГ"
							/>
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">Серия</div>
							<Input
								placeholder="000-000"
								size="large"
								className="mt-2 shadow"
								onChange={e => dispatch(passwordSeries(e.target.value))}
								value={data.passwordSeries != null ? data.passwordSeries : ''}
							/>
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">Номер</div>
							<Input
								placeholder="0000"
								size="large"
								className="mt-2 shadow"
								onChange={e => dispatch(passwordNumber(e.target.value))}
								value={data.passwordNumber != null ? data.passwordNumber : ''}
							/>
						</div>
					</div>
					<div className="mt-4 w-full">
						<p>Кем выдан</p>
						<Input
							placeholder="УФМС по Республике Татарстан"
							size="large"
							className="mt-2 shadow"
							onChange={e => dispatch(issuedBy(e.target.value))}
							value={data.issuedBy != null ? data.issuedBy : ''}
						/>
					</div>
					<div className="text-black text-[14px] mt-4 font-bold">
						Дополнительные документы
					</div>
					<div className="text-black text-[14px] font-normal mt-4">СНИЛС</div>
					<Input
						placeholder="0000"
						size="large"
						className="mt-2 shadow"
						onChange={e => dispatch(snils(e.target.value))}
						value={data.snils}
					/>
					<div className="text-black text-[14px] font-normal mt-4">ИНН</div>
					<Input
						placeholder="0000"
						size="large"
						className="mt-2 shadow"
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
						className="mt-2 shadow"
						onChange={e => dispatch(registrationAddress(e.target.value))}
						value={data.registrationAddress}
					/>
					<div className="text-black text-[14px] mt-4 font-normal">
						Адрес проживания
					</div>
					<Input
						placeholder="РФ, г. Казань, ул. Адорацкого, д.3, кв. 88"
						size="large"
						className="mt-2 shadow"
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
