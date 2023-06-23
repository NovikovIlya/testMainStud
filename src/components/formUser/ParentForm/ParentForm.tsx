import { Button, DatePicker, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ImagesLayout } from '../ImagesLayout'

export const ParentForm = () => {
	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		navigate('/education')
	}
	const handleSkip = () => {
		navigate('/user')
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
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						Номер телефона родителя
					</div>
					<Input
						placeholder="+7 999 898-88-00"
						size="large"
						className="mt-2 shadow"
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						Email родителя
					</div>
					<Input
						placeholder="BezuPr@gmail.com"
						size="large"
						className="mt-2 shadow"
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
						options={[
							{ value: 'паспорт' },
							{ value: 'свидетельство о рождении' },
							{ value: 'загранпаспорт' }
						]}
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
							/>
						</div>
						<div className="mt-4">
							<div className="text-black text-[14px] font-normal">
								Когда выдан
							</div>
							<Input placeholder="0000" size="large" className="mt-2 shadow" />
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">Серия</div>
							<Input
								placeholder="000-000"
								size="large"
								className="mt-2 shadow"
							/>
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">Номер</div>
							<Input placeholder="0000" size="large" className="mt-2 shadow" />
						</div>
					</div>
					<div className="text-black text-[14px] mt-4 font-bold">
						Дополнительные документы
					</div>
					<div className="text-black text-[14px] font-normal mt-4">СНИЛС</div>
					<Input placeholder="0000" size="large" className="mt-2 shadow" />
					<div className="text-black text-[14px] font-normal mt-4">ИНН</div>
					<Input placeholder="0000" size="large" className="mt-2 shadow" />
					<div className="text-black text-[20px] font-bold mt-7">Адрес</div>
					<div className="text-black text-[14px] font-normal mt-7">
						Адрес регистрации
					</div>
					<Input
						placeholder="РФ, г. Казань, ул. Адорацкого, д.3, кв. 88"
						size="large"
						className="mt-2 shadow"
					/>
					<div className="text-black text-[14px] mt-4 font-normal">
						Адрес проживания
					</div>
					<Input
						placeholder="РФ, г. Казань, ул. Адорацкого, д.3, кв. 88"
						size="large"
						className="mt-2 shadow"
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
