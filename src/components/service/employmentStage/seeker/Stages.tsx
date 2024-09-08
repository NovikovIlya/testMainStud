import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../../store'

import { EmplDocAttachment } from './EmplDocAttachment'
import { EmplInstruction } from './EmplInstruction'
import { EmplMedExam } from './EmplMedExam'
import { EmplMedInvite } from './EmplMedInvite'
import { EmplRequisites } from './EmplRequisites'
import { EmplSend } from './EmplSend'
import { EmplWorkConditions } from './EmplWorkConditions'
import { NavPanel } from './NavPanel'

export const Stages = () => {
	const { pathname } = useLocation()

	const respondId = parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))

	const { currentStage } = useAppSelector(state => state.currentEmploymentStage)

	return (
		<>
			<div id="wrapper" className="px-[52px] w-full">
				<div className="font-content-font font-normal text-[28px]/[28px] text-black mt-[120px]">
					Вакансия «Специалист отдела сотрудничества»
				</div>
				<NavPanel />
				<div className="w-full mt-[40px]">
					{currentStage === 1 && (
						<EmplMedInvite respondId={respondId} stageId={1} />
					)}
					{currentStage === 2 && <EmplDocAttachment />}
					{currentStage === 3 && <EmplWorkConditions />}
					{currentStage === 4 && <EmplMedExam />}
					{currentStage === 5 && <EmplInstruction />}
					{currentStage === 6 && <EmplRequisites />}
					{currentStage === 7 && <EmplSend />}
				</div>
			</div>
		</>
	)
}
