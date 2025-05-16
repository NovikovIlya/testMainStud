import { Button, Checkbox, ConfigProvider, Modal, notification } from 'antd'
import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../../assets/svg/ModalOkSvg'
import { useAppSelector } from '../../../../store'
import { useSendEmploymentDocsMutation } from '../../../../store/api/serviceApi'

import { FileAttachment } from './FileAttachment'

export const EmplSend = (props: { respondId: number; stageId: number; stageName: string }) => {
	const { empData } = useAppSelector(state => state.employmentData)
	const { docs } = useAppSelector(state => state.employmentSeekerDocs)

	const [api, contextHolder] = notification.useNotification()

	const [sendDocs] = useSendEmploymentDocsMutation()
	const hasNotRequisites = empData.stages.find(stage => stage.type === 'SIXTH')?.hasRequisites
	const bank = empData.stages.find(stage => stage.type === 'SIXTH')?.bank

	const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)

	const navigate = useNavigate()

	const [agree, setAgree] = useState<boolean>(false)

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
						setIsResultModalOpen(false)
					}}
				>
					<div className="w-full flex justify-center">
						<ModalOkSvg />
					</div>
					<p className="text-center font-content-font text-black text-[16px]/[20px] font-normal mt-[22px]">
						{t('emplSend.modal.successMessage')}
					</p>
					<Button
						className="rounded-[40px] w-full !py-[13px] mt-[40px]"
						type="primary"
						onClick={() => {
							setIsResultModalOpen(false)
							navigate('/services/myresponds/employment')
						}}
					>
						{t('emplSend.modal.okButton')}
					</Button>
				</Modal>
			</ConfigProvider>
			<div className="flex flex-col gap-[40px] font-content-font font-normal text-black text-[16px]/[19.2px]">
				<p className="w-[60%]">
					{t('emplSend.mainMessage.part1')}
					<br />
					<br />
					{t('emplSend.mainMessage.part2')}
					<br />
					<br />
					{t('emplSend.mainMessage.part3')}
					<br />
					<br />
					{t('emplSend.mainMessage.part4')}
					<br />
					<br />
					{t('emplSend.mainMessage.part5')}
					<br />
					<br />
					{t('emplSend.mainMessage.part6')}
					<br />
					<br />
					{t('emplSend.mainMessage.part7')}
				</p>

				<ol className="flex flex-col gap-[40px] ml-[2%]">
					<li>{t('emplSend.list.item1')}</li>
					<li>{t('emplSend.list.item2')}</li>
				</ol>

				<div className="bg-white rounded-[16px] shadow-custom-shadow p-[20px] w-[70%] flex flex-col gap-[20px]">
					<div className="grid gap-x-[36px] gap-y-[12px] grid-cols-[auto_10%_auto] items-center w-full">
						{docs.map(doc => (
							<FileAttachment {...doc} respondId={props.respondId} stageName={doc.employmentStageType} seventhStage />
						))}
					</div>
				</div>

				{!hasNotRequisites && (
					<ol start={3} className="flex flex-col gap-[40px] ml-[2%]">
						<li>
							{t('emplSend.list.bankCard', {
								bankName: bank === 'SBER' ? t('sberbank') : t('vtb')
							})}
						</li>
					</ol>
				)}

				<Checkbox
					checked={agree}
					onChange={() => {
						setAgree(prev => !prev)
					}}
				>
					{t('emplSend.checkbox.confirm')}
				</Checkbox>

				<Button
					disabled={!agree}
					type="primary"
					className="rounded-[54.5px] w-[282px]"
					onClick={async () => {
						try {
							await sendDocs({
								respondId: props.respondId,
								hasNotRequisites: !hasNotRequisites
							})
								.unwrap()
								.then(() => {
									setIsResultModalOpen(true)
								})
						} catch (error: any) {
							api.error({ message: t('alertError'), placement: 'bottomRight' })
						}
					}}
				>
					{t('emplSend.button.submit')}
				</Button>
			</div>
		</>
	)
}
