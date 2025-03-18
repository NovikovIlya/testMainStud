import { Button, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { DeleteSvg } from '../../../../../assets/svg/DeleteSvg'
import { ModalOkSvg } from '../../../../../assets/svg/ModalOkSvg'
import { WarningModalIconSvg } from '../../../../../assets/svg/WarningModalIconSvg'
import {
	useLazyGetAllSupervisorRequestsQuery,
	useLazyGetVacancyViewQuery,
	useRequestDeleteVacancyMutation
} from '../../../../../store/api/serviceApi'
import { setCurrentVacancy } from '../../../../../store/reducers/CurrentVacancySlice'
import { VacancyItemType } from '../../../../../store/reducers/type'
import { useAlert } from '../../../../../utils/Alert/AlertMessage'
import styles from '../../../../../utils/deleteOverwriteAntButton.module.css'

export default function VacancyItem(props: VacancyItemType) {
	const { openAlert } = useAlert()

	const [getVacancy, result] = useLazyGetVacancyViewQuery()
	const navigate = useNavigate()
	const [isModalOpen, setModalOpen] = useState(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [successModalText, setSuccessModalText] = useState<string>('')
	const dispatch = useDispatch()

	const [requestDeleteVacancy, { isLoading: deleteRequestLoading }] = useRequestDeleteVacancyMutation()
	const [getAllRequests] = useLazyGetAllSupervisorRequestsQuery()

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
					open={isSuccessModalOpen}
					onCancel={() => {
						setIsSuccessModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<div className="flex flex-col">
						<div className="w-full flex justify-center">
							{successModalText ===
							'Ваша заявка на удаление вакансии успешно отправлена. Вакансия будет удалена после рассмотрения заявки кадрами.' ? (
								<ModalOkSvg />
							) : (
								<WarningModalIconSvg />
							)}
						</div>
						<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
							{successModalText}
						</p>
						<Button
							className="rounded-[40px] mt-[40px]"
							type="primary"
							onClick={() => {
								setIsSuccessModalOpen(false)
							}}
						>
							ОК
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
					<div className="flex flex-col">
						<div className="w-full flex justify-center">
							<WarningModalIconSvg />
						</div>
						<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
							Вы действительно хотите удалить вакансию?
						</p>
						<div className="mt-[40px] flex gap-[12px] w-full">
							<Button
								className="ml-auto w-full rounded-[54.5px] text-black font-content-font font-medium text-[16px]/[20px] border-black h-[40px]"
								onClick={() => {
									setModalOpen(false)
								}}
							>
								Оставить
							</Button>
							<Button
								className={`${styles.customAntButton}`}
								onClick={async () => {
									try {
										await getAllRequests('DELETE')
											.unwrap()
											.then(requests => {
												let alreadyRequest = requests.content.find(req => {
													return req.vacancy.id === props.id && req.status === 'VERIFYING'
												})
												alreadyRequest
													? (setModalOpen(false),
													  setSuccessModalText(
															'Вы уже отправляли заявку на удаление данной вакансии. Она будет удалена, как только ваша заявка будет рассмотрена.'
													  ),
													  setIsSuccessModalOpen(true))
													: requestDeleteVacancy(props.id)
															.unwrap()
															.then(() => {
																setModalOpen(false)
																setSuccessModalText(
																	'Ваша заявка на удаление вакансии успешно отправлена. Вакансия будет удалена после рассмотрения заявки кадрами.'
																)
																setIsSuccessModalOpen(true)
															})
											})
									} catch (error: any) {
										let errorStr = error.status + ' ' + error.data.message
										openAlert({ type: 'error', text: errorStr })
									}
								}}
								loading={deleteRequestLoading}
							>
								Удалить
							</Button>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="flex w-full bg-white pl-[20px] pr-[55px] pt-[20px] pb-[20px] items-center shadow-custom-shadow">
				<p className="w-[238px] shrink-0 font-content-font font-normal text-[16px]/[19px] text-black">{props.title}</p>
				<div className="ml-[30px] flex gap-[40px] justify-between">
					<p className="w-[104px] font-content-font font-normal text-[16px]/[19px] text-black whitespace-nowrap">
						{props.experience}
					</p>
					<p className="w-[104px] font-content-font font-normal text-[16px]/[19px] text-black whitespace-nowrap">
						{props.employment}
					</p>
				</div>
				<p className="ml-[140px] w-[150px] font-content-font font-normal text-[16px]/[19px] text-black text-balance">
					{props.salary}
				</p>
				<Button
					onClick={() => {
						getVacancy(props.id)
							.unwrap()
							.then(result => {
								dispatch(setCurrentVacancy(result))
								console.log(result)
								console.log(result.acf.responsibilities)
								navigate(`/services/personnelaccounting/supervisor/vacancyview/${props.id}`)
							})
					}}
					className="ml-[60px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
				<Button
					className="ml-[90px]"
					onClick={() => {
						setModalOpen(true)
					}}
					type="text"
					icon={<DeleteSvg />}
				/>
			</div>
		</>
	)
}
