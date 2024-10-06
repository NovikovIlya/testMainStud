import {
	useChangeCardStatusRequestMutation,
	useChangeEmploymentStageStatusRequestMutation
} from '../../../../store/api/serviceApi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ConfigProvider, Modal } from 'antd'
import { DocumentElem } from '../../employmentStage/personnelDepartment/components/DocumentElem'

export const CardRequestItem = () => {

	const navigate = useNavigate()
	const [markCardGiven] = useChangeCardStatusRequestMutation()

	const [isAceptionModalOpen, setIsAceptionModalOpen] = useState(false)

	const ContentComponent = () => {
		return (
			<div className="flex flex-row gap-[40px] pr-[150px]">
				<div className="flex flex-col gap-[12px] ">
					<DocumentElem name={'Скан паспорта'}></DocumentElem>
				</div>
			</div>
		)
	}
	const AcceptionModal = () => {
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
						centered
						open={isAceptionModalOpen}
						onCancel={() => {
							setIsAceptionModalOpen(false)
						}}
						title={null}
						footer={null}
						width={407}
					>
						<div className='flex flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]'>
							<p
								className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
								Вы действительно хотите отметить карту выданной? Соискатель пропадёт из этого раздела и больше не будет
								здесь отображаться.
							</p>
							<Button
								className="rounded-[54.5px] text-[14px] w-full py-[13px]"
								type="primary"
								onClick={async () => {
									try {
										await markCardGiven({ subStageId: 6 });
										navigate('/services/personnelaccounting/requisite/card-creation');
									} catch (error) {
										alert('какая то ошибка');
									}
								}}
							>
								Ок
							</Button>
						</div>
					</Modal>
				</ConfigProvider>
			</>
		)
	}

	return (
		<>
			<AcceptionModal></AcceptionModal>
			<div className="p-[20px] pr-[40px] gap-[20px] flex flex-col w-full bg-[#FFFFFF]">
				<div className="flex flex-row items-center justify-between min-h-[32px]">
					<div className="flex flex-row gap-[37px]">
						<h3 className="font-bold text-[16px]/[19.2px]">6 ЭТАП</h3>
						<h3 className="font-normal text-[18px]/[21.6px]">«Реквизиты»</h3>
					</div>
					<Button
						className='text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal'
						type="primary"
						onClick={() => {
							setIsAceptionModalOpen(true)
						}}>
						Выдана
					</Button>
				</div>
				<ContentComponent></ContentComponent>
			</div>
		</>
	)
}