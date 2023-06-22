import { Button, DatePicker, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import 'dayjs/locale/ru'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IdocumentsForm } from '../../../api/types'
import { documentsSuccess } from '../../../store/reducers/FormReducer'
import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	const dispatch = useDispatch()
	const [form, changeForm] = useState<IdocumentsForm>({
		documents: {
			mainDocument: '',
			passwordSeries: null,
			passwordNumber: null,
			issuedBy: null,
			dateIssue: null,
			divisionCode: null,
			inn: '',
			snils: ''
		}
	})
	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		saveInStore()
		navigate('/education')
	}
	const saveInStore = () => {
		if (form.documents.mainDocument !== '') {
			dispatch(documentsSuccess(form))
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center p-5">
					<div className="flex w-full flex-col">
						<h3>Документы</h3>
						<h4 className="mt-7">Тип документа</h4>
						<Select
							className="mt-4 "
							size="large"
							onChange={e =>
								changeForm({
									documents: { ...form.documents, mainDocument: e }
								})
							}
							options={[
								{ value: 'паспорт' },
								{ value: 'свидетельство о рождении' },
								{ value: 'загранпаспорт' }
							]}
						/>
					</div>
					<div className="flex w-full flex-col mt-7">
						<h4>Паспортные данные</h4>
						<div className="grid grid-cols-2 gap-5 mt-5 max-sm:grid-cols-1 max-sm:gap-4">
							<div>
								<p>Код подразделения</p>
								<Input
									placeholder="000-000"
									size="large"
									className="mt-4 shadow "
									maxLength={7}
									onChange={e =>
										changeForm({
											documents: {
												...form.documents,
												divisionCode: e.target.value
											}
										})
									}
								/>
							</div>
							<div>
								<p>Когда выдан</p>
								<DatePicker
									className="mt-4 shadow  w-full"
									onChange={e => {
										if (e != null) {
											changeForm({
												documents: {
													...form.documents,
													dateIssue: e.format('DD.MM.YYYY')
												}
											})
										}
									}}
									locale={locale}
									size="large"
									format={'DD.MM.YYYY'}
									placeholder="ДД.ММ.ГГГГ"
								/>
							</div>
							<div>
								<p>Серия</p>
								<Input
									placeholder="0000"
									size="large"
									className="mt-2 shadow "
									maxLength={4}
									onChange={e =>
										changeForm({
											documents: {
												...form.documents,
												passwordSeries: e.target.value
											}
										})
									}
								/>
							</div>
							<div>
								<p>Номер</p>
								<Input
									placeholder="0000"
									size="large"
									className="mt-2 shadow "
									maxLength={4}
									onChange={e =>
										changeForm({
											documents: {
												...form.documents,
												passwordNumber: e.target.value
											}
										})
									}
								/>
							</div>
						</div>
						<div className="mt-5">
							<p>Кем выдан</p>
							<Input
								placeholder="УФМС по Республике Татарстан"
								size="large"
								className="mt-2 shadow "
								onChange={e =>
									changeForm({
										documents: { ...form.documents, issuedBy: e.target.value }
									})
								}
							/>
						</div>
					</div>
					<div className="mt-5 w-full">
						<h4 className="mb-5">Дополнительные документы</h4>
						<div className="flex flex-col w-full">
							<p>СНИЛС</p>
							<Input
								size="large"
								placeholder="0000"
								className="shadow "
								maxLength={4}
								onChange={e =>
									changeForm({
										documents: { ...form.documents, snils: e.target.value }
									})
								}
							/>
							<p className="mt-4">ИНН</p>
							<Input
								size="large"
								placeholder="0000"
								maxLength={4}
								className="shadow "
								onChange={e =>
									changeForm({
										documents: { ...form.documents, inn: e.target.value }
									})
								}
							/>
						</div>
					</div>
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
						className="rounded-full w-[200px] font-bold h-[50px] mt-8"
					>
						Заполнить позже
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}
