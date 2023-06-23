import { Button, DatePicker, Input, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'dayjs/locale/ru';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



import { IdocumentsForm } from '../../../api/types';
import { useAppSelector } from '../../../store'
import {
	changeDivisionCode,
	documentsSuccess
} from '../../../store/reducers/FormReducer'
import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.Form.role)
	const data = useAppSelector(state => state.Form.documents)
	const [form, changeForm] = useState<IdocumentsForm>({
		documents: {
			mainDocument: '',
			passwordSeries: null,
			passwordNumber: null,
			issuedBy: null,
			dateIssue: null,
			divisionCode: '',
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
		if (userRole === 'schoolboy') navigate('/parent')
		else navigate('/education')
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
				<div className="container max-w-2xl flex flex-col items-center justify-center px-5">
					<div className="flex w-full flex-col">
						<p className="text-xl font-bold">Документы</p>
						<span className="mt-4 text-sm">Тип документа</span>
						<Select
							className="mt-2"
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
					<div className="flex w-full flex-col mt-4 text-sm">
						<span>Паспортные данные</span>
						<div className="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1 max-sm:gap-4">
							<div>
								<p>Код подразделения</p>
								<Input
									placeholder="000-000"
									size="large"
									value={data?.divisionCode}
									className="mt-2 shadow "
									maxLength={7}
									onChange={e =>
										dispatch(changeDivisionCode(e.currentTarget.value))
									}
								/>
							</div>
							<div>
								<p>Когда выдан</p>
								<DatePicker
									className="mt-2 shadow  w-full"
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
						<div className="mt-4">
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
					<div className="mt-4 w-full">
						<p className="text-sm">Дополнительные документы</p>
						<div className="flex text-sm flex-col w-full mt-4">
							<p>СНИЛС</p>
							<Input
								size="large"
								placeholder="0000"
								className="shadow mt-2"
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
								className="shadow mt-2"
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
							className="w-[200px] h-[50px]  font-bold rounded-full"
						>
							Далее
						</Button>
					</div>
					<Button
						onClick={handleSkip}
						type="text"
						className="rounded-full w-[200px] h-[50px] mt-8"
					>
						Заполнить позже
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}