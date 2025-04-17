import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Modal, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../assets/svg/ModalOkSvg'
import { WarningModalIconSvg } from '../../../assets/svg/WarningModalIconSvg'
import {
	useAcceptDeleteVacancyRequestMutation,
	useGetVacancyRequestsQuery,
	useLazyGetVacancyViewQuery
} from '../../../store/api/serviceApi'
import { useAlert } from '../../../utils/Alert/AlertMessage'
import styles from '../../../utils/deleteOverwriteAntButton.module.css'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestDeleteView = () => {
	const [getVacancy, { data, isLoading }] = useLazyGetVacancyViewQuery()

	const currentUrl = window.location.pathname

	let request_id_from_url: string

	const match = currentUrl.match(/\/services\/personnelaccounting\/request\/(\d+)\/delete\/(\d+)/)

	if (match) {
		request_id_from_url = match[1]
	} else {
		console.error('ID not found')
		return
	}

	useEffect(() => {
		let vacancy_id_from_url: string

		const match = currentUrl.match(/\/services\/personnelaccounting\/request\/(\d+)\/delete\/(\d+)/)

		if (match) {
			vacancy_id_from_url = match[2]
		} else {
			console.error('ID not found')
			return
		}

		if (vacancy_id_from_url) {
			getVacancy(Number(vacancy_id_from_url))
		}
	}, [getVacancy])

	const navigate = useNavigate()
	const [acceptRequest, { isLoading: acceptRequestLoading }] = useAcceptDeleteVacancyRequestMutation()

	const { openAlert } = useAlert()

	const { refetch } = useGetVacancyRequestsQuery({ action: 'все', page: 0 })

	const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)
	const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false)
	const [resultModalText, setResultModalText] = useState<string>('')

	if (isLoading) {
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
					bodyStyle={{
						padding: '26px'
					}}
					width={407}
					className="pr-[52px] pl-[52px] pb-[52px]"
					open={isResultModalOpen}
					title={null}
					footer={null}
					centered
					onCancel={() => {
						navigate(-1)
					}}
				>
					<div className="flex flex-col">
						<div className="w-full flex justify-center">
							<ModalOkSvg />
						</div>
						<p className="text-center font-content-font text-black text-[16px]/[20px] font-normal mt-[22px]">
							{resultModalText}
						</p>
						<Button
							className="rounded-[40px] w-full !py-[13px] mt-[40px]"
							type="primary"
							onClick={() => {
								setIsResultModalOpen(false)
								navigate('/services/personnelaccounting/vacancyrequests')
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
					bodyStyle={{ padding: 53 }}
					centered
					open={isVerifyModalOpen}
					onCancel={() => {
						setIsVerifyModalOpen(false)
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
									setIsVerifyModalOpen(false)
								}}
							>
								Оставить
							</Button>
							<Button
								className={`${styles.customAntButton}`}
								onClick={async () => {
									try {
										await acceptRequest(Number(request_id_from_url))
											.unwrap()
											.then(() => {
												refetch().then(() => {
													setResultModalText('Вакансия успешно удалена')
													setIsVerifyModalOpen(false)
													setIsResultModalOpen(true)
												})
											})
									} catch (error: any) {
										openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
									}
								}}
								loading={acceptRequestLoading}
							>
								Удалить
							</Button>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[120px] pb-[52px] w-full">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/vacancyrequests')
						}}
						className="bg-inherit border-none cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{'«' + data?.title.rendered + '»'}
					</p>
				</div>
				<div className="w-[50%] mt-[52px] flex flex-col gap-[40px]">
					<div className="flex gap-[60px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требуемый опыт работы:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{data?.acf.experience}</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Тип занятости:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{data?.acf.employment}</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Заработная плата:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{data?.acf.salary}</p>
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">Задачи:</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{data?.acf.responsibilities}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требования:</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{data?.acf.skills}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">Условия:</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{data?.acf.conditions}
						</p>
					</div>
					<div className="flex gap-[40px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Категория сотрудников</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{data?.acf.category}</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								{data?.acf.direction === '' ? 'Подразделение' : 'Профобласть'}
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{data?.acf.direction === '' ? data?.acf.subdivision : data?.acf.direction}
							</p>
						</div>
					</div>
					<Button
						onClick={() => {
							setIsVerifyModalOpen(true)
						}}
						type="primary"
						className="rounded-[54.5px] w-[121px]"
					>
						Удалить
					</Button>
				</div>
			</div>
		</>
	)
}
