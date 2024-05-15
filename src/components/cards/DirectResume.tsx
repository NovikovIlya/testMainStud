import { Button, ConfigProvider, Input, Modal, message } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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

	const { control, register, handleSubmit, formState } = useForm({
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
		formData.append('name', data.name)
		formData.append('lastname', data.lastname)
		formData.append('middlename', data.middlename)
		formData.append('email', data.email)
		formData.append('phone', data.phone)
		formData.append('desiredJob', data.vacancy)
		console.log(data)
		fetch('http://localhost:8082/employment-api/v1/resume', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiI2Iiwic2Vzc2lvbklkIjoiMjQwMzIyNzE0ODc1MTk0ODI5NzMzMDkwNDczNTM2NjciLCJzZXNzaW9uSGFzaCI6IkQyQTIyNUE3NDk5RjFDRTE2Q0JFMDJCOUY2QzkxN0UxIiwiZG9jdW1lbnRzSGFzaCI6IkIyNkNCMEMzRThBQzM2RDZBMENCNTEyQ0YzMDIzNzc3IiwibG9naW4iOiJJQU1pdHJvZmFub3YiLCJ0eXBlIjoiU0VFS0VSIn1dLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJhbGxJZCI6IjE3ODQ0MCIsImVtYWlsIjoibWl0cm9fMDJAbWFpbC5ydSJ9.rbdEbs6b2NVFyFa65GW5rpy8VBd7TKpNxaTrVBMh5i0'
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
						<p className="font-content-font font-normal text-black text-[16px]/[20px] mb-[40px]">
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
									required: {
										value: true,
										message: 'Фамилия введена некорректно'
									}
								}}
								render={({ field }) => (
									<Input
										className={`${errors.lastname && 'border-[#C11616]'}`}
										onPressEnter={e => e.preventDefault()}
										type="text"
										placeholder="Фамилия*"
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
									required: {
										value: true,
										message: 'Имя введено некорректно'
									}
								}}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.name && 'border-[#C11616]'}`}
										type="text"
										placeholder="Имя*"
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
									required: {
										value: true,
										message: 'Отчество введено некорректно'
									}
								}}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.middlename && 'border-[#C11616]'}`}
										type="text"
										placeholder="Отчество"
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
									required: {
										value: true,
										message: 'Почта введена некорректно'
									}
								}}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.email && 'border-[#C11616]'}`}
										type="text"
										placeholder="E-mail*"
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
										message: 'Телефон введён некорректно'
									}
								}}
								render={({ field }) => (
									<Input
										onPressEnter={e => e.preventDefault()}
										className={`${errors.phone && 'border-[#C11616]'}`}
										type="text"
										placeholder="Моб.телефон"
										{...field}
									/>
								)}
							/>
							{errors.phone && (
								<p className="font-content-font text-[10px]/[12.94px] font-normal text-[#C11616]">
									{errors.phone?.message}
								</p>
							)}
							<Controller
								name="vacancy"
								control={control}
								rules={{
									required: {
										value: true,
										message: 'Должность введена некорректно'
									}
								}}
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
						<Button
							htmlType="submit"
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
						<div className="leading-7 text-xl font-bold whitespace-nowrap">
							{t(title)}
						</div>
						<div className="text-base w-[85%] font-normal leading-relaxed mt-7 max-[874px]:hidden">
							{t(info)}
						</div>
					</div>
					{img && (
						<div className="mr-6 w-60 justify-center flex max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
							<div
								className={`bg-[#3E89F9] bg-opacity-80 w-[125px] h-[125px] rounded-full absolute -z-10 ${mt}`}
							/>
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
