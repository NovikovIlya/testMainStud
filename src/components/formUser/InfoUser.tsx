import {
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography
} from '@material-tailwind/react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store'
import { roleSuccess } from '../../store/reducers/FormReducers/InfoUserReducer'

import { ImagesLayout } from './ImagesLayout'

export const InfoUser = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const role = useAppSelector(state => state.InfoUser.role)

	const handleOk = () => {
		if (role !== '') {
			navigate('/form')
		}
	}

	return (
		<ImagesLayout first>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center  px-5">
					<h2 className="text-center text-2xl font-bold border-solid border-0 border-b-2 border-[#3073D7] pb-2">
						Добро пожаловать КФУ!
					</h2>

					<p className="mt-8 text-center text-sm font-bold px-7">
						Для того, чтобы мы настроили личный кабинет персонально для Вас,
						выберите с какой целью Вы регистрировались на сайте:
					</p>

					<List className="p-0 mt-5 ">
						<ListItem className="p-0 ">
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
											dispatch(roleSuccess('schoolboy'))
										}}
										checked={role === 'schoolboy' ? true : false}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
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
											dispatch(roleSuccess('enrollee'))
										}}
										checked={role === 'enrollee' ? true : false}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
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
											dispatch(roleSuccess('listener'))
										}}
										checked={role === 'listener' ? true : false}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
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
											dispatch(roleSuccess('applicant'))
										}}
										checked={role === 'applicant' ? true : false}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
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
											dispatch(roleSuccess('guest'))
										}}
										checked={role === 'guest' ? true : false}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
									Я гость. Ещё не определился с какой целью прошёл регистрацию
									на портале, хочу просто посмотреть и определиться потом
								</Typography>
							</label>
						</ListItem>
					</List>

					<div className="border border-[#BDBDBD] border-solid rounded py-6 px-12 px- mt-10">
						<p className="text-center text-sm">
							Сейчас Вы выбираете Вашу основную роль, позднее в разделе “Обо
							мне” Вы сможете подключить другие роли, заполнив дополнительную
							информацию
						</p>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px] ">
						<Button
							disabled
							type="default"
							className="w-[200px] h-[50px] rounded-full cursor-default font-bold border-[#3073D7] text-[#3073D7]"
						>
							Назад
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] h-[50px] rounded-full font-bold"
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
