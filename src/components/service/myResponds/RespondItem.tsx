import { Button, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { DeleteSvg } from '../../../assets/svg/DeleteSvg'
import { WarningModalIconSvg } from '../../../assets/svg/WarningModalIconSvg'
import { useDeleteVacancyRespondMutation, useGetChatIdByRespondIdQuery } from '../../../store/api/serviceApi'
import { closeChat, openChat } from '../../../store/reducers/ChatRespondStatusSlice'
import { setCurrentResponce } from '../../../store/reducers/CurrentResponceSlice'
import { setRespondId } from '../../../store/reducers/CurrentRespondIdSlice'
import { setCurrentVacancyId } from '../../../store/reducers/CurrentVacancyIdSlice'
import { setCurrentVacancyName } from '../../../store/reducers/CurrentVacancyNameSlice'
import { setChatId } from '../../../store/reducers/chatIdSlice'
import { RespondItemType, respondStatus } from '../../../store/reducers/type'
import {useAlert} from "../../../utils/Alert/AlertMessage";

export const RespondItem = (props: RespondItemType & { refetch: Function }) => {
	const { openAlert } = useAlert()

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isModalOpen, setModalOpen] = useState(false)
	const [deleteVacancy, deleteResult] = useDeleteVacancyRespondMutation()

	const {
		data: chatId = {
			id: 0,
			respondInfo: {},
			unreadCount: 0,
			lastMessageDate: ''
		},
		isLoading: isChatIdLoading
	} = useGetChatIdByRespondIdQuery({
		chatId: props.id,
		role: 'SEEKER'
	})

	const handleNavigate = (url: string) => {
		if (props.status) {
			if (
				props.status === respondStatus[respondStatus.INVITATION] ||
				props.status === respondStatus[respondStatus.EMPLOYMENT_REQUEST] ||
				props.status === respondStatus[respondStatus.EMPLOYMENT]
			) {
				dispatch(openChat())
			} else {
				dispatch(closeChat())
			}
		} else {
			dispatch(openChat())
		}
		dispatch(setChatId(chatId.id))
		dispatch(setRespondId(props.id))
		dispatch(setCurrentVacancyId(props.vacancyId))
		navigate(url)
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
					open={isModalOpen}
					onCancel={() => {
						setModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<div className="w-full flex justify-center">
						<WarningModalIconSvg />
					</div>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
						Вы действительно хотите удалить отклик?
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto w-full rounded-[54.5px] text-black font-content-font font-medium text-[16px]/[20px] border-black h-[40px]"
							onClick={() => {
								setModalOpen(false)
							}}
						>
							Оставить
						</Button>
						<button
							className="cursor-pointer flex items-center justify-center border-[1px] border-solid outline-0 border-[#FF5A5A] hover:border-[#FF8181] text-white rounded-[54.5px] bg-[#FF5A5A] hover:bg-[#FF8181] text-[14px] h-[40px] w-full py-[13px]"
							onClick={async () => {
								try {
									await deleteVacancy(props.id)
										.unwrap()
										.then(() => {
											setModalOpen(false)
											props.refetch()
										})
									openAlert({ type: 'success', text: 'Отклик успешно удален' })
								} catch (error: any) {
									let errorStr = error.status + ' ' + error.data.message
									openAlert({ type: 'error', text: errorStr })
								}
							}}
						>
							Удалить
						</button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="w-full mb-[12px] flex items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px] flex-wrap">
				<p className="w-[25%]">{props.name ? props.name : props.desiredJob}</p>
				<p className="ml-[5%] w-[8%]">{props.respondDate.split('-').reverse().join('.')}</p>
				<p className="ml-[2%] w-[25%]">
					{props.status === respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
						? 'на рассмотрении у HR'
						: props.status === respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
						? 'на рассмотрении у руководителя'
						: props.status === respondStatus[respondStatus.INVITATION]
						? 'приглашение'
						: props.status === respondStatus[respondStatus.IN_RESERVE]
						? 'отказано'
						: props.status === respondStatus[respondStatus.EMPLOYMENT_REQUEST]
						? 'приглашение'
						: props.status === respondStatus[respondStatus.EMPLOYMENT]
						? 'трудоустройство'
						: 'отказано'}
				</p>
				<div className="flex ml-auto gap-[12px]">
					<Button
						className="rounded-[54px] font-content-font font-normal text-[16px]/[16px]"
						type="primary"
						onClick={() => {
							dispatch(setCurrentResponce(props.id))
							navigate(`/services/myresponds/responds/fullinfo/${props.id}`)
						}}
					>
						Посмотреть
					</Button>
					{props.name && (
						<Button
							onClick={() => {
								dispatch(setCurrentVacancyName(props.name ? props.name : props.desiredJob))
								handleNavigate(`/services/myresponds/chat/id/${chatId.id}`)
							}}
							className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
						>
							Перейти в чат
						</Button>
					)}
					<Button
						className="rounded-[54.5px] border-solid border-black !px-[16px] !py-[7px] !w-[50px]"
						onClick={() => {
							setModalOpen(true)
						}}
						type="text"
						disabled={
							props.status === respondStatus[respondStatus.IN_RESERVE] ||
							props.status === respondStatus[respondStatus.ARCHIVE]
						}
						icon={<DeleteSvg />}
					/>
				</div>
			</div>
		</>
	)
}
