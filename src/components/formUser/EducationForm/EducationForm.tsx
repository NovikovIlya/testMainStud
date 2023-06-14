import { Button, Input, Select } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ImagesLayout } from '../ImagesLayout'

export const EducationForm = () => {
	const navigate = useNavigate()

	const handleChange = (value: string) => {
		console.log(`selected ${value}`)
	}
	const handleCancel = () => {
		navigate('/user')
	}
	const handleOk = () => {
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
							/>
						</div>
						<div>
							<p>Страна получения образования</p>
							<Select
								defaultValue="lucy"
								className="block mt-2"
								size="large"
								onChange={handleChange}
								options={[
									{ value: 'jack', label: 'Бангладеш' },
									{ value: 'lucy', label: 'Ботсвана' },
									{ value: 'Yiminghe', label: 'Белиз' },
									{ value: 'disabled', label: 'Бруней' }
								]}
							/>
						</div>
					</div>
					<p className="mt-4 self-start">Наименование учебного заведения</p>
					<Input
						placeholder="Казанский федеральный университет"
						size="large"
						className="mt-2"
					/>
					<div className="grid grid-cols-2 mt-4 gap-10 w-full max-sm:gap-5">
						<div>
							<p>Серия</p>
							<Input placeholder="0000" size="large" className="mt-2" />
						</div>
						<div>
							<p>Номер</p>
							<Input placeholder="0000" size="large" className="mt-2" />
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
