import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Modal, Select, Spin, Tag, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import uuid from 'react-uuid'

import { AvatartandardSvg } from '../../../../../assets/svg/AvatarStandardSvg'
import { MyDocsSvg } from '../../../../../assets/svg/MyDocsSvg'
import { NocircleArrowIconHover } from '../../../../../assets/svg/NocircleArrowIconHover'
import {
	useEmployeeSeekerRequestMutation,
	useGetInterviewQuery,
	useGetRespondFullInfoQuery,
	useLazyGetSeekerResumeFileQuery
} from '../../../../../store/api/serviceApi'
import { useGetCountriesQuery } from '../../../../../store/api/utilsApi'
import { NocircleArrowIcon } from '../../../jobSeeker/NoCircleArrowIcon'
import { RespondInfoCommon } from '../../RespondInfoCommon'

export const SupervisorInterviewSeekerInfo = () => {
	const [api, contextHolder] = notification.useNotification()

	const { pathname } = useLocation()
	console.log(
		pathname.substring(pathname.substring(0, pathname.lastIndexOf('/')).lastIndexOf('/') + 1, pathname.lastIndexOf('/'))
	)
	console.log(pathname.substring(pathname.lastIndexOf('/') + 1))

	const interviewId = pathname.substring(
		pathname.substring(0, pathname.lastIndexOf('/')).lastIndexOf('/') + 1,
		pathname.lastIndexOf('/')
	)
	const respondId = pathname.substring(pathname.lastIndexOf('/') + 1)

	const { data: foundInterview, isLoading: interviewDataLoading } = useGetInterviewQuery(parseInt(interviewId))

	const format = foundInterview?.format || ''
	const time = foundInterview?.time
	console.log(time)

	const createTimeFormatted = (time: string) => {
		if (time) {
			const date = new Date(time)

			// Получаем локальное время
			const localDate = date.toLocaleString('ru-RU', {
				timeZoneName: 'short',
				hour12: false
			})

			// Преобразуем строку в формат "дд.мм.гг чч:мм"
			const [datePart, timePart] = localDate.split(', ')
			const [day, month, year] = datePart.split('.')

			// Получаем последние две цифры года
			const shortYear: string = year.slice(-2)
			const shortTime: string = timePart.substring(0, 5)

			// Форматируем дату и время
			const timeFormated = `${day}.${month}.${shortYear} в ${shortTime}`

			return timeFormated
		} else {
			console.error('Время не найдено.')
		}
	}
	let timeFormated = createTimeFormatted(time)

	const { data, isLoading: loading } = useGetRespondFullInfoQuery(parseInt(respondId))

	const [getResume, resumeQueryStatus] = useLazyGetSeekerResumeFileQuery()

	const date = new Date()

	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(i18n.language)

	const calculateAge = (birthDateStr: string) => {
		const birthDate = new Date(birthDateStr)
		const currentDate = new Date()

		let age = currentDate.getFullYear() - birthDate.getFullYear()
		const monthDifference = currentDate.getMonth() - birthDate.getMonth()

		// Если день рождения еще не был в этом году, уменьшаем возраст на 1
		if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
			age--
		}

		return age
	}

	const birthday = data?.userData?.birthday
	const age = birthday ? calculateAge(birthday) : undefined

	const updatedDateStr = data?.userData?.birthday.replace(/-/g, '.')

	const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false)

	const [isUnsuccessModalOpen, setIsUnsuccessModalOpen] = useState(false)

	const [rejectSeeker, { isLoading: rejectSeekerLoading }] = useEmployeeSeekerRequestMutation()
	const [aproveSeeker, { isLoading: aproveSeekerLoading }] = useEmployeeSeekerRequestMutation()

	const [isEmploymentRequestSent, setIsEmploymentRequestSent] = useState<boolean>(false)
	const [isSeekerRejected, setIsSeekerRejected] = useState<boolean>(false)

	const [resume, setResume] = useState<string>('')
	const [resumeSize, setResumeSize] = useState<number>(0)

	useEffect(() => {
		getResume(parseInt(respondId))
			.unwrap()
			.then(resume => {
				setResume(prev => resume.href)
				setResumeSize(prev => resume.size)
			})
	}, [])

	interface ComponentProps {
		time: string
		timeFormated: string
		format: string
	}

	if (loading || interviewDataLoading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
					</div>
				</div>
			</>
		)
	}

	const Component = (props: ComponentProps) => {
		const [isInterviewStarted, setIsInterviewStarted] = useState<boolean>(false)
		const [is5MinBeforeInterviewStarted, setIs5MinBeforeInterviewStarted] = useState<boolean>(false)
		const [is30MinAfterInterviewEnded, SetIs30MinAfterInterviewEnded] = useState<boolean>(false)
		const [datePublicString, setDatePublicString] = useState<string>('')

		useEffect(() => {
			const updateTimeLeft = () => {
				const targetDate = new Date(props.time)
				const now = new Date()
				const difference = targetDate.getTime() - now.getTime()
				const minutes: number = Math.ceil((difference / 1000 / 60) % 60)
				const hours: number = Math.floor((difference / (1000 * 60 * 60)) % 24)
				const days: number = Math.floor(difference / (1000 * 60 * 60 * 24))
				let datePublicString: string = ''
				const isDaysEmpty: boolean = days === 0
				const isHoursEmpty: boolean = hours === 0

				if (isDaysEmpty && isHoursEmpty) {
					datePublicString += 'Осталось ' + minutes + ' минут'
				}
				if (isDaysEmpty && !isHoursEmpty) {
					datePublicString += 'Осталось ' + hours + ' ч ' + minutes + ' м'
				}
				if (!isDaysEmpty && !isHoursEmpty) {
					datePublicString += 'Осталось ' + days + ' дн ' + hours + ' ч'
				}
				if (!isDaysEmpty && isHoursEmpty) {
					datePublicString += 'Осталось ' + days + ' дн ' + minutes + ' м'
				}
				setDatePublicString(datePublicString)

				if (difference < 0) {
					setIsInterviewStarted(true)
				} else {
					setIsInterviewStarted(false)
				}

				if (difference > 0 && difference <= 60 * 1000 * 30) {
					// 5 мин
					setIs5MinBeforeInterviewStarted(true)
				} else {
					setIs5MinBeforeInterviewStarted(false)
				}

				if (difference * -1 < 60 * 1000 * 30) {
					SetIs30MinAfterInterviewEnded(false)
				} else {
					SetIs30MinAfterInterviewEnded(true)
				}
				console.log(targetDate)
				console.log(now)
				console.log(difference)
				console.log('Минуты')
				console.log(minutes)
				console.log('Часы')
				console.log(hours)
				console.log('Дни')
				console.log(days)
				return difference
			}

			updateTimeLeft() // Обновляем сразу при монтировании

			const intervalId = setInterval(updateTimeLeft, 1000) // Обновляем каждую секунду

			return () => clearInterval(intervalId) // Очищаем интервал при размонтировании
		}, [props.time])
		return (
			<div className="flex flex-col gap-[30px] mr-[10%]">
				{format === 'OFFLINE' &&
					!is30MinAfterInterviewEnded && ( // Офлайн собес, ожидание
						<div className="flex flex-col justify-center">
							<h3 className=" mb-[20px] font-content-font font-bold text-black text-[16px]/[19.2px]">Собеседование</h3>
							<h4 className=" mb-[10px] font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
								Дата и время:
							</h4>
							<h4 className="font-content-font font-normal text-black text-[16px]/[19.2px]">{props.timeFormated}</h4>
						</div>
					)}
				{format === 'ONLINE' &&
					!isInterviewStarted &&
					!is5MinBeforeInterviewStarted && ( // Онлайн собес, ождиание
						<div className="flex flex-col justify-center">
							<h4 className="mb-[20px] font-content-font font-normal text-black text-[16px]/[19.2px]">
								Подключитесь к онлайн-конференции
							</h4>
							<button className="hover:none h-[40px] w-[257px] cursor-default bg-[#3073D7] opacity-[32%] border-none rounded-[54.5px] text-white text-[16px]/[16px]">
								{datePublicString}
							</button>
						</div>
					)}
				{((format === 'ONLINE' && !isInterviewStarted && is5MinBeforeInterviewStarted) ||
					(format === 'ONLINE' && isInterviewStarted && !is30MinAfterInterviewEnded)) && ( // Онлайн собес, подкбчиться 5 | 30
					<div className="flex flex-col justify-center">
						<h4 className="mb-[20px] font-content-font font-normal text-black text-[16px]/[19.2px]">
							Подключитесь к онлайн-конференции
						</h4>
						<Button
							className="h-[40px] w-[257px] bg-[#3073D7] rounded-[54.5px] text-white text-[16px]/[16px]"
							type="link"
							target="_blank"
							href={foundInterview?.url}
						>
							Подключиться
						</Button>
					</div>
				)}
				{isInterviewStarted &&
					is30MinAfterInterviewEnded && ( // Собес окончился, вынести вердикт
						<div className="flex flex-col justify-center gap-[12px]">
							<Button
								disabled={isEmploymentRequestSent || isSeekerRejected}
								className="h-[40px] w-[257px] bg-[#3073D7] rounded-[54.5px] text-white text-[16px]/[16px]"
								onClick={async values => {
									try {
										await aproveSeeker({
											rejectionReason: 'approve',
											action: 'EMPLOY',
											respondId: parseInt(respondId)
										})
											.unwrap()
											.then(() => {
												setIsEmploymentRequestSent(true)
											})
										api.success({ message: 'Приглашение на работу успешно отправлено', placement: 'bottomRight' })
									} catch (error: any) {
										api.error({ message: t('alertError'), placement: 'bottomRight' })
									}
								}}
								loading={aproveSeekerLoading}
							>
								Пригласить на работу
							</Button>
							<Button
								disabled={isEmploymentRequestSent || isSeekerRejected}
								className=" mr-[50px] h-[40px]  w-[257px] font-content-font font-normal text-black border-[1px] border-black text-[16px]/[16px] rounded-[54.5px]"
								onClick={() => {
									setIsRefuseModalOpen(true)
								}}
								loading={rejectSeekerLoading}
							>
								Отказать
							</Button>
						</div>
					)}
				<Button
					disabled={isEmploymentRequestSent || isSeekerRejected}
					className="h-[40px] w-[257px] bg-[#3073D7] rounded-[54.5px] text-white text-[16px]/[16px]"
					onClick={values => {
						aproveSeeker({
							rejectionReason: 'approve',
							action: 'EMPLOY',
							respondId: parseInt(respondId)
						})
							.unwrap()
							.then(() => {
								setIsEmploymentRequestSent(true)
							})
					}}
				>
					invite without time check
				</Button>
			</div>
		)
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
					bodyStyle={{ padding: 53 }}
					centered
					open={isUnsuccessModalOpen}
					onCancel={() => {
						setIsUnsuccessModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Произошла ошибка или нет ответа от сервера.
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto mr-auto"
							type="primary"
							onClick={() => {
								setIsUnsuccessModalOpen(false)
							}}
						>
							ОК
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="pl-[52px] pr-[10%] py-[140px] w-full">
				<div>
					<button
						onClick={() => {
							window.history.back()
						}}
						className="
										   group
								 		   items-center
								 		   gap-[8px]
								 		   hover:border-[#004EC2]
								 		   outline-0
								 		   hover:bg-white
								 		   transition-all duration-200
								 		   flex bg-inherit
								 		   h-[38px]
								 		   mb-[30px]
								 		   pt-[12px]
								 		   pb-[12px]
								 		   pr-[16px]
								 		   pl-[16px]
								 		   rounded-[50px]
								 		   border
								 		   border-solid
								 		   border-black
								 		   cursor-pointer
								 		  "
					>
						{/* Иконка при наведении */}
						<div className="absolute mt-[3px] group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-200">
							<NocircleArrowIconHover />
						</div>

						{/* Иконка по умолчанию */}
						<div className="mt-[3px] group-hover:opacity-0 group-hover:scale-95 opacity-100 scale-100 transition-all duration-200">
							<NocircleArrowIcon />
						</div>
						<span className="group-hover:text-[#004EC2] transition-all duration-200 text-[14px] font-normal">
							Назад
						</span>
					</button>
				</div>
				<div className="mt-[52px] flex flex-col gap-[36px]">
					<div className="flex justify-between flex-wrap gap-y-[40px]">
						<div className="flex gap-[20px]">
							<div className="flex h-[167px] w-[167px] bg-[#D9D9D9]">
								<AvatartandardSvg />
							</div>
							<div className="flex flex-col gap-[8px]">
								<p className="font-content-font font-normal text-black text-[24px]/[28.8px]">
									{data?.userData?.lastname + ' ' + data?.userData?.firstname + ' ' + data?.userData?.middlename}
								</p>
								<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
									{data?.userData?.sex === 'M' ? 'Мужчина' : ''}
									{data?.userData?.sex === 'Ж' ? 'Женщина' : ''}, {age} года
								</p>
								<div className="flex gap-[36px]">
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
											Дата рождения
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">{updatedDateStr}</p>
									</div>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
											Страна гражданства
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{countries?.find(country => country.id === data?.userData?.countryId)?.shortName}
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-[8px]">
									<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">Контакты:</p>
									<div className="flex gap-[24px]">
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.phone}
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.email}
										</p>
									</div>
								</div>
							</div>
						</div>
						<ConfigProvider
							theme={{
								token: {
									boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
								}
							}}
						>
							<Modal
								centered
								open={isRefuseModalOpen}
								onCancel={() => {
									setIsRefuseModalOpen(false)
								}}
								title={null}
								footer={null}
								width="45%"
							>
								<Form
									layout="vertical"
									requiredMark={false}
									className="p-[20px]"
									onFinish={async values => {
										try {
											await rejectSeeker({
												rejectionReason: values.reason,
												action: 'REJECT',
												respondId: parseInt(respondId)
											})
												.unwrap()
												.then(() => {
													setIsSeekerRejected(true)
												})
											setIsRefuseModalOpen(false)
											api.success({ message: 'Причина отказа успешно отправлена', placement: 'bottomRight' })
										} catch (error: any) {
											api.error({ message: t('alertError'), placement: 'bottomRight' })
										}
									}}
								>
									<h2 className="font-normal text-[18px]">Отказ на должность</h2>
									<h3 className="mb-[40px] font-bold text-[18px]">«{data?.vacancyName}»</h3>
									<Form.Item
										name={'reason'}
										label={
											<label className="mb-[10px] text-black text-[18px]/[18px] font-content-font font-normal">
												Причина отказа
											</label>
										}
										rules={[{ message: 'не выбрана причина отказа' }]}
									>
										<Select
											placeholder="Не хватает опыта"
											options={[
												{
													value: 'Не хватает опыта',
													label: 'Не хватает опыта'
												},
												{
													value: 'Нашли другого специалиста',
													label: 'Нашли другого специалиста'
												}
											]}
										></Select>
									</Form.Item>
									<Button
										className="bg-[#3073D7] text-base rounded-[54.5px] text-white py-[12px] px-[24px]"
										htmlType="submit"
									>
										Отправить
									</Button>
								</Form>
							</Modal>
						</ConfigProvider>
						<Component time={time} format={format} timeFormated={timeFormated}></Component>
					</div>
					<RespondInfoCommon
						res={data!}
						resume={resume}
						resumeSize={resumeSize}
						isSuccess={resumeQueryStatus.isSuccess}
					/>
				</div>
			</div>
		</>
	)
}
