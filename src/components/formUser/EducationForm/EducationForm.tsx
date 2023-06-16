import { Button, Input, Select } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IeducationForm } from '../../../api/types'
import { educationSuccess } from '../../../store/reducers/FormReducer'
import { ImagesLayout } from '../ImagesLayout'

export const EducationForm = () => {
	const [form, changeForm] = useState<IeducationForm>({
		education: {
			nameOfInstitute: '',
			educationLevel: '',
			documentNumber: '',
			documentSeries: '',
			educationCountry: ''
		}
	})
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/user')
	}
	const handleOk = () => {
		dispatch(educationSuccess(form))
		navigate('/infoUser')
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center min-h-screen">
				<div className="container max-w-2xl flex flex-col items-center justify-center  p-5">
					<h3 className="self-start">Образование</h3>
					<p className="self-start mt-7">Паспортные данные</p>
					<div className="grid grid-cols-2 gap-10 mt-5 w-full max-sm:grid-cols-1 max-sm:gap-4">
						<div>
							<p>Уровень образования</p>
							<Input
								placeholder="Высшее образование"
								size="large"
								className="mt-2"
								onChange={e =>
									changeForm({
										education: {
											...form.education,
											educationLevel: e.target.value
										}
									})
								}
							/>
						</div>
						<div>
							<p>Страна получения образования</p>
							<Select
								className="block mt-2"
								size="large"
								onChange={e =>
									changeForm({
										education: { ...form.education, educationCountry: e }
									})
								}
								options={[
									{ value: 'Бангладеш' },
									{ value: 'Ботсвана' },
									{ value: 'Белиз' },
									{ value: 'Бруней' }
								]}
							/>
						</div>
					</div>
					<p className="mt-4 self-start">Наименование учебного заведения</p>
					<Input
						placeholder="Казанский федеральный университет"
						size="large"
						className="mt-2"
						onChange={e =>
							changeForm({
								education: {
									...form.education,
									nameOfInstitute: e.target.value
								}
							})
						}
					/>
					<div className="grid grid-cols-2 mt-4 gap-10 w-full max-sm:gap-5">
						<div>
							<p>Серия</p>
							<Input
								placeholder="0000"
								size="large"
								className="mt-2"
								onChange={e =>
									changeForm({
										education: {
											...form.education,
											documentSeries: e.target.value
										}
									})
								}
								maxLength={4}
							/>
						</div>
						<div>
							<p>Номер</p>
							<Input
								placeholder="0000"
								size="large"
								className="mt-2"
								onChange={e =>
									changeForm({
										education: {
											...form.education,
											documentNumber: e.target.value
										}
									})
								}
								maxLength={4}
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
