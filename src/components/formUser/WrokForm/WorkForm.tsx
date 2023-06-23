import { Button, Input } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ImagesLayout } from '../ImagesLayout'

const { TextArea } = Input

export const WorkForm = () => {
	const navigate = useNavigate()
	const [countEducation, setCountEducation] = useState([Date.now()])

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const handleDeleteEducation = (id: number) => {
		const newArray = countEducation.filter(item => id !== item)
		setCountEducation(newArray)
	}
	const addEducation = () => {
		const id = Date.now()
		setCountEducation(previous => [...previous, id])
	}
	const HandleWork = (item: { id: number }) => {
		return (
			<div>
				<div className=" mt-5 w-full max-sm:gap-4">
					<p className="flex gap-2">
						Место работы
						{countEducation.length !== 1 && (
							<p
								onClick={() => handleDeleteEducation(item.id)}
								className="opacity-40 text-sm cursor-pointer"
							>
								Удалить
							</p>
						)}
					</p>

					<Input
						placeholder="Калифорнийский университет в Беркли, департамент всего самого умного, отдел выпендрежников"
						size="large"
						className="mt-2"
					/>
				</div>
				<p className="mt-4 self-start">Период работы</p>
				<Input
					placeholder="август 2018 — май 2023"
					size="large"
					className="mt-2"
				/>
			</div>
		)
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="text-xl">Работа</h3>
					<div className="flex flex-col gap-10 w-full">
						{countEducation.map(item => (
							<HandleWork id={item} key={item} />
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
						<p className="opacity-40 text-sm">работу</p>
					</div>
					<div>
						<p className="text-black text-sm font-normal">Опыт работы</p>
						<TextArea
							placeholder="Расскажите о Вашем опыте работы в целом"
							className="mt-2"
							autoSize={{ minRows: 4, maxRows: 8 }}
						/>
						<p className="text-black text-sm font-normal mt-4">
							Ссылка на портфолио
						</p>
						<Input
							placeholder="август 2018 — май 2023"
							size="large"
							className="mt-2"
						/>
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
					<div className="w-full flex justify-center">
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
