import { Button, Input } from 'antd'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	descriptionSuccess,
	idAdd,
	idDelete,
	linkSuccess,
	placeSuccess,
	timeSuccess
} from '../../../store/reducers/FormReducers/WorkReducer'
import { ImagesLayout } from '../ImagesLayout'

const { TextArea } = Input

export const WorkForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const data = useAppSelector(state => state.Work)

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			navigate('/user')
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const saveInStore = () => {
		let IsEmpty = data.workItems.some(
			item => item.place === '' || item.time === ''
		)
		if (data.description === '' || data.link === '') IsEmpty = true
		return IsEmpty
	}
	const handleDeleteEducation = (id: number) => {
		dispatch(idDelete(id))
	}
	const addEducation = () => {
		dispatch(idAdd(data.workItems.length))
	}
	const HandleWork = useCallback(
		(item: { id: number }) => {
			return (
				<div>
					<div className=" mt-5 w-full max-sm:gap-4">
						<span className="flex">
							<p className="flex mr-5">Место работы</p>
							{item.id !== 0 && (
								<p
									onClick={() => handleDeleteEducation(item.id)}
									className="opacity-40 text-sm cursor-pointer"
								>
									Удалить
								</p>
							)}
						</span>

						<Input
							placeholder="Калифорнийский университет в Беркли, департамент всего самого умного, отдел выпендрежников"
							size="large"
							className="mt-2"
							onChange={e =>
								dispatch(placeSuccess({ id: item.id, place: e.target.value }))
							}
							value={data.workItems[item.id].place}
						/>
					</div>
					<p className="mt-4 self-start">Период работы</p>
					<Input
						placeholder="август 2018 — май 2023"
						size="large"
						className="mt-2"
						onChange={e =>
							dispatch(timeSuccess({ id: item.id, time: e.target.value }))
						}
						defaultValue={data.workItems[item.id].time}
					/>
				</div>
			)
		},
		[data.workItems.length]
	)
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="text-xl">Работа</h3>
					<div className="flex flex-col gap-10 w-full">
						{data.workItems.map(item => (
							<HandleWork id={item.id} key={item.id} />
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
							onChange={e => dispatch(descriptionSuccess(e.target.value))}
							defaultValue={data.description}
						/>
						<p className="text-black text-sm font-normal mt-4">
							Ссылка на портфолио
						</p>
						<Input
							placeholder="август 2018 — май 2023"
							size="large"
							className="mt-2"
							onChange={e => dispatch(linkSuccess(e.target.value))}
							defaultValue={data.link}
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
