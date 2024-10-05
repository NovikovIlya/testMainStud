import { useState, useRef } from 'react'
import { GreenCheck } from '../../../../assets/svg/GreenCheck'
import { Button, ConfigProvider, Input, Modal } from 'antd'
import { DocumentElem } from './components/DocumentElem'
import { Comment } from './components/Comment'
import {
	useChangeEmploymentStageStatusRequestMutation
} from '../../../../store/api/serviceApi'
import { setCurrentCommentVisibility } from '../../../../store/reducers/RequisiteReducers/StageCommentReducer'
import { useAppSelector } from '../../../../store'
import { setCurrentStageStatus } from '../../../../store/reducers/EmploymentStageReducers/StageStatusReducer'
import { useDispatch } from 'react-redux'

interface DepEmploymentStageItemProps {
	stage: number
	stageStatus: string | undefined
	comment: string | undefined
}

export const DepEmploymentStageItem = ( props: DepEmploymentStageItemProps) => {

	const stageStatus = useAppSelector(state => state.currentStageStatus)

	const dispatch = useDispatch()

	const [changeStatus] = useChangeEmploymentStageStatusRequestMutation()

	const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false)

	const { TextArea } = Input

	const changeVisibility = (newVisibility: string) => {
		dispatch(setCurrentCommentVisibility(newVisibility))
	}

	const textRef = useRef('')
	const checkInputChange = (e:any) => {
		textRef.current = e.target.value
	};

	const StageStatusComponent = () => {
		return(
			<>
				{(props.stage === 2) && (
					<>
						{(props.stageStatus === 'VERIFYING') && (stageStatus.stageStatus === 'VERIFYING') && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									onClick={() => {
										changeStatus({
											status: 'ACCEPTED',
											comment: textRef.current,
											subStageId: props.stage
										});
										dispatch(setCurrentStageStatus('ACCEPTED'))
										changeVisibility('invisible')
									}}
								>
									Принять
								</Button>
								<Button
									type="default"
									className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
									onClick={() => {
										setIsRevisionModalOpen(true)
									}}
								>На доработку
								</Button>
							</div>
						)}
						{((props.stageStatus === 'REFINE') || (stageStatus.stageStatus === 'REFINE')) && (
							<div className="flex flex-row items-center gap-[12px] pr-[150px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
						{((props.stageStatus === 'ACCEPTED') || (stageStatus.stageStatus === 'ACCEPTED')) && (
							<div className="flex flex-row items-center gap-[12px] pr-[150px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
								<span>Принято</span>
							</div>
						)}
					</>
				)}
				{(props.stage === 3) && (
					<>
						{(props.stageStatus === 'VERIFYING') && (stageStatus.stageStatus === 'VERIFYING') && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									onClick={() => {
										changeStatus({
											status: 'ACCEPTED',
											comment: textRef.current,
											subStageId: props.stage
										});
										dispatch(setCurrentStageStatus('ACCEPTED'))
										changeVisibility('invisible')
									}}
								>
									Принять
								</Button>
								<Button
									type="default"
									className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
									onClick={() => {
										setIsRevisionModalOpen(true)
									}}
								>На доработку</Button>
							</div>
						)}
						{((props.stageStatus === 'REFINE') || (stageStatus.stageStatus === 'REFINE')) && (
							<div className="flex flex-row items-center gap-[12px] pr-[150px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
						{((props.stageStatus === 'ACCEPTED') || (stageStatus.stageStatus === 'ACCEPTED')) && (
							<div className="flex flex-row items-center gap-[12px] pr-[150px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
								<span>Принято</span>
							</div>
						)}
					</>
				)}
				{(props.stage === 4) && (
					<>
					{(props.stageStatus === 'VERIFYING') && (stageStatus.stageStatus === 'VERIFYING') && (
						<div className="flex flex-row gap-[12px]">
							<Button
								className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
								type="primary"
								onClick={() => {
							changeStatus({
								status: 'ACCEPTED',
								comment: textRef.current,
								subStageId: props.stage
							});
							dispatch(setCurrentStageStatus('ACCEPTED'))
							changeVisibility('invisible')
						}}
							>
							Принять
						</Button>
						<Button
						type="default"
						className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
						onClick={() => {
						setIsRevisionModalOpen(true)
					}}
					>На доработку</Button>
					</div>
					)}
				{((props.stageStatus === 'REFINE') || (stageStatus.stageStatus === 'REFINE')) && (
					<div className="flex flex-row items-center gap-[12px] pr-[150px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
						<span>Доработка</span>
					</div>
				)}
				{((props.stageStatus === 'ACCEPTED') || (stageStatus.stageStatus === 'ACCEPTED')) && (
					<div className="flex flex-row items-center gap-[12px] pr-[150px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
						<span>Принято</span>
					</div>
				)}
			</>
		)}
	{(props.stage === 5) && (
		<>
			{(props.stageStatus === 'VERIFYING') && (stageStatus.stageStatus === 'VERIFYING')	 && (
				<div className="flex flex-row gap-[12px]">
					<Button
						className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
						type="primary"
						onClick={() => {
							changeStatus({
								status: 'ACCEPTED',
								comment: textRef.current,
								subStageId: props.stage
							});
							dispatch(setCurrentStageStatus('ACCEPTED'))
							changeVisibility('invisible')
						}}
					>
						Принять
					</Button>
					<Button
						type="default"
						className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
						onClick={() => {
							setIsRevisionModalOpen(true)
						}}
					>На доработку</Button>
				</div>
			)}
			{((props.stageStatus === 'REFINE') || (stageStatus.stageStatus === 'REFINE')) && (
				<div className="flex flex-row items-center gap-[12px] pr-[150px]">
					<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
					<span>Доработка</span>
				</div>
			)}
			{((props.stageStatus === 'ACCEPTED') || (stageStatus.stageStatus === 'ACCEPTED')) && (
				<div className="flex flex-row items-center gap-[12px] pr-[150px]">
					<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
					<span>Принято</span>
				</div>
			)}
		</>
	)}
</>
)
}
const StageContentComponent = () => {
	return(
		<>
			{(props.stage === 2) && (
				<>
					<div className="flex flex-row gap-[40px] pr-[150px]">

					</div>
					{(props.stageStatus === 'REFINE') && (
						<>
							<Comment commentText={props.comment}></Comment>
						</>
					)}
				</>
			)}
			{(props.stage === 3) && (
				<>
					<div className="flex flex-row gap-[12px]">
						<GreenCheck></GreenCheck>
						<span className="text-[16px]/[19.2px] font-normal">Соискатель ознакомлен с трудовыми условиями</span>
					</div>
					{(props.stageStatus === 'REFINE') && (
						<>
							<Comment commentText={props.comment}></Comment>
						</>
					)}
				</>
			)}
			{(props.stage === 4) && (
				<>
					<div className="flex flex-row gap-[40px] pr-[150px]">

					</div>
					{(props.stageStatus === 'REFINE') && (
						<>
							<Comment commentText={props.comment}></Comment>
						</>
					)}
				</>
			)}
			{(props.stage === 5) && (
				<>
					<div className="flex flex-row gap-[12px]">
						<GreenCheck></GreenCheck>
						<span className="text-[16px]/[19.2px] font-normal">Соискатель прошел инструктаж</span>
					</div>
					{(props.stageStatus === 'REFINE') && (
						<>
							<Comment commentText={props.comment}></Comment>
						</>
					)}
				</>
			)}
		</>
	)
}
const StageStatusModal = () => {
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
					bodyStyle={{ padding: 52 }}
					centered
					open={isRevisionModalOpen}
					onCancel={() => {
						setIsRevisionModalOpen(false)
					}}
					title={null}
					footer={null}
					width={620}
				>
					<p
						className="font-content-font font-normal mb-[18px] flex items-start text-black opacity-[80%] text-[16px]/[20px]">
						Комментарий
					</p>
					<TextArea
						autoSize={{ minRows: 4, maxRows: 8 }}
						style={{ height: 107, resize: 'none', width: 520, }}
						onChange={checkInputChange}
					/>
					<div className="mt-[40px] flex gap-[12px] w-full justify-end ">
						<Button
							className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
							type="primary"
							onClick={() => {
								try {
									changeStatus({
										status: 'REFINE',
										comment: textRef.current,
										subStageId: 0
									});
									dispatch(setCurrentStageStatus('REFINE'))
									setIsRevisionModalOpen(false);
								} catch (error) {
									console.log('try/catch error', error);
								}
							}}
						>
							Отправить
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
		</>
	)
}

return (
	<>
		<StageStatusModal></StageStatusModal>
		<div className="p-[20px] pr-[40px] gap-[20px] flex flex-col w-full bg-[#FFFFFF]">
			<div className="flex flex-row items-center justify-between min-h-[32px]">
				{(props.stage === 2) && (
					<div className="flex flex-row gap-[37px]">
						<h3 className="font-bold text-[16px]/[19.2px]">2 ЭТАП</h3>
						<h3 className="font-normal text-[18px]/[21.6px]">«Прикрепление документов»</h3>
					</div>
				)}
				{(props.stage === 3) && (
					<div className="flex flex-row gap-[37px]">
						<h3 className="font-bold text-[16px]/[19.2px]">3 ЭТАП</h3>
						<h3 className="font-normal text-[18px]/[21.6px]">«Трудовые условия»</h3>
					</div>
				)}
				{(props.stage === 4) && (
					<div className="flex flex-row gap-[37px]">
						<h3 className="font-bold text-[16px]/[19.2px]">4 ЭТАП</h3>
						<h3 className="font-normal text-[18px]/[21.6px]">«Медицинский осмотр»</h3>
					</div>
				)}
				{(props.stage === 5) && (
					<div className="flex flex-row gap-[37px]">
						<h3 className="font-bold text-[16px]/[19.2px]">5 ЭТАП</h3>
						<h3 className="font-normal text-[18px]/[21.6px]">«Инструктаж»</h3>
					</div>
				)}
				<StageStatusComponent></StageStatusComponent>
			</div>
			<StageContentComponent></StageContentComponent>
		</div>
	</>
)
}