import {
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography
} from '@material-tailwind/react'
import { Button } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { roleType } from '../../api/types'
import { infoUserSuccess } from '../../store/reducers/FormReducer'

import { ImagesLayout } from './ImagesLayout'

export const InfoUser = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [role, setRole] = useState<roleType>('')

	const handleCancel = () => {
		navigate('/user')
	}
	const handleOk = () => {
		saveInStore()
		navigate('/form')
	}
	const saveInStore = () => {
		if (role !== '') {
			dispatch(infoUserSuccess(role))
		}
	}
	const handleChangeRole = (e: roleType) => {
		setRole(e)
	}
	return (
		<ImagesLayout first>
			<div className="w-full mt-[-80px] flex justify-center items-center min-h-screen">
				<div className="container max-w-2xl flex flex-col items-center justify-center  p-5">
					<h2 className="text-center font-bold border-solid border-0 border-b-2 border-[#3073D7] pb-2">
						Добро пожаловать КФУ!
					</h2>

					<p className="mt-8 text-center font-bold px-7">
						Для того, чтобы мы настроили личный кабинет персонально для Вас,
						выберите с какой целью Вы регистрировались на сайте:
					</p>

					<List className="p-0 mt-5">
						<ListItem className="p-0">
							<label
								htmlFor="0"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="0"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										onChange={() => {
											handleChangeRole('schoolboy')
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Я школьник. Зарегистрировался для участия в олимпиадах,
									получения дополнительного образования или чтобы поступить в
									лицей КФУ
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="1"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="1"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										onChange={() => {
											handleChangeRole('enrollee')
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Я абитуриент. Зарегистрировался чтобы узнать больше информации
									об институтах и кафедрах, на которые можно поступить, а также
									подготовитьсяк ЕГЭ
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="2"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="2"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										onChange={() => {
											handleChangeRole('listener')
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Я слушатель. Зарегистрировался, чтобы обучаться новому,
									проходить курсы и получать дополнительное образование
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="3"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="3"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										onChange={() => {
											handleChangeRole('applicant')
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Я соискатель. Зарегистрировался чтобы иметь возможность
									просматривать актуальные вакансии и отправлять своё резюме для
									трудоустройства
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="4"
								className="px-3 py-2 flex items-start mt-1 w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="4"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										onChange={() => {
											handleChangeRole('guest')
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Я гость. Ещё не определился с какой целью прошёл регистрацию
									на портале, хочу просто посмотреть и определиться потом
								</Typography>
							</label>
						</ListItem>
					</List>

					<div className="border border-[#BDBDBD] border-solid rounded py-6 px-12 px- mt-10">
						<p className="text-center">
							Сейчас Вы выбираете Вашу основную роль, позднее в разделе “Обо
							мне” Вы сможете подключить другие роли, заполнив дополнительную
							информацию
						</p>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							disabled
							type="default"
							className="w-[200px] h-[50px] rounded-full cursor-default border-[#3073D7] text-[#3073D7]"
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
					<Button type="text" className="rounded-full w-[200px] h-[50px] mt-8">
						Заполнить позже
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}
