import { useAppSelector } from '../../../../store'

export const EmplSend = (props: {
	respondId: number
	stageId: number
	stageName: string
}) => {
	const { empData } = useAppSelector(state => state.employmentData)

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
				{!empData.stages.find(stage => stage.type === 'SIXTH')
					?.hasRequisites && (
					<ol start={3} className="flex flex-col gap-[40px] ml-[2%]">
						<li>Необходимо завести банковскую карту</li>
					</ol>
				)}
			</div>
		</>
	)
}
