import React, { useState } from 'react'
import { Button, ConfigProvider, Modal, Form, Select} from 'antd'
import ArrowIcon from '../../../jobSeeker/ArrowIcon'
import { AvatartandardSvg } from '../../../../../assets/svg/AvatarStandardSvg'
import { useAppSelector } from '../../../../../store'
import { useGetRespondFullInfoQuery,
				 useEmployeeSeekerRequestMutation,
				 useLazyGetInterviewViewQuery
} from '../../../../../store/api/serviceApi'

export const SupervisorInterviewSeekerInfo = ( ) => {

	const respondId = useAppSelector(state => state.currentResponce)
	const format = useAppSelector(state => state.currentInterviewFormat)
	const time = useAppSelector(state => state.currentInterviewTime)

	const { data } = useGetRespondFullInfoQuery(respondId.respondId)

	const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false)

	const [isUnsuccessModalOpen, setIsUnsuccessModalOpen] = useState(false)

	const [rejectSeeker] = useEmployeeSeekerRequestMutation()
	const [aproveSeeker] = useEmployeeSeekerRequestMutation()

	interface ComponentProps {
		eventTime: string
		format: string
	}

	const Component = ( props: ComponentProps ) => {
		const targetDate = new Date(props.eventTime);
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();
		let isInterviewEnded : boolean = false
		if (difference<0) {
			isInterviewEnded = true
		}
		if (difference>0) {
			isInterviewEnded = false
		}
		return (
			<>
				{ (format.format  === 'OFFLINE') && !(isInterviewEnded) && (
					<div className="flex flex-col justify-center">
						<h3
							className=" mb-[20px] font-content-font font-bold text-black text-[16px]/[19.2px]">Собеседование</h3>
						<h4 className=" mb-[10px] font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
							Дата и время:</h4>
						<h4
							className="font-content-font font-normal text-black text-[16px]/[19.2px]">
							{time.time}
						</h4>
					</div>
				)}
				{ (format.format === 'ONLINE') && !(isInterviewEnded) && (
					<div className="flex flex-col justify-center">
						<h4 className="mb-[20px] font-content-font font-normal text-black text-[16px]/[19.2px]">Подключитесь к
							онлайн-конференции</h4>
						<Button
							className="h-[40px] w-[257px] bg-[#3073D7] rounded-[54.5px] text-white text-[16px]/[16px]"
							onClick={() => {

							}}
						>
							Подключиться
						</Button>
					</div>
				)}
				{(isInterviewEnded) && (
					<div className="flex flex-col justify-center gap-[12px]">
						<Button
							className="h-[40px] w-[257px] bg-[#3073D7] rounded-[54.5px] text-white text-[16px]/[16px]"
							onClick={values => {
								aproveSeeker({
									rejectionReason: 'approve',
									action: 'EMPLOY',
									respondId: respondId.respondId
								})
							}}
						>
							Пригласить на работу
						</Button>
						<Button
							className="h-[40px] font-content-font font-normal text-black border-[1px] border-black text-[16px]/[16px] rounded-[54.5px]"
							onClick={() => {
								setIsRefuseModalOpen(true)
							}}
						>
							Отказать
						</Button>
					</div>
				)}
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
			<div className="pl-[52px] pr-[10%] py-[100px] w-full">
				<div>
					<Button
						onClick={() => {
							window.history.back()
						}}
						className="bg-inherit h-[38px] w-[99px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer font-normal text-black text-[16px]/[16px] flex gap-[8px]"
					>
						<ArrowIcon />
						Назад
					</Button>
				</div>
				<div className="mt-[52px] flex flex-col gap-[36px]" >
					<div className="flex flex-wrap gap-[150px]">
						<div className="flex gap-[20px]">
							<div className="flex h-[167px] w-[167px] bg-[#D9D9D9]">
								<AvatartandardSvg />
							</div>
							<div className="flex flex-col gap-[8px]">
								<p className="font-content-font font-normal text-black text-[24px]/[28.8px]">
									{data?.userData?.lastname +
										' ' +
										data?.userData?.firstname +
										' ' +
										data?.userData?.middlename}
								</p>
								<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
									{data?.userData?.sex}, {data?.userData?.age} года
								</p>
								<div className="flex gap-[36px]">
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
											Дата рождения
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.bday}
										</p>
									</div>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
											Страна гражданства
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{data?.userData?.country}
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-[8px]">
									<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
										Контакты:
									</p>
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
							}}>
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
									onFinish={values => {
										rejectSeeker({
											rejectionReason: values.reason,
											action: 'REJECT',
											respondId: respondId.respondId
										})
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
												{ value: 'Не хватает опыта', label: 'Не хватает опыта' },
												{ value: 'Нашли другого специалиста', label: 'Нашли другого специалиста' }
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
						<Component format={''} eventTime={''}></Component>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
							Сопроводительное письмо
						</p>
						<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
							{data?.respondData.coverLetter}
						</p>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
							Опыт работы
						</p>
						<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
							{data?.respondData.portfolio.workExperiences.map(exp => (
								<>
									<div className="flex flex-col gap-[4px]">
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{exp.beginWork.substring(0, 4)}-
											{exp.endWork.substring(0, 4)}
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{parseInt(exp.endWork.substring(0, 4)) -
											parseInt(exp.beginWork.substring(0, 4)) ===
											0
												? ''
												: parseInt(exp.endWork.substring(0, 4)) -
												parseInt(exp.beginWork.substring(0, 4))}
											{parseInt(exp.endWork.substring(0, 4)) -
												parseInt(exp.beginWork.substring(0, 4)) ===
												1 && ' год'}
											{parseInt(exp.endWork.substring(0, 4)) -
												parseInt(exp.beginWork.substring(0, 4)) >=
												2 &&
												parseInt(exp.endWork.substring(0, 4)) -
												parseInt(exp.beginWork.substring(0, 4)) <=
												4 &&
												' года'}
											{parseInt(exp.endWork.substring(0, 4)) -
												parseInt(exp.beginWork.substring(0, 4)) >
												4 && ' лет'}
										</p>
									</div>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">
											{exp.position}
										</p>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{exp.workPlace}
										</p>
										<p className="font-content-font font-normal text-black text-[14px]/[16.8px]">
											{exp.duties}
										</p>
									</div>
								</>
							))}
						</div>
					</div>
					<hr />
					<div className="flex flex-col gap-[24px]">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
							Образование
						</p>
						<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
							{data?.educations.map(edu => (
								<>
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
										{edu.endYear}
									</p>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">
											{edu.nameOfInstitute}
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
					<div className="flex flex-col">
						<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40 w-[194px]">
							Профессиональные навыки
						</p>
						<div className="grid grid-cols-[194px_auto] gap-x-[20px] w-[90%]">
							<div className="col-start-2">
								{data?.respondData.skills.aboutMe}
								</div>
							<div className="col-start-2 flex gap-[8px] flex-wrap">

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
