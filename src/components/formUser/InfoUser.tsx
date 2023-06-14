import {
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography
} from '@material-tailwind/react'
import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Layout } from './Layout'

export const InfoUser = () => {
	const navigate = useNavigate()
	const [role, setRole] = useState()
	const handleCancel = () => {
		navigate('/user')
	}
	const handleOk = () => {
		console.log(role)
	}
	const handleChangeRole = (e: React.FormEvent<HTMLDivElement>) => {
		//@ts-ignore
		setRole(e.target.id)
	}
	return (
		<Layout
			descriptions="Для того, чтобы мы настроили личный кабинет персонально для Вас,
					выберите с какой целью Вы регистрировались на сайте:"
			title="Добро пожаловать!"
		>
			<List className="p-0 mt-5" onChange={handleChangeRole}>
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
							/>
						</ListItemPrefix>
						<Typography color="blue-gray" className="font-medium">
							Я школьник. Зарегистрировался для участия в олимпиадах, получения
							дополнительного образования или чтобы поступить в лицей КФУ
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
							/>
						</ListItemPrefix>
						<Typography color="blue-gray" className="font-medium">
							Я абитуриент. Зарегистрировался чтобы узнать больше информации об
							институтах и кафедрах, на которые можно поступить, а также
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
							/>
						</ListItemPrefix>
						<Typography color="blue-gray" className="font-medium">
							Я слушатель. Зарегистрировался, чтобы обучаться новому, проходить
							курсы и получать дополнительное образование
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
							/>
						</ListItemPrefix>
						<Typography color="blue-gray" className="font-medium">
							Я гость. Ещё не определился с какой целью прошёл регистрацию на
							портале, хочу просто посмотреть и определиться потом
						</Typography>
					</label>
				</ListItem>
			</List>

			<div className="border border-[#BDBDBD] border-solid rounded py-6 px-12 px- mt-10">
				<p className="text-center">
					Сейчас Вы выбираете Вашу основную роль, позднее в разделе “Обо мне” Вы
					сможете подключить другие роли, заполнив дополнительную информацию
				</p>
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
		</Layout>
	)
}
