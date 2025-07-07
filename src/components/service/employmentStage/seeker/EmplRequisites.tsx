import { Button, Checkbox, Popover, Radio } from 'antd'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import {
	useSetHasNoRequisitesOnEmploymentMutation,
	useSetHasRequisitesEmploymentMutation,
	useUpdateEmploymentDocumentsMutation
} from '../../../../store/api/serviceApi'
import { setBank, setHasRequisites } from '../../../../store/reducers/EmploymentDataSlice'
import { setStageProgressAsFilling, setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'

import { FileAttachment } from './FileAttachment'

export const EmplRequisites = (props: { respondId: number; stageId: number; stageName: string }) => {
	const { docs } = useAppSelector(state => state.employmentSeekerDocs)
	const { empData } = useAppSelector(state => state.employmentData)
	const foundStage = empData.stages.find(stage => stage.type === props.stageName)
	const dispatch = useDispatch()

	const [setHasNoRequisites] = useSetHasNoRequisitesOnEmploymentMutation()
	const [setHasRequisitesQuery] = useSetHasRequisitesEmploymentMutation()
	const [updateDocuments, queryStatus] = useUpdateEmploymentDocumentsMutation()

	const [hasRequisites, setRequisitesState] = useState<boolean>(!foundStage?.hasRequisites)

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
			if (
				foundStage.documents.length === docs.filter(doc => doc.employmentStageType === props.stageName).length ||
				!foundStage.hasRequisites
			) {
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
				<p>
					{t('requisitesText1')} <br /> ({t('requisitesText2')})
				</p>
				<div
					className={`bg-white rounded-[16px] shadow-custom-shadow p-[20px] w-[70%] flex flex-col gap-[20px] ${
						hasRequisites ? 'opacity-30 pointer-events-none' : ''
					}`}
				>
					<div className="flex items-center gap-[9px]">
						<p className="opacity-80">{t('attachFiles')}</p>
						<Popover
							overlayClassName="p-[20px] w-[369px]"
							className="pointer-events-auto"
							placement="right"
							arrow={false}
							content={
								<>
									<div className="font-content-font font-normal text-black text-[14px]/[16px] flex flex-col gap-[16px]">
										<p>
											1. <b>{t('fileFormat')}</b> {t('fileFormatText')}.
										</p>
										<p>
											2. <b>{t('sizeOfFile')}</b> {t('lessThen5MB')}.
										</p>
										<p>
											3. <b>{t('concatanation')}.</b> {t('concatanationText')}.
										</p>
										<div className="flex flex-col gap-[16px]">
											<p>
												4. <b>{t('example')}</b>
											</p>
											<img
												className="mx-auto"
												src="/requisitesexample.jpg"
												alt="Фото паспорта"
												width={167}
												height={213}
											></img>
										</div>
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
				{foundStage?.status !== 'REFINE' && foundStage?.status !== 'UPDATED' && (
					<div className="flex flex-col gap-[8px]">
						<div className="flex gap-[12px] items-center">
							<Checkbox
								className=""
								checked={hasRequisites}
								onClick={() => {
									if (hasRequisites) {
										setHasRequisitesQuery(props.respondId)
											.unwrap()
											.then(() => {
												setRequisitesState(prev => !prev)
												foundStage?.bank && dispatch(setHasRequisites(props.stageName))
												dispatch(setBank({ stage: props.stageName, bank: undefined }))
											})
									} else {
										setRequisitesState(prev => !prev)
									}
								}}
							>
								{t('requisitesNoCard')}
							</Checkbox>
							<Popover
								overlayClassName="p-[20px] w-[369px]"
								className="pointer-events-auto"
								placement="bottomLeft"
								arrow={false}
								content={t('requisitesNoCardHint')}
							>
								<p className="h-[18px] w-[18px] border border-black border-solid text-center content-center text-[12px]/[12px] opacity-40">
									?
								</p>
							</Popover>
						</div>
						{hasRequisites && (
							<div className="flex flex-col gap-[8px]">
								<p className="text-[14px]/[14px] ml-[24px]">{t('requsitesChooseCard')}:</p>
								<Radio.Group name="bank" className="flex flex-col gap-[8px]" defaultValue={foundStage?.bank}>
									<Radio
										value={'SBER'}
										onClick={() => {
											setHasNoRequisites({
												respondId: props.respondId,
												bank: 'SBER'
											})
												.unwrap()
												.then(() => {
													if (foundStage?.hasRequisites) {
														dispatch(setHasRequisites(props.stageName))
													}
													dispatch(setBank({ stage: props.stageName, bank: 'SBER' }))
												})
										}}
									>
										{t('sber')}
									</Radio>
									<Radio
										value={'VTB'}
										onClick={() => {
											setHasNoRequisites({
												respondId: props.respondId,
												bank: 'VTB'
											})
												.unwrap()
												.then(() => {
													if (foundStage?.hasRequisites) {
														dispatch(setHasRequisites(props.stageName))
													}
													dispatch(setBank({ stage: props.stageName, bank: 'VTB' }))
												})
										}}
									>
										{t('vtb')}
									</Radio>
								</Radio.Group>
							</div>
						)}
					</div>
				)}
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
						{t('next')}
					</Button>
				)}
			</div>
		</>
	)
}
