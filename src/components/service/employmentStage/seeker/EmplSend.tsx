import { Button, Checkbox, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../../assets/svg/ModalOkSvg'
import { useAppSelector } from '../../../../store'
import { useSendEmploymentDocsMutation } from '../../../../store/api/serviceApi'
import { useAlert } from '../../../../utils/Alert/AlertMessage'

import { FileAttachment } from './FileAttachment'

export const EmplSend = (props: { respondId: number; stageId: number; stageName: string }) => {
	const { empData } = useAppSelector(state => state.employmentData)
	const { docs } = useAppSelector(state => state.employmentSeekerDocs)

	const { openAlert } = useAlert()

	const [sendDocs] = useSendEmploymentDocsMutation()
	const hasNotRequisites = empData.stages.find(stage => stage.type === 'SIXTH')?.hasRequisites
	const bank = empData.stages.find(stage => stage.type === 'SIXTH')?.bank

	const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)

	const navigate = useNavigate()

	const [agree, setAgree] = useState<boolean>(false)

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
						setIsResultModalOpen(false)
					}}
				>
					<div className="w-full flex justify-center">
						<ModalOkSvg />
					</div>
					<p className="text-center font-content-font text-black text-[16px]/[20px] font-normal mt-[22px]">
						Документы успешно отправлены. Следите за статусом ваших документов на этапе трудоустройства.
					</p>
					<Button
						className="rounded-[40px] w-full !py-[13px] mt-[40px]"
						type="primary"
						onClick={() => {
							setIsResultModalOpen(false)
							navigate('/services/myresponds/employment')
						}}
					>
						Ок
					</Button>
				</Modal>
			</ConfigProvider>
			<div className="flex flex-col gap-[40px] font-content-font font-normal text-black text-[16px]/[19.2px]">
				<p className="w-[60%]">
					Уважаемый соискатель! <br />
					<br /> Благодарим вас за предоставление части необходимых документов для трудоустройства на работу. Мы рады
					сообщить вам, что осталось совсем немного! <br />
					<br /> Обратите внимание, что для окончательного оформления вам потребуется подписать оставшиеся документы в
					Управлении кадров. Пожалуйста, посетите наш офис в удобное для вас время. Мы работаем с понедельника по
					пятницу с 9:00 до 17:00 по адресу ул. Кремлевская, 18, корп.4 <br />
					<br /> Если у вас возникнут вопросы или потребуется дополнительная информация, не стесняйтесь обращаться к
					нам. <br />
					<br /> +7 (843) 206-50-94 <br />
					<br /> С уважением, Команда HR
				</p>
				<ol className="flex flex-col gap-[40px] ml-[2%]">
					<li>С трудовыми условиями ознакомлен (а)</li>
					<li>Инструктаж пройден</li>
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
						<li>Необходимо завести банковскую карту {bank === 'SBER' ? 'Сбербанк' : 'ВТБ'}</li>
					</ol>
				)}
				<Checkbox
					checked={agree}
					onChange={() => {
						setAgree(prev => !prev)
					}}
				>
					Подтверждаю достоверность документов
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
							openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
						}
					}}
				>
					Подтвердить и отправить данные
				</Button>
			</div>
		</>
	)
}
