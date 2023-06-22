import { Button, Input, Select } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IeducationForm, edForm } from '../../../api/types'
import { educationSuccess } from '../../../store/reducers/FormReducer'
import { ImagesLayout } from '../ImagesLayout'

export const EducationForm = () => {
	const educationBaseForm: edForm = {
		id: 0,
		nameOfInstitute: '',
		educationLevel: '',
		documentNumber: '',
		documentSeries: '',
		educationCountry: ''
	}
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [countEducation, setCountEducation] = useState([Date.now()])
	let form = useRef<IeducationForm>({
		education: [{ ...educationBaseForm, id: countEducation[0] }]
	})
	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		saveInStore()
		navigate('/infoUser')
	}
	const saveInStore = () => {
		let IsEmpty = form.current.education.some(
			item =>
				item.documentNumber === '' ||
				item.documentSeries === '' ||
				item.educationCountry === '' ||
				item.educationLevel === '' ||
				item.nameOfInstitute === ''
		)
		if (!IsEmpty) {
			dispatch(educationSuccess(form.current))
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const addEducation = () => {
		const id = Date.now()
		setCountEducation(previous => [...previous, id])
		form.current = {
			...form.current,
			education: [...form.current.education, { ...educationBaseForm, id: id }]
		}
	}
	const handleDeleteEducation = (id: number) => {
		const newArray = countEducation.filter(item => id !== item)
		setCountEducation(newArray)
		form.current = {
			education: form.current.education.filter(item => item.id !== id)
		}
	}
	const HandleEducation = (item: { id: number }) => {
		return (
			<div>
				<div className="flex self-start gap-4 mt-7">
					<p className="">Данные документа об образовании</p>
					{countEducation.length !== 1 && (
						<p
							onClick={() => handleDeleteEducation(item.id)}
							className="opacity-40 text-sm cursor-pointer"
						>
							Удалить
						</p>
					)}
				</div>
				<div className="grid grid-cols-2 gap-10 mt-5 w-full max-sm:grid-cols-1 max-sm:gap-4">
					<div>
						<p>Уровень образования</p>
						<Input
							placeholder="Высшее образование"
							size="large"
							className="mt-2"
							onChange={e => {
								form.current = {
									...form.current,
									education: form.current.education.map(el => {
										if (el.id === item.id) {
											return { ...el, educationLevel: e.target.value }
										}
										return el
									})
								}
							}}
						/>
					</div>
					<div>
						<p>Страна получения образования</p>
						<Select
							className="block mt-2"
							size="large"
							onChange={e => {
								form.current = {
									...form.current,
									education: form.current.education.map(el => {
										if (el.id === item.id) {
											return { ...el, educationCountry: e }
										}
										return el
									})
								}
							}}
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
					onChange={e => {
						form.current = {
							...form.current,
							education: form.current.education.map(el => {
								if (el.id === item.id) {
									return { ...el, nameOfInstitute: e.target.value }
								}
								return el
							})
						}
					}}
				/>
				<div className="grid grid-cols-2 mt-4 gap-10 w-full max-sm:gap-5">
					<div>
						<p>Серия</p>
						<Input
							placeholder="0000"
							size="large"
							className="mt-2"
							onChange={e => {
								form.current = {
									...form.current,
									education: form.current.education.map(el => {
										if (el.id === item.id) {
											return { ...el, documentSeries: e.target.value }
										}
										return el
									})
								}
							}}
							maxLength={4}
						/>
					</div>
					<div>
						<p>Номер</p>
						<Input
							placeholder="0000"
							size="large"
							className="mt-2"
							onChange={e => {
								form.current = {
									...form.current,
									education: form.current.education.map(el => {
										if (el.id === item.id) {
											return { ...el, documentNumber: e.target.value }
										}
										return el
									})
								}
							}}
							maxLength={4}
						/>
					</div>
				</div>
			</div>
		)
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center min-h-screen text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="self-start">Образование</h3>
					<div className="flex flex-col gap-10 w-full">
						{countEducation.map(item => (
							<HandleEducation id={item} key={item} />
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
						<p className="opacity-40 text-sm mt-2">добавить</p>
						<p className="opacity-40 text-sm">образование</p>
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
							className="w-[200px] font-bold h-[50px] rounded-full"
						>
							Далее
						</Button>
					</div>
					<div className='w-full flex justify-center'>

					<Button
						onClick={handleSkip}
						type="text"
						className="rounded-full w-[200px]  h-[50px] mt-8"
						>
						Заполнить позже
					</Button>
						</div>
				</div>
			</div>
		</ImagesLayout>
	)
}
