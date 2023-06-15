import { Button, DatePicker, Input, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useNavigate } from 'react-router-dom'

import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	const navigate = useNavigate()

	const handleChange = (value: string) => {
		console.log(`selected ${value}`)
	}
	const handleCancel = () => {
		navigate('/user')
	}
	const handleOk = () => {
		navigate('/education')
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center min-h-screen">
				<div className="container max-w-2xl flex flex-col items-center justify-center p-5">
					<div className="flex w-full flex-col">
						<h2>Документы</h2>
						<h4 className="mt-7">Тип документа</h4>
						<Select
							defaultValue="main"
							className="mt-4 shadow-md shadow-gray-400 rounded-lg"
							size="large"
							onChange={handleChange}
							options={[
								{ value: 'main', label: 'паспорт' },
								{ value: 'some1', label: 'свидетельство о рождении' },
								{ value: 'some2', label: 'загранпаспорт' }
							]}
						/>
					</div>
					<div className="flex w-full flex-col mt-7">
						<h4>Паспортные данные</h4>
						<div className="grid grid-cols-2 gap-5 mt-5 max-sm:grid-cols-1 max-sm:gap-4">
							<div>
								<p>Серия</p>
								<Input
									placeholder="0000"
									size="large"
									className="mt-2 shadow-md shadow-gray-400"
									maxLength={4}
								/>
							</div>
							<div>
								<p>Номер</p>
								<Input
									placeholder="0000"
									size="large"
									className="mt-2 shadow-md shadow-gray-400"
									maxLength={4}
								/>
							</div>
							<div>
								<p>Когда выдан</p>
								<DatePicker
									className="mt-4 shadow-md shadow-gray-400 w-full"
									onChange={(e: dayjs.Dayjs | null) => {
										console.log(e?.format('DD.MM.YYYY'))
									}}
									locale={locale}
									size="large"
									format={'DD.MM.YYYY'}
									placeholder="ДД.ММ.ГГГГ"
								/>
							</div>
							<div>
								<p>Код подразделения</p>
								<Input
									placeholder="000-000"
									size="large"
									className="mt-4 shadow-md shadow-gray-400"
									maxLength={7}
								/>
							</div>
						</div>
						<div className="mt-5">
							<p>Кем выдан</p>
							<Input
								placeholder="УФМС по Республике Татарстан"
								size="large"
								className="mt-2 shadow-md shadow-gray-400"
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
								className="shadow-md shadow-gray-400"
								maxLength={4}
							/>
							<p className="mt-4">ИНН</p>
							<Input
								size="large"
								placeholder="0000"
								maxLength={4}
								className="shadow-md shadow-gray-400"
							/>
						</div>
					</div>
					<div className="w-full flex justify-center items-center gap-[30px] mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className="w-[200px] h-[50px] rounded-full border-[#3073D7] text-[#3073D7]"
						>
							Пропустить
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] h-[50px] rounded-full"
						>
							Далее
						</Button>
					</div>
				</div>
			</div>
		</ImagesLayout>
	)
}
