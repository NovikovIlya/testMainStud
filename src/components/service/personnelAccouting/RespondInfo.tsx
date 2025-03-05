import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Margin, usePDF } from 'react-to-pdf'
import uuid from 'react-uuid'

import { AvatartandardSvg } from '../../../assets/svg/AvatarStandardSvg'
import { DeleteIconHoverLaborSvg } from '../../../assets/svg/DeleteIconHoverLaborSvg'
import { DeleteIconLaborSvg } from '../../../assets/svg/DeleteIconLaborSvg'
import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'
import { NocircleArrowIconHover } from '../../../assets/svg/NocircleArrowIconHover'
import { RespondDownload } from '../../../assets/svg/RespondDownload'
import { RespondDownloadHover } from '../../../assets/svg/RespondDownloadHover'
import { useAppSelector } from '../../../store'
import {
	useApproveRespondMutation,
	useGetChatIdByRespondIdQuery,
	useGetRespondFullInfoQuery,
	useLazyGetSeekerResumeFileQuery,
	useLazyGetVacancyViewQuery,
	useSendRespondToArchiveMutation,
	useSendRespondToReserveMutation
} from '../../../store/api/serviceApi'
import { useGetCountriesQuery } from '../../../store/api/utilsApi'
import { setChatFilter } from '../../../store/reducers/ChatFilterSlice'
import { openChat } from '../../../store/reducers/ChatRespondStatusSlice'
import { setRespondId } from '../../../store/reducers/CurrentRespondIdSlice'
import { setCurrentVacancyId } from '../../../store/reducers/CurrentVacancyIdSlice'
import { setChatId } from '../../../store/reducers/chatIdSlice'
import { useAlert } from '../../../utils/Alert/AlertMessage'
import { NocircleArrowIcon } from '../jobSeeker/NoCircleArrowIcon'

import { InviteSeekerForm } from './supervisor/InviteSeekerForm'

export const RespondInfo = (props: { type: 'PERSONNEL_DEPARTMENT' | 'SUPERVISOR' | 'SEEKER' }) => {
	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(i18n.language)

	const { openAlert } = useAlert()

	const currentUrl = window.location.pathname
	const match = currentUrl.match(/\/fullinfo\/(\d+)$/)

	let id_from_url: string | number

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}

	console.log(id_from_url)

	const respondId = useAppSelector(state => state.currentResponce)

	const { data: res } = useGetRespondFullInfoQuery(id_from_url)
	const [approveRespond, { isLoading: approveRespondLoading }] = useApproveRespondMutation()
	const [sendToArchive, { isLoading: sendToArchiveLoading }] = useSendRespondToArchiveMutation()
	const [sendToReserve, { isLoading: sendToReserveLoading }] = useSendRespondToReserveMutation()
	const [getResume, resumeQueryStatus] = useLazyGetSeekerResumeFileQuery()

	const [isRespondSentToSupervisor, setIsRespondSentToSupervisor] = useState<boolean>(
		res?.status === 'IN_SUPERVISOR_REVIEW'
	)
	const [isRespondSentToArchive, setIsRespondSentToArchive] = useState<boolean>(res?.status === 'ARCHIVE')
	const [isRespondSentToReserve, setIsRespondSentToReserve] = useState<boolean>(res?.status === 'IN_RESERVE')
	const [isRespondInvited, setIsRespondInvited] = useState<boolean>(res?.status === 'INVITATION')
	const [isRespondEmployed, setIsRespondEmployed] = useState<boolean>(res?.status === 'EMPLOYMENT_REQUEST')

	const [resume, setResume] = useState<string>('')
	const [resumeSize, setResumeSize] = useState<number>(0)

	const date = new Date()

	const dispatch = useDispatch()

	const {
		data: chatId = {
			id: 0,
			respondInfo: {},
			unreadCount: 0,
			lastMessageDate: ''
		},
		isLoading: isChatIdLoading
	} = useGetChatIdByRespondIdQuery({
		chatId: res ? res.id : 0,
		role: props.type === 'PERSONNEL_DEPARTMENT' ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
	})

	const handleNavigate = (url: string) => {
		dispatch(openChat())
		dispatch(setChatId(chatId.id))
		dispatch(setRespondId(res?.id as number))
		dispatch(setCurrentVacancyId(res?.vacancyId as number))
		navigate(url)
	}

	useEffect(() => {
		setIsRespondSentToSupervisor(
			res?.status === 'IN_SUPERVISOR_REVIEW' || res?.status === 'INVITATION' || res?.status === 'EMPLOYMENT_REQUEST'
		)
		setIsRespondSentToArchive(res?.status === 'ARCHIVE')
		setIsRespondSentToReserve(res?.status === 'IN_RESERVE')
		setIsRespondInvited(res?.status === 'INVITATION')
		setIsRespondEmployed(res?.status === 'EMPLOYMENT_REQUEST')
	}, [res])

	useEffect(() => {
		getResume(respondId.respondId)
			.unwrap()
			.then(resume => {
				setResume(prev => resume.href)
				setResumeSize(prev => resume.size)
			})
	}, [])

	const navigate = useNavigate()

	const { toPDF, targetRef } = usePDF({
		filename: res?.userData?.lastname + ' ' + res?.userData?.firstname + ' ' + res?.userData?.middlename,
		page: {
			margin: Margin.SMALL
		}
	})

	const [buttonsHidden, setIsButtonsHidden] = useState<boolean>(false)

	if (res === undefined) {
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
	} else {
		if (res.type === 'RESPOND') {
			return (
				<>
					<div className="pl-[52px] pr-[10%] py-[60px] mt-[60px] w-full">
						<div>
							<button
								onClick={() => {
									navigate(-1)
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
						<div className="mt-[52px] flex flex-col gap-[36px]" ref={targetRef}>
							<div className="flex flex-wrap gap-[150px]">
								<div className="flex gap-[20px]">
									<div className="flex h-[167px] w-[167px] bg-[#D9D9D9]">
										<AvatartandardSvg />
									</div>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[24px]/[28.8px]">
											{res?.userData?.lastname + ' ' + res?.userData?.firstname + ' ' + res?.userData?.middlename}
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{res.userData?.sex === 'M' ? 'Мужчина' : 'Женщина'},{' '}
											{date.getFullYear() - parseInt(res.userData?.birthday.split('-')[0] as string)}{' '}
											{date.getFullYear() - parseInt(res.userData?.birthday.split('-')[0] as string) >= 10 &&
											date.getFullYear() - parseInt(res.userData?.birthday.split('-')[0] as string) <= 20
												? 'лет'
												: (date.getFullYear() - parseInt(res.userData?.birthday.split('-')[0] as string)) % 10 >= 2 &&
												  (date.getFullYear() - parseInt(res.userData?.birthday.split('-')[0] as string)) % 10 <= 4
												? 'года'
												: (date.getFullYear() - parseInt(res.userData?.birthday.split('-')[0] as string)) % 10 == 1
												? 'год'
												: 'лет'}
										</p>
										<div className="flex gap-[36px]">
											<div className="flex flex-col gap-[8px]">
												<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
													Дата рождения
												</p>
												<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
													{res.userData?.birthday.split('-').reverse().join('.')}
												</p>
											</div>
											<div className="flex flex-col gap-[8px]">
												<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
													Страна гражданства
												</p>
												<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
													{countries?.find(country => country.id === res.userData?.countryId)?.shortName}
												</p>
											</div>
										</div>
										<div className="flex flex-col gap-[8px]">
											<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
												Контакты:
											</p>
											<div className="flex gap-[24px]">
												<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
													{res?.userData?.phone}
												</p>
												<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
													{res?.userData?.email}
												</p>
											</div>
										</div>
									</div>
								</div>
								{props.type === 'PERSONNEL_DEPARTMENT' && (
									<div
										className={`self-center grid grid-cols-2 grid-rows-[40px_40px_40px] gap-x-[12px] gap-y-[12px] ${
											buttonsHidden && 'hidden'
										}`}
									>
										<Button
											onClick={async () => {
												try {
													await approveRespond(respondId.respondId)
														.unwrap()
														.then(() => {
															setIsRespondSentToSupervisor(true)
														})
													openAlert({
														type: 'success',
														text: 'Отклик успешно отправлен руководителю'
													})
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											disabled={isRespondSentToSupervisor || isRespondSentToReserve || isRespondSentToArchive}
											loading={approveRespondLoading}
											type="primary"
											className="font-content-font font-normal text-white text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px]"
										>
											Отправить руководителю
										</Button>
										<Button
											onClick={async () => {
												try {
													await sendToArchive({
														id: respondId.respondId,
														role: 'PERSONNEL_DEPARTMENT'
													})
														.unwrap()
														.then(() => {
															setIsRespondSentToArchive(true)
														})
													openAlert({
														type: 'success',
														text: 'Отклик успешно отправлен в архив'
													})
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											disabled={isRespondSentToSupervisor || isRespondSentToReserve || isRespondSentToArchive}
											loading={sendToArchiveLoading}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Отказать
										</Button>
										<Button
											disabled={isRespondSentToSupervisor || isRespondSentToReserve || isRespondSentToArchive}
											loading={sendToReserveLoading}
											onClick={async () => {
												try {
													await sendToReserve(respondId.respondId)
														.unwrap()
														.then(() => {
															setIsRespondSentToReserve(true)
														})
													openAlert({
														type: 'success',
														text: 'Отклик успешно отправлен в резерв'
													})
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Отправить в резерв
										</Button>
										<Button
											onClick={() => {
												dispatch(
													setChatFilter(
														res.status === 'IN_REVIEW'
															? 'IN_PERSONNEL_DEPT_REVIEW'
															: res.status === 'IN_SUPERVISOR_REVIEW'
															? 'IN_SUPERVISOR_REVIEW'
															: 'INVITATION'
													)
												)
												handleNavigate(`/services/personnelaccounting/chat/id/${chatId.id}`)
											}}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Перейти в чат
										</Button>
										<button
											onClick={() => {
												setIsButtonsHidden(true)
												setTimeout(() => {
													toPDF()
													setIsButtonsHidden(false)
												}, 0)
											}}
											className="
										   group
								 		   items-center
								 		   justify-center
								 		   gap-[8px]
								 		   hover:border-[#004EC2]
								 		   outline-0
								 		   hover:bg-white
								 		   transition-all duration-200
								 		   flex bg-inherit
								 		   h-[38px]
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
											<div className="absolute mr-[62px] mt-[3px] group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-200">
												<RespondDownloadHover />
											</div>

											{/* Иконка по умолчанию */}
											<div className="mt-[3px] group-hover:opacity-0 group-hover:scale-95 opacity-100 scale-100 transition-all duration-200">
												<RespondDownload />
											</div>
											<span className="group-hover:text-[#004EC2] transition-all duration-200 text-[16px] font-normal">
												Скачать
											</span>
										</button>
									</div>
								)}
								{props.type === 'SUPERVISOR' && (
									<div
										className={`self-center grid grid-cols-1 grid-rows-[40px_40px_40px] gap-y-[12px] ${
											buttonsHidden && 'hidden'
										}`}
									>
										<InviteSeekerForm
											respondId={respondId.respondId}
											isButtonDisabled={isRespondSentToArchive || isRespondInvited || isRespondEmployed}
											callback={() => {
												setIsRespondInvited(true)
											}}
										/>
										<Button
											disabled={isRespondSentToArchive || isRespondInvited || isRespondEmployed}
											onClick={async () => {
												try {
													await sendToArchive({
														id: respondId.respondId,
														role: 'SUPERVISOR'
													})
														.unwrap()
														.then(() => {
															setIsRespondSentToArchive(true)
														})
													openAlert({ type: 'success', text: 'Резюме успешно отклонено' })
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											loading={sendToArchiveLoading}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[257px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Отказать
										</Button>
										<button
											onClick={() => {
												setIsButtonsHidden(true)
												setTimeout(() => {
													toPDF()
													setIsButtonsHidden(false)
												}, 0)
											}}
											className="
                        						group
                        						items-center
                        						justify-center
                        						gap-[8px]
                        						hover:border-[#004EC2]
                        						outline-0
                        						hover:bg-white
                        						transition-all duration-200
                        						flex bg-inherit
                        						h-[38px]
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
											<div className="absolute mr-[62px] mt-[3px] group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-200">
												<RespondDownloadHover />
											</div>

											{/* Иконка по умолчанию */}
											<div className="mt-[3px] group-hover:opacity-0 group-hover:scale-95 opacity-100 scale-100 transition-all duration-200">
												<RespondDownload />
											</div>
											<span className="group-hover:text-[#004EC2] transition-all duration-200 text-[16px] font-normal">
												Скачать
											</span>
										</button>
									</div>
								)}
							</div>
							<hr />
							<div className="flex flex-col gap-[24px]">
								<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
									Сопроводительное письмо
								</p>
								<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
									{res.respondData.coverLetter}
								</p>
							</div>
							<hr />
							<div className="flex flex-col gap-[24px]">
								<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">Образование</p>
								<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
									{res.educations.map(edu => (
										<>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">{edu.endYear}</p>
											<div className="flex flex-col gap-[8px]">
												<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">
													{edu.nameOfInstitute + ', ' + edu.country}
												</p>
												<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
													{edu.speciality === null ? '' : edu.speciality + ', '}
													{edu.educationLevel}
												</p>
											</div>
										</>
									))}
								</div>
							</div>
							<hr />
							<div className="flex flex-col gap-[24px]">
								<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">Опыт работы</p>
								{res.respondData.portfolio.workExperiences.length === 0 ? (
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
										Соискатель не имеет опыта работы
									</p>
								) : (
									<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
										{res.respondData.portfolio.workExperiences.map(exp => (
											<>
												<div className="flex flex-col gap-[4px]">
													<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
														{exp.beginWork.substring(0, 4)}-
														{parseInt(exp.endWork.substring(0, 4)) === date.getFullYear()
															? 'по наст.время'
															: exp.endWork.substring(0, 4)}
													</p>
													<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
														{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) === 0
															? ''
															: parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4))}
														{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) === 1 &&
															' год'}
														{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) >= 2 &&
															parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) <= 4 &&
															' года'}
														{parseInt(exp.endWork.substring(0, 4)) - parseInt(exp.beginWork.substring(0, 4)) > 4 &&
															' лет'}
													</p>
												</div>
												<div className="flex flex-col gap-[8px]">
													<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">{exp.position}</p>
													<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
														{exp.workPlace}
													</p>
													<p className="font-content-font font-normal text-black text-[14px]/[16.8px]">{exp.duties}</p>
												</div>
											</>
										))}
									</div>
								)}
								{res.respondData.portfolio.url !== '' && (
									<div className="grid grid-cols-[164px_auto] gap-x-[50px] gap-y-[24px] w-[90%]">
										<p>Ссылка на портфолио:</p>
										<a href={res.respondData.portfolio.url} target="_blank">
											{res.respondData.portfolio.url}
										</a>
									</div>
								)}
								{resumeQueryStatus.isSuccess && (
									<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">Резюме</p>
										<div className="bg-white rounded-[16px] shadow-custom-shadow h-[59px] w-[65%] p-[20px] flex">
											<MyDocsSvg />
											<p
												className="ml-[20px] font-content-font font-normal text-black text-[16px]/[19.2px] underline cursor-pointer"
												onClick={() => {
													const link = document.createElement('a')
													link.href = resume
													link.download = 'Резюме'
													link.click()
												}}
											>
												{'Резюме ' +
													res.userData?.lastname +
													' ' +
													res.userData?.firstname +
													' ' +
													res.userData?.middlename}
											</p>
											<p className="ml-auto font-content-font font-normal text-black text-[16px]/[19.2px] opacity-70">
												{Math.round(resumeSize / 1000000) > 0
													? Math.round(resumeSize / 1000000) + ' Мб'
													: Math.round(resumeSize / 1000) > 0
													? Math.round(resumeSize / 1000) + ' Кб'
													: resumeSize + ' б'}
											</p>
										</div>
									</div>
								)}
							</div>
							<hr />
							<div className="flex flex-col gap-[24px]">
								<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">О себе</p>
								<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
									{res.respondData.skills.aboutMe}
								</p>
							</div>
							<hr />
							<div className="flex flex-col">
								<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40 w-[194px]">
									Профессиональные навыки
								</p>
								<div className="grid grid-cols-[194px_auto] gap-x-[20px] w-[90%]">
									{/* <div className="col-start-2">
									{res.respondData.skills.aboutMe}
								</div> */}
									<div className="col-start-2 flex gap-[8px] flex-wrap">
										{res.respondData.skills.keySkills.map(skill => (
											<Tag
												className="bg-black bg-opacity-10 rounded-[40px] py-[8px] px-[16px] font-content-font font-normal text-black text-[16px]/[19.2px]"
												key={uuid()}
											>
												{skill}
											</Tag>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)
		} else {
			return (
				<>
					<div className="pl-[52px] pr-[10%] py-[60px] w-full mt-[60px]">
						<div>
							<Button
								onClick={() => {
									navigate(-1)
								}}
								className="bg-inherit h-[38px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
							>
								<NocircleArrowIcon />
								Назад
							</Button>
						</div>
						<div className="mt-[52px] flex flex-col gap-[36px]">
							<div className="flex flex-wrap gap-[150px]">
								<div className="flex gap-[20px]">
									<div className="flex h-[167px] w-[167px] bg-[#D9D9D9]">
										<AvatartandardSvg />
									</div>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[24px]/[28.8px]">
											{res?.userData?.lastname + ' ' + res?.userData?.firstname + ' ' + res?.userData?.middlename}
										</p>
										<div className="flex flex-col gap-[8px]">
											<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
												Контакты:
											</p>
											<div className="flex gap-[24px]">
												<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
													{res?.userData?.phone}
												</p>
												<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
													{res?.userData?.email}
												</p>
											</div>
										</div>
									</div>
								</div>
								{props.type === 'PERSONNEL_DEPARTMENT' && (
									<div className={`self-center grid grid-cols-2 grid-rows-[40px_40px_40px] gap-x-[12px] gap-y-[12px]`}>
										<Button
											onClick={async () => {
												try {
													await approveRespond(respondId.respondId)
														.unwrap()
														.then(() => {
															setIsRespondSentToSupervisor(true)
														})
													openAlert({ type: 'success', text: 'Отклик успешно отправлен руководителю' })
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											disabled={isRespondSentToSupervisor || isRespondSentToReserve || isRespondSentToArchive}
											loading={approveRespondLoading}
											type="primary"
											className="font-content-font font-normal text-white text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px]"
										>
											Отправить руководителю
										</Button>
										<Button
											onClick={async () => {
												try {
													await sendToArchive({
														id: respondId.respondId,
														role: 'PERSONNEL_DEPARTMENT'
													})
														.unwrap()
														.then(() => {
															setIsRespondSentToArchive(true)
														})
													openAlert({ type: 'success', text: 'Отклик успешно отправлен в архив' })
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											disabled={isRespondSentToSupervisor || isRespondSentToReserve || isRespondSentToArchive}
											loading={sendToArchiveLoading}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Отказать
										</Button>
										<Button
											disabled={isRespondSentToSupervisor || isRespondSentToReserve || isRespondSentToArchive}
											onClick={async () => {
												try {
													await sendToReserve(respondId.respondId)
														.unwrap()
														.then(() => {
															setIsRespondSentToReserve(true)
														})
													openAlert({ type: 'success', text: 'Отклик успешно отправлен в резерв' })
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											loading={sendToReserveLoading}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Отправить в резерв
										</Button>
										<Button
											onClick={() => {
												handleNavigate(`/services/personnelaccounting/chat/id/${chatId.id}`)
											}}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Перейти в чат
										</Button>
									</div>
								)}
								{props.type === 'SUPERVISOR' && (
									<div className={`self-center grid grid-cols-1 grid-rows-[40px_40px_40px] gap-y-[12px]`}>
										<InviteSeekerForm
											respondId={respondId.respondId}
											isButtonDisabled={isRespondSentToArchive || isRespondInvited || isRespondEmployed}
											callback={() => {
												setIsRespondInvited(true)
											}}
										/>
										<Button
											disabled={isRespondSentToArchive || isRespondInvited || isRespondEmployed}
											loading={sendToArchiveLoading}
											onClick={async () => {
												try {
													await sendToArchive({
														id: respondId.respondId,
														role: 'SUPERVISOR'
													})
														.unwrap()
														.then(() => {
															setIsRespondSentToArchive(true)
														})
													openAlert({ type: 'success', text: 'Отклик успешно отправлен в архив' })
												} catch (error: any) {
													openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
												}
											}}
											className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[257px] h-[40px] py-[8px] px-[24px] border-black"
										>
											Отказать
										</Button>
									</div>
								)}
							</div>
							<hr />
							<div className="flex flex-col gap-[24px]">
								<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">Желаемая должность</p>
									<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">{res?.desiredJob}</p>
								</div>
							</div>
							<hr />
							<div className="flex flex-col gap-[24px]">
								<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">Резюме</p>
									<div className="bg-white rounded-[16px] shadow-custom-shadow h-[59px] w-[65%] p-[20px] flex">
										<MyDocsSvg />
										<p
											className="ml-[20px] font-content-font font-normal text-black text-[16px]/[19.2px] underline cursor-pointer"
											onClick={() => {
												const link = document.createElement('a')
												link.href = resume
												link.download = 'Резюме'
												link.click()
											}}
										>
											{'Резюме ' +
												res.userData?.lastname +
												' ' +
												res.userData?.firstname +
												' ' +
												res.userData?.middlename}
										</p>
										<p className="ml-auto font-content-font font-normal text-black text-[16px]/[19.2px] opacity-70">
											{resumeSize}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)
		}
	}
}
