import { Button, Popover } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { useUpdateEmploymentDocumentsMutation } from '../../../../store/api/serviceApi'
import { setStageProgressAsFilling, setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'

import { FileAttachment } from './FileAttachment'

export const EmplMedExam = (props: { respondId: number; stageId: number; stageName: string }) => {
	const { docs } = useAppSelector(state => state.employmentSeekerDocs)
	const { empData } = useAppSelector(state => state.employmentData)
	const foundStage = empData.stages.find(stage => stage.type === props.stageName)
	const dispatch = useDispatch()

	const [updateDocuments, queryStatus] = useUpdateEmploymentDocumentsMutation()

	useEffect(() => {
		if (foundStage) {
			if (foundStage.status === 'VERIFYING') {
				return
			}
			if (foundStage.status === 'REFINE') {
				return
			}
			if (foundStage.status === 'UPDATED') {
				return
			}
			if (foundStage.status === 'ACCEPTED') {
				return
			}
			if (foundStage.documents.length === docs.filter(doc => doc.employmentStageType === props.stageName).length) {
				console.log('Все файлы на данном этапе загружены')
				dispatch(setStageProgressAsReady(props.stageName))
			} else {
				console.log('Какого-то из файлов не хватает')
				dispatch(setStageProgressAsFilling(props.stageName))
			}
		}
	}, [empData])

	return (
		<>
			<div className="flex flex-col gap-[40px] font-content-font font-normal text-black text-[16px]/[19.2px] w-full">
				<div className="flex flex-col gap-[12px]">
					<p>Медицинский осмотр подойдите за направлением:</p>
					<ol className="ml-[2%]">
						<li>В отделе кадров на ул. Татарстан, 2, каб. 125</li>
						<li>В службе охраны труда на ул. М. Межлаука, 1, каб. 309</li>
					</ol>
				</div>
				<div className="flex flex-col gap-[12px]">
					<p>Необходимые документы:</p>
					<ol className="ml-[2%]">
						{docs
							.filter(doc => doc.employmentStageType === props.stageName)
							.map(doc => (
								<li>{doc.name}</li>
							))}
					</ol>
				</div>
				<div className="bg-white rounded-[16px] shadow-custom-shadow p-[20px] w-[70%] flex flex-col gap-[20px]">
					<div className="flex items-center gap-[9px]">
						<p className="opacity-80">Прикрепить файлы</p>
						<Popover
							overlayClassName="p-[20px] w-[369px]"
							className="pointer-events-auto"
							placement="right"
							arrow={false}
							content={
								<>
									<div className="font-content-font font-normal text-black text-[14px]/[16px] flex flex-col gap-[16px]">
										<p>
											1. <b>Формат файла</b> может быть jpg, png, pdf.
										</p>
										<p>
											2. <b>Вес файла</b> должен быть не больше 5мб.
										</p>
										<p>
											3. <b>Объединение.</b> Если ваш документ содержит несколько страниц, необходимо объединить их в
											один многостраничный файл pdf.
										</p>
									</div>
								</>
							}
						>
							<p className="h-[18px] w-[18px] border border-black border-solid text-center content-center text-[12px]/[12px] opacity-40">
								?
							</p>
						</Popover>
					</div>
					<div className="grid gap-x-[36px] gap-y-[12px] grid-cols-[auto_10%_auto] items-center w-full">
						{docs
							.filter(doc => doc.employmentStageType === props.stageName)
							.map(doc => (
								<FileAttachment {...doc} respondId={props.respondId} stageName={props.stageName} seventhStage={false} />
							))}
					</div>
				</div>
				{(foundStage?.status === 'REFINE' || foundStage?.status === 'UPDATED') && (
					<Button
						loading={queryStatus.isLoading}
						type="primary"
						className="rounded-[54.5px] w-[141px]"
						onClick={() => {
							updateDocuments(foundStage.id)
								.unwrap()
								.then(() => {
									dispatch(setStageProgressAsReady(props.stageName))
								})
						}}
					>
						Далее
					</Button>
				)}
			</div>
		</>
	)
}
