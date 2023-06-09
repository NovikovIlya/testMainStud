import {
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography
} from '@material-tailwind/react'
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { Button } from 'antd'

type TypeInfoUserModal = {
	isOpen: boolean
	close: (value: boolean) => void
}

export const InfoUserModal = ({ isOpen, close }: TypeInfoUserModal) => {
	const handleOk = () => {
		close(false)
	}

	const handleCancel = () => {
		close(false)
	}

	return (
		<Dialog
		open={isOpen}
        size='xxl'
        handler={close}
		className='min-h-screen h-full'
      >
        <DialogBody divider className='w-full flex justify-center h-full'>
		<div className="container max-w-2xl flex flex-col items-center justify-center h-screen p-5">
				<h2 className="text-center font-bold">Добро пожаловать!</h2>
				
				<p className="mt-5 text-center font-bold px-7">
					Для того, чтобы мы настроили личный кабинет персонально для Вас,
					выберите с какой целью Вы регистрировались на сайте:
				</p>

				<List className="mt-5 max-w-2xl">
					<ListItem className="p-0 ">
						<label
							htmlFor="vertical-list-react"
							className=" py-2 flex items-start w-full cursor-pointer"
						>
							<ListItemPrefix className="mr-3">
								<Radio
									name="vertical-list"
									id="vertical-list-react"
									ripple={false}
									className="hover:before:opacity-0 w-4 h-4 mt-1"
									containerProps={{
										className: 'p-0'
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
							htmlFor="vertical-list-vue"
							className=" py-2 flex items-start w-full cursor-pointer"
						>
							<ListItemPrefix className="mr-3">
								<Radio
									name="vertical-list"
									id="vertical-list-vue"
									ripple={false}
									className="hover:before:opacity-0 w-4 h-4 mt-1"
									containerProps={{
										className: 'p-0'
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
							htmlFor="vertical-list-svelte"
							className=" py-2 flex items-start w-full cursor-pointer"
						>
							<ListItemPrefix className="mr-3">
								<Radio
									name="vertical-list"
									id="vertical-list-svelte"
									ripple={false}
									className="hover:before:opacity-0 w-4 h-4 mt-1"
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
							htmlFor="vertical-list-next"
							className=" py-2 flex items-start w-full cursor-pointer"
						>
							<ListItemPrefix className="mr-3">
								<Radio
									name="vertical-list"
									id="vertical-list-next"
									ripple={false}
									className="hover:before:opacity-0 w-4 h-4 mt-1"
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
						Сейчас Вы выбираете Вашу основную роль, позднее в разделе “Обо мне”
						Вы сможете подключить другие роли, заполнив дополнительную
						информацию
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
			</div>
        </DialogBody>
      </Dialog>

	)
}
