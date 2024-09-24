import { Button } from 'antd'

import { useAppSelector } from '../../../../store'

import { FileAttachment } from './FileAttachment'

export const EmplSend = (props: {
	respondId: number
	stageId: number
	stageName: string
}) => {
	const { empData } = useAppSelector(state => state.employmentData)
	const { docs } = useAppSelector(state => state.employmentSeekerDocs)

	return (
		<>
			<div className="flex flex-col gap-[40px] font-content-font font-normal text-black text-[16px]/[19.2px]">
				<p className="w-[60%]">
					Идейные соображения высшего порядка, а также консультация с широким
					активом играет важную роль в формировании позиций, занимаемых
					участниками в отношении поставленных задач. С другой стороны новая
					модель организационной деятельности способствует подготовки и
					реализации новых предложений. С другой стороны постоянное
					информационно-пропагандистское обеспечение нашей деятельности в
					значительной степени обуславливает создание направлений прогрессивного
					развития.
				</p>
				<ol className="flex flex-col gap-[40px] ml-[2%]">
					<li>С трудовыми условиями ознакомлен (а)</li>
					<li>Инструктаж пройден</li>
				</ol>
				<div className="bg-white rounded-[16px] shadow-custom-shadow p-[20px] w-[70%] flex flex-col gap-[20px]">
					<div className="grid gap-x-[36px] gap-y-[12px] grid-cols-[auto_10%_auto] items-center w-full">
						{docs.map(doc => (
							<FileAttachment
								{...doc}
								respondId={props.respondId}
								stageName={doc.employmentStageType}
								seventhStage
							/>
						))}
					</div>
				</div>
				{!empData.stages.find(stage => stage.type === 'SIXTH')
					?.hasRequisites && (
					<ol start={3} className="flex flex-col gap-[40px] ml-[2%]">
						<li>Необходимо завести банковскую карту</li>
					</ol>
				)}
				<Button type="primary" className="rounded-[54.5px] w-[282px]">
					Подтвердить и отправить данные
				</Button>
			</div>
		</>
	)
}
