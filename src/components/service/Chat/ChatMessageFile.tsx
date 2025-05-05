import { resolve } from 'path'
import { useEffect, useRef } from 'react'

import { ChatFileIcon } from '../../../assets/svg/ChatFileIcon'
import { DocxIcon } from '../../../assets/svg/DocxIcon'
import { FileDownloadIcon } from '../../../assets/svg/FileDownloadIcon'
import { PdfIcon } from '../../../assets/svg/PdfIcon'
import { useAppSelector } from '../../../store'
import { useGetEmploymentPossibleRolesQuery, useLazyDownloadChatFileQuery } from '../../../store/api/serviceApi'

const host = import.meta.env.REACT_APP_HOST
const port = import.meta.env.REACT_APP_PORT
const emplBaseURL = host && port ? `http://${host}:${port}/` : `employment/`

export const ChatMessageFile = (props: { id: number; name: string; msgId: number }) => {
	const chatId = useAppSelector(state => state.chatId)
	const linkRef = useRef<HTMLAnchorElement | null>(null)

	const { data: rolesData = undefined } = useGetEmploymentPossibleRolesQuery()
	const isEmpDemp = rolesData?.find(role => role === 'PERSONNEL_DEPARTMENT')

	const token = useAppSelector(state => state.auth.accessToken)

	const [downloadDoc] = useLazyDownloadChatFileQuery()

	return (
		<>
			<div className="h-[64px] shadow-custom-shadow w-full bg-white rounded-[8px] flex items-center justify-between py-[12px] pl-[12px] pr-[20px] overflow-hidden">
				<ChatFileIcon extension={props.name.substring(props.name.lastIndexOf('.') + 1).toLocaleUpperCase()} />
				<p className="font-content-font text-black font-normal text-[16px]/[19.2px] w-[70%] h-[55%] overflow-hidden text-ellipsis">
					{props.name}
				</p>
				<div className="flex items-center gap-[20px]">
					<hr className="h-[64px] opacity-30" />
					<div
						className="cursor-pointer"
						onClick={() => {
							downloadDoc({
								chatId: chatId.chatId,
								msgId: props.msgId,
								id: props.id,
								isEmpDemp: isEmpDemp ? true : false
							})
								.unwrap()
								.then(({ href }) => {
									const docA = document.createElement('a')
									docA.href = href
									docA.download = ''
									docA.click()
								})
						}}
					>
						<FileDownloadIcon />
					</div>
				</div>
			</div>
		</>
	)
}
