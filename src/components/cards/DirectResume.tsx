import { Button, ConfigProvider, Input, Modal, message } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DeleteSvg } from '../../assets/svg/DeleteSvg'
import { ModalOkSvg } from '../../assets/svg/ModalOkSvg'
import { useAppSelector } from '../../store'
import { useLazyGetInfoUserQuery } from '../../store/api/formApi'
import { AttachIcon } from '../service/jobSeeker/AttachIcon'

type formDataType = {
	name: string
	lastname: string
	middlename: string
	email: string
	phone: string
	vacancy: string
	resumeFile: FileList | null
}

type SessionProps = {
	title: string
	info: string
	href: string
	img?: string
	width?: number
	height?: number
	buttonText?: string
	buttonType?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
	mt?: string
	positionImage?: string
	isRounded?: boolean
}

export const DirectResume = ({
	href,
	img,
	info,
	title,
	height = 112,
	width = 112,
	buttonText = 'Посмотреть',
	mt = 'mt-3',
	positionImage,
	isRounded,
	buttonType = 'default'
}: SessionProps) => {
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [filename, setFilename] = useState<string | undefined>('')
	const [isPatronymicSet, setIsPatronymicSet] = useState<boolean>(false)
	const [buttonLoading, setButtonLoading] = useState<boolean>(false)
	const envs = import.meta.env
	const defEnvs = import.meta.env
	const host = import.meta.env.REACT_APP_HOST
	const port = import.meta.env.REACT_APP_PORT
	const emplBaseURL = `${host ? host : 'localhost'}:${port ? port : 8082}/`

	console.log(host)
	console.log(port)
	console.log(envs)
	console.log(defEnvs)

	const token = useAppSelector(state => state.auth.accessToken)
	const user = useAppSelector(state => state.auth.user)
	const aboutMeData = useAppSelector(state => state.seekerAboutMe)

	const [getInfo] = useLazyGetInfoUserQuery()

	const { control, register, handleSubmit, formState, setValue, watch } = useForm<formDataType>({
		defaultValues: {
			name: '',
			lastname: '',
			middlename: '',
			email: '',
			phone: '',
			vacancy: '',
			resumeFile: null
		},
		mode: 'onChange'
	})

	const { errors } = formState

	const [messageApi, contextHolder] = message.useMessage()

	const handleKeyDownPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			' ',
			'(',
			')',
			'-',
			'+',
			'Backspace',
			'Delete',
			'ArrowLeft',
			'ArrowRight'
		]

		if (!allowedKeys.includes(e.key)) {
			e.preventDefault()
		}
	}

	const handleKeyDownEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
			'@',
			'.',
			'_',
			'%',
			'+',
			'-',
			'Backspace',
			'Delete',
			'ArrowLeft',
			'ArrowRight'
		]

		if (!allowedKeys.includes(e.key)) {
			e.preventDefault()
		}
	}

	const onSubmit: SubmitHandler<formDataType> = data => {
		const formData = new FormData()
		data.resumeFile && formData.append('resumeFile', data.resumeFile[0])
		formData.append('firstname', data.name)
		formData.append('lastname', data.lastname)
		formData.append('middlename', data.middlename)
		formData.append('email', data.email)
		formData.append('phone', data.phone)
		formData.append('desiredJob', data.vacancy)
		console.log(data)
		setButtonLoading(true)
		fetch(`http://${emplBaseURL}employment-api/v1/resume`, {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${token?.replaceAll('"', '')}`
			}
		}).then(response => {
			if (response.ok) {
				setButtonLoading(false)
				setIsOpen(false)
				setIsSuccessModalOpen(true)
			} else {
				setButtonLoading(false)
				response.json().then(data => {
					messageApi.open({ type: 'error', content: data.errors[0].message })
				})
			}
		})
	}

	useEffect(() => {
		if (user) {
			getInfo()
				.unwrap()
				.then(info => {
					setValue('name', info.name)
					setValue('lastname', info.surName)
					info.patronymic !== '' && (setValue('middlename', info.patronymic), setIsPatronymicSet(true))
					setValue('email', user.email)
					setValue('phone', info.phone)
				})
		}
	}, [])

	return (
		<>
			{contextHolder}

			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					centered
					open={isSuccessModalOpen}
					bodyStyle={{
						padding: '26px'
					}}
					width={407}
					className="pr-[52px] pl-[52px] pb-[52px]"
					footer={null}
					title={null}
					onCancel={() => {
						setIsSuccessModalOpen(false)
					}}
				>
					<div className="text-center">
						<div className="w-full flex justify-center">
							<ModalOkSvg />
						</div>
						<p className="font-content-font font-normal text-black text-[16px]/[20px] mt-[22px] mb-[40px]">
							Спасибо, ваше резюме успешно отправлено
						</p>
						<Button
							type="primary"
							className="w-full rounded-[55.5px]"
							onClick={() => {
								setIsSuccessModalOpen(false)
							}}
						>
							Ок
						</Button>
					</div>
				</Modal>
			</ConfigProvider>

			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					open={isOpen}
					onCancel={() => {
						setIsOpen(false)
					}}
					title={null}
					footer={null}
				>
					<form className="p-[26px]" onSubmit={handleSubmit(onSubmit)}>
						<p className="font-content-font font-normal text-black text-[18px]/[18px] text-opacity-80">
							Отправьте своё резюме
						</p>
						<div className="flex flex-col gap-[8px] mt-[24px]">
							<Controller
								name="lastname"
								control={control}
								rules={{
									required: { value: true, message: 'Не введена фамилия' },
									maxLength: { value: 1000, message: 'Количество символов превышено' }
								}}
								render={({ field }) => (
									<Input
										className={`${errors.lastname && 'border-[#C11616]'}`}
										onPressEnter={e => e.preventDefault()}
										type="text"
										placeholder="Фамилия*"
										disabled
										{...field}
									/>
								)}
							/>
							{errors.lastname && (
								<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
									{errors.lastname?.message}
								</p>
							)}
							<Controller
								name="name"
								control={control}
								rules={{
									required: { value: true, message: 'Не введено имя' },
									maxLength: { value: 1000, message: 'Количество символов превышено' }
								}}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.name && 'border-[#C11616]'}`}
										type="text"
										placeholder="Имя*"
										disabled
										{...field}
									/>
								)}
							/>
							{errors.name && (
								<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
									{errors.name?.message}
								</p>
							)}
							<Controller
								name="middlename"
								control={control}
								rules={{
									required: { value: true, message: 'Не введено отчество' },
									maxLength: { value: 1000, message: 'Количество символов превышено' }
								}}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.middlename && 'border-[#C11616]'}`}
										type="text"
										placeholder="Отчество"
										disabled={isPatronymicSet}
										{...field}
									/>
								)}
							/>
							{errors.middlename && (
								<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
									{errors.middlename?.message}
								</p>
							)}
							<Controller
								name="email"
								control={control}
								rules={{
									required: 'Поле email обязательно для заполнения',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: 'Введите корректный адрес электронной почты'
									},
									maxLength: {
										value: 500,
										message: 'Количество символов было превышено'
									}
								}}
								render={({ field, fieldState: { error } }) => (
									<div>
										<Input
											{...field}
											onKeyDown={handleKeyDownEmail}
											onPressEnter={e => e.preventDefault()}
											className={error ? 'border-[#C11616]' : ''}
											type="text"
											placeholder="example@mail.com"
										/>
										{errors.email && (
											<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
												{errors.email?.message}
											</p>
										)}
									</div>
								)}
							/>

							<Controller
								name="phone"
								control={control}
								rules={{
									required: {
										value: true,
										message: 'Телефон введён некорректно'
									}
								}}
								render={({ field }) => (
									<div>
										<Input
											{...field}
											onKeyDown={handleKeyDownPhone}
											onPressEnter={e => e.preventDefault()}
											value={field.value}
											className={errors.phone ? 'border-[#C11616]' : ''}
											type="text"
											placeholder="Моб.телефон"
										/>
										{errors.phone && (
											<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
												{errors.phone.message}
											</p>
										)}
									</div>
								)}
							/>
							<Controller
								name="vacancy"
								control={control}
								rules={{
									required: { value: true, message: 'Не введена должность' },
									maxLength: { value: 1000, message: 'Количество символов превышено' }
								}}
								render={({ field }) => (
									<div>
										<Input
											onPressEnter={e => e.preventDefault()}
											className={`${errors.vacancy && 'border-[#C11616]'}`}
											type="text"
											placeholder="Желаемая должность"
											{...field}
										/>
										{errors.vacancy && (
											<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
												{errors.vacancy?.message}
											</p>
										)}
									</div>
								)}
							/>
						</div>
						<div className="flex gap-[18px] mt-[36px]">
							<AttachIcon />
							<Controller
								name="resumeFile"
								control={control}
								render={({ field }) => (
									<div>
										<label
											htmlFor="files"
											className="text-black text-[16px]/[16px] font-content-font font-normal cursor-pointer underline"
										>
											Прикрепить резюме
										</label>
										<input
											id="files"
											type="file"
											className="hidden"
											{...register('resumeFile', {
												required: {
													value: true,
													message: 'Пожалуйста, прикрепите резюме'
												},
												validate: {
													// Проверка размера файла (не более 10 МБ)
													fileSize: fileList => {
														console.log('Валидация')
														const file = fileList?.[0]
														if (file && file.size > 10 * 1024 * 1024) {
															console.log('Не подходит')
															return 'Размер файла не должен превышать 10 МБ'
														}
													}
												},
												onChange: event => {
													const file = event.target.files?.[0]
													if (file) {
														setFilename(file.name)
													}
												}
											})}
										/>
									</div>
								)}
							/>
						</div>
						{errors.resumeFile && (
							<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
								{errors.resumeFile?.message}
							</p>
						)}
						<div className="flex w-full items-center justify-between">
							<p className="max-w-[80%] whitespace-nowrap text-ellipsis mt-[5px] font-content-font text-[14px]/[14px] font-normal text-black">
								{filename}
							</p>
							{watch('resumeFile') !== null && (
								<Button
									icon={<DeleteSvg />}
									type="text"
									onClick={() => {
										setValue('resumeFile', null, { shouldValidate: true })
										setFilename('')
									}}
								/>
							)}
						</div>
						<p className="mt-[12px] font-content-font font-normal text-black text-[12px]/[15.53px]">
							Если у вас нет готового резюме скачайте и заполните{' '}
							<a
								className="underline text-black hover:text-black hover:underline"
								href="https://kadry.kpfu.ru/wp-content/uploads/2023/01/01_.zayavlenie.o.prieme.na_.rabotu._list.soglasovaniya__i_o.2022._2_.docx"
							>
								шаблон
							</a>
						</p>
						<Button
							htmlType="submit"
							loading={buttonLoading}
							className="ml-auto mt-[40px] rounded-[54.5px]"
							type="primary"
						>
							Отправить
						</Button>
					</form>
				</Modal>
			</ConfigProvider>
			<div className="flex flex-col px-7 py-8 justify-between h-full max-[874px]:p-0 max-[874px]:py-3 max-[874px]:items-center ">
				<div className="flex max-[874px]:flex-col max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
					<div className="text-left">
						<div className="leading-7 text-xl font-bold whitespace-nowrap">{t(title)}</div>
						<div className="text-base w-[85%] font-normal leading-relaxed mt-7 max-[874px]:hidden">{t(info)}</div>
					</div>
					{img && (
						<div className="mr-6 w-60 justify-center flex max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
							<div className={`bg-[#3E89F9] bg-opacity-80 w-[125px] h-[125px] rounded-full absolute -z-10 ${mt}`} />
							<img
								src={img}
								width={width}
								height={height}
								alt=""
								className={clsx(positionImage, isRounded && 'rounded-full')}
							/>
						</div>
					)}
				</div>

				<Button
					type={buttonType}
					onClick={() => {
						setIsOpen(true)
					}}
					className="rounded-full w-[200px] h-[50px] max-[874px]:hidden flex items-center justify-center no-underline"
				>
					{t(buttonText)}
				</Button>
			</div>
		</>
	)
}
