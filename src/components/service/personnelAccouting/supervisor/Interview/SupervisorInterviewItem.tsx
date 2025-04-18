import { Button, ConfigProvider, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLazyGetInterviewQuery } from '../../../../../store/api/serviceApi'
import { InterviewItemType } from '../../../../../store/reducers/type'

export const SupervisorInterviewItem = (props: InterviewItemType) => {
	interface InterviewButtonElemProps {
		id: any
		format: string
		time: string
	}
	interface InterviewTimeElemProps {
		eventTime: string
	}
	interface InterviewFormatElemProps {
		format: string
	}
	interface CountdownButtonProps {
		id: number
		eventTime: string
		format: string
		url: string
	}

	const [isUnsuccessModalOpen, setIsUnsuccessModalOpen] = useState(false)
	const navigate = useNavigate()

	const seekerName = props.seeker.lastName + ' ' + props.seeker.firstName + ' ' + props.seeker.middleName

	const InterviewCountdownTimeElem = (props: CountdownButtonProps) => {
		const [isInterviewStarted, setIsInterviewStarted] = useState<boolean>(false)
		const [is5MinBeforeInterviewStarted, setIs5MinBeforeInterviewStarted] = useState<boolean>(false)
		const [is30MinAfterInterviewEnded, SetIs30MinAfterInterviewEnded] = useState<boolean>(false)
		const [datePublicString, setDatePublicString] = useState<string>('')
		const [url, setUrl] = useState<string>(props.url)

		const [getInterview] = useLazyGetInterviewQuery()

		useEffect(() => {
			const updateTimeLeft = () => {
				const targetDate = new Date(props.eventTime)
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
					datePublicString += 'Осталось ' + hours + ' ч' + minutes + ' м'
				}
				if (!isDaysEmpty && !isHoursEmpty) {
					datePublicString += 'Осталось ' + days + ' дн ' + hours + ' ч'
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
				return difference
			}

			updateTimeLeft() // Обновляем сразу при монтировании

			const intervalId = setInterval(updateTimeLeft, 1000) // Обновляем каждую секунду

			return () => clearInterval(intervalId) // Очищаем интервал при размонтировании
		}, [props.eventTime])

		useEffect(() => {
			console.log('Собеседование стартовало, подгружаем ссылку')
			is5MinBeforeInterviewStarted &&
				getInterview(props.id)
					.unwrap()
					.then(res => {
						setUrl(res.url)
					})
		}, [is5MinBeforeInterviewStarted])

		return (
			<div className="flex items-center">
				{props.format === 'OFFLINE' && <span className="min-w-[220px] opacity-[0%]"></span>}
				{props.format === 'ONLINE' && !is5MinBeforeInterviewStarted && !isInterviewStarted && (
					<span className="min-w-[220px] flex justify-center bg-[#3073D7] opacity-[32%] text-white font-content-font font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[35px] border-0">
						{datePublicString}
					</span>
				)}
				{props.format === 'ONLINE' && is5MinBeforeInterviewStarted && !isInterviewStarted && (
					<Button
						type="link"
						href={url}
						target="_blank"
						className="cursor-pointer w-[200px] flex justify-center bg-[#3073D7] text-white font-content-font cursor pointer font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[35px] border-0"
					>
						Подключиться
					</Button>
				)}
				{props.format === 'ONLINE' && !is30MinAfterInterviewEnded && isInterviewStarted && (
					<Button
						type="link"
						href={url}
						target="_blank"
						className="cursor-pointer w-[200px] flex justify-center bg-[#3073D7] text-white font-content-font cursor pointer font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[35px] border-0"
					>
						Подключиться
					</Button>
				)}
				{props.format === 'ONLINE' && isInterviewStarted && is30MinAfterInterviewEnded && (
					<span className="min-w-[220px] flex justify-center bg-[#3073D7] opacity-[32%] text-white font-content-font font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[35px] border-0">
						Время истекло
					</span>
				)}
			</div>
		)
	}
	const InterviewTimeElem = (props: InterviewTimeElemProps) => {
		const date: Date = new Date(props.eventTime)

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
		const datePublicString = day + '.' + month + '.' + shortYear + ' '

		return (
			<div className="w-[5%] ml-[3%]">
				<span>
					{datePublicString}
					<br />
					{shortTime}
				</span>
			</div>
		)
	}
	const InterviewFormatElem = (props: InterviewFormatElemProps) => {
		return (
			<div className="w-[5%] ml-[3%] ">
				{props.format === 'OFFLINE' && <span>Оффлайн</span>}
				{props.format === 'ONLINE' && <span>Онлайн</span>}
			</div>
		)
	}
	const InterviewButtonElem = (props: InterviewButtonElemProps) => {
		return (
			<>
				<Button
					onClick={() => {
						navigate(`/services/personnelaccounting/supervisor/invitation/seekerinfo/${props.id}`)
					}}
					className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
			</>
		)
	}
	return (
		<>
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
			<div className="w-full flex bg-white p-5 items-center">
				<span className="w-[22%]">{props.vacancyName}</span>
				<span className="w-[22%] ml-[3%]">{seekerName}</span>
				<InterviewTimeElem eventTime={props.time}></InterviewTimeElem>
				<InterviewFormatElem format={props.format}></InterviewFormatElem>
				<div className="w-[25%] ml-[2%] gap-[3%] flex flex-row items-center justify-between">
					<InterviewCountdownTimeElem eventTime={props.time} format={props.format} url={props.url} id={props.id} />
					<InterviewButtonElem id={props.respondId} format={props.format} time={props.time}></InterviewButtonElem>
				</div>
			</div>
		</>
	)
}
