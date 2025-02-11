import { Button, ConfigProvider, Input, Modal, message } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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

	const { control, register, handleSubmit, formState, setValue } = useForm({
		defaultValues: {
			name: '',
			lastname: '',
			middlename: '',
			email: '',
			phone: '',
			vacancy: '',
			resumeFile: null
		}
	})

	const { errors } = formState

	const [messageApi, contextHolder] = message.useMessage()

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
		fetch(`http://${emplBaseURL}employment-api/v1/resume`, {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${token?.replaceAll('"', '')}`
			}
		}).then(response => {
			if (response.ok) {
				setIsOpen(false)
				setIsSuccessModalOpen(true)
			} else {
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

	const formatPhoneNumber = (value: string) => {
		if (!value) return value;

		// Оставляем только цифры
		const cleaned = value.replace(/\D/g, '');

		// Ограничиваем длину номера 11 цифрами
		const trimmed = cleaned.slice(0, 11);

		// Форматируем номер
		let formatted = '';
		if (trimmed.length > 0) {
			formatted += '+7';
		}
		if (trimmed.length > 1) {
			formatted += ` ${trimmed.slice(1, 4)}`;
		}
		if (trimmed.length > 4) {
			formatted += ` ${trimmed.slice(4, 7)}`;
		}
		if (trimmed.length > 7) {
			formatted += `-${trimmed.slice(7, 9)}`;
		}
		if (trimmed.length > 9) {
			formatted += `-${trimmed.slice(9, 11)}`;
		}

		return formatted;
	};

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
								rules={[
									{ required: true, message: 'Фамилия введена некорректно' }, // Отдельное правило
									{ maxLength: 500, message: 'Количество символов было превышено' }, // Отдельное правило
								]}
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
								rules={[
									{ required: true, message: 'Имя введено некорректно' },
									{ maxLength: 500, message: 'Количество символов было превышено' },
								]}
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
								rules={[
								{ required: true, message: 'Отчество введено некорректно' }, // Отдельное правило
								{ maxLength: 500, message: 'Количество символов было превышено' }, // Отдельное правило
							]}
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
								rules={[
									{ required: true, message: 'Отчество введено некорректно' }, // Отдельное правило
									{ maxLength: 500, message: 'Количество символов было превышено' }, // Отдельное правило
								]}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.email && 'border-[#C11616]'}`}
										type="text"
										placeholder="example@mail.com"
										{...field}
									/>
								)}
							/>
							{errors.email && (
								<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
									{errors.email?.message}
								</p>
							)}
							<Controller
								name="phone"
								control={control}
								rules={{
									required: {
										value: true,
										message: 'Телефон введён некорректно',
									},
									validate: (value) => {
										const cleaned = value.replace(/\D/g, ''); // Удаляем всё, кроме цифр
										return cleaned.length === 11 || 'Номер телефона должен содержать 11 цифр';
									},
								}}
								render={({ field }) => {
									const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
										const value = e.target.value.replace(/\D/g, ''); // Удаляем всё, кроме цифр
										const formatted = formatPhoneNumber(value); // Форматируем номер
										field.onChange(formatted); // Обновляем значение поля
									};

									return (
										<Input
											onPressEnter={(e) => e.preventDefault()}
											onChange={handlePhoneChange} // Обработчик ввода
											value={field.value} // Значение поля
											className={`${errors.phone && 'border-[#C11616]'}`}
											type="text"
											placeholder="Моб.телефон"
										/>
									);
								}}
							/>
							{errors.phone && (
								<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
									{errors.phone?.message}
								</p>
							)}
							<Controller
								name="vacancy"
								control={control}
								rules={[
									{ required: true, message: 'Должность введена некорректно' }, // Отдельное правило
									{ maxLength: 1000, message: 'Количество символов было превышено' }, // Отдельное правило
								]}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.vacancy && 'border-[#C11616]'}`}
										type="text"
										placeholder="Желаемая должность"
										{...field}
									/>
								)}
							/>
							{errors.vacancy && (
								<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
									{errors.vacancy?.message}
								</p>
							)}
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
												onChange(event) {
													setFilename(event.target.files?.[0].name)
												}
											})}
										></input>
									</div>
								)}
							/>
						</div>
						{errors.resumeFile && (
							<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
								{errors.resumeFile?.message}
							</p>
						)}
						<p className="w-[80%] whitespace-nowrap text-ellipsis overflow-auto mt-[5px] font-content-font text-[14px]/[14px] font-normal text-black">
							{filename}
						</p>
						<p className="mt-[12px] font-content-font font-normal text-black text-[12px]/[15.53px]">
							Если у вас нет готового резюме скачайте и заполните{' '}
							<a
								className="underline text-black hover:text-black hover:underline"
								href="https://kadry.kpfu.ru/wp-content/uploads/2023/01/01_.zayavlenie.o.prieme.na_.rabotu._list.soglasovaniya__i_o.2022._2_.docx"
							>
								шаблон
							</a>
						</p>
						<Button htmlType="submit" className="ml-auto mt-[40px] rounded-[54.5px]" type="primary">
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
