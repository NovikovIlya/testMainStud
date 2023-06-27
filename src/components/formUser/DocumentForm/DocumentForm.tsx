import { Button, DatePicker, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	dateIssueSuccess,
	divisionCodeSuccess,
	innSuccess,
	issuedBySuccess,
	mainDocumentSuccess,
	passwordNumberSuccess,
	passwordSeriesSuccess,
	snilsSuccess
} from '../../../store/reducers/FormReducers/DocumentReducer'
import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	dayjs.locale('ru')
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
				data.mainDocument,
				data.passwordNumber,
				data.passwordSeries,
				data.snils
			].some(el => el === '')
		)
			return true
		else return false
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
							onChange={e => dispatch(mainDocumentSuccess(e))}
							defaultValue={data.mainDocument}
							options={[
								{ value: 'Паспорт РФ' },
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
										dispatch(divisionCodeSuccess(e.currentTarget.value))
									}
								/>
							</div>
							<div>
								<p>Когда выдан</p>
								<DatePicker
									className="mt-2 shadow  w-full"
									onChange={e => {
										if (e != null) {
											dispatch(dateIssueSuccess(e.format('DD.MM.YYYY')))
										}
									}}
									locale={locale}
									size="large"
									format={'DD.MM.YYYY'}
									placeholder="ДД.ММ.ГГГГ"
									value={
										data.dateIssue != null
											? dayjs(data.dateIssue, 'DD.MM.YYYY')
											: null
									}
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
										dispatch(passwordSeriesSuccess(e.target.value))
									}
									value={data.passwordSeries != null ? data.passwordSeries : ''}
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
										dispatch(passwordNumberSuccess(e.target.value))
									}
									value={data.passwordNumber != null ? data.passwordNumber : ''}
								/>
							</div>
						</div>
						<div className="mt-4">
							<p>Кем выдан</p>
							<Input
								placeholder="УФМС по Республике Татарстан"
								size="large"
								className="mt-2 shadow "
								onChange={e => dispatch(issuedBySuccess(e.target.value))}
								value={data.issuedBy != null ? data.issuedBy : ''}
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
								onChange={e => dispatch(snilsSuccess(e.target.value))}
								value={data.snils}
							/>
							<p className="mt-4">ИНН</p>
							<Input
								size="large"
								placeholder="0000"
								maxLength={4}
								className="shadow mt-2"
								onChange={e => dispatch(innSuccess(e.target.value))}
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
