import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import {
	setStageProgressAsFilling,
	setStageProgressAsReady
} from '../../../../store/reducers/EmploymentProgressSlice'

import { FileAttachment } from './FileAttachment'

export const EmplDocAttachment = (props: {
	respondId: number
	stageId: number
	stageName: string
}) => {
	const { docs } = useAppSelector(state => state.employmentSeekerDocs)
	const { empData } = useAppSelector(state => state.employmentData)
	const foundStage = empData.stages.find(
		stage => stage.type === props.stageName
	)
	const dispatch = useDispatch()

	useEffect(() => {
		if (foundStage) {
			if (
				foundStage.documents.length ===
				docs.filter(doc => doc.employmentStageType === props.stageName).length
			) {
				console.log('Все файлы на данном этапе загружены')
				dispatch(setStageProgressAsReady(props.stageId))
			} else {
				console.log('Какого-то из файлов не хватает')
				dispatch(setStageProgressAsFilling(props.stageId))
			}
		}
	}, [empData])

	return (
		<>
			<div className="flex flex-col gap-[40px] font-content-font font-normal text-black text-[16px]/[19.2px] w-full">
				<div className="flex flex-col gap-[12px]">
					<p>Необходимые документы:</p>
					<ol className="ml-[2%]">
						{docs
							.filter(doc => doc.employmentStageType === props.stageName)
							.map(doc => (
								<li>
									{doc.name}{' '}
									{doc.name === 'Заявление о приёме на работу' && (
										<a
											href="https://kadry.kpfu.ru/wp-content/uploads/2023/01/01_.zayavlenie.o.prieme.na_.rabotu._list.soglasovaniya__i_o.2022._2_.docx"
											download={true}
										>
											(скачать)
										</a>
									)}
									{doc.name === 'Заполненный личный листок по учету кадров' && (
										<a
											href="https://kadry.kpfu.ru/wp-content/uploads/2023/01/lichnyj.listok.po_.uchetu.kadrov.docx"
											download={true}
										>
											(скачать)
										</a>
									)}
									{doc.name ===
										'Бланк согласия на обработку персональных данных' && (
										<a
											href="https://kadry.kpfu.ru/wp-content/uploads/2023/01/soglasie.rabotnika.2017.docx"
											download={true}
										>
											(скачать)
										</a>
									)}
								</li>
							))}
					</ol>
				</div>
				<div className="bg-white rounded-[16px] shadow-custom-shadow p-[20px] w-[70%] flex flex-col gap-[20px]">
					<p className="opacity-80">Прикрепить файлы</p>
					<div className="grid gap-x-[36px] gap-y-[12px] grid-cols-[auto_10%_auto] items-center w-full">
						{docs
							.filter(doc => doc.employmentStageType === props.stageName)
							.map(doc => (
								<FileAttachment
									{...doc}
									respondId={props.respondId}
									stageName={props.stageName}
									seventhStage={false}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	)
}
