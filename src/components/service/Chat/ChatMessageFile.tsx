import { resolve } from 'path'
import { useEffect, useRef } from 'react'

import { ChatFileIcon } from '../../../assets/svg/ChatFileIcon'
import { DocxIcon } from '../../../assets/svg/DocxIcon'
import { FileDownloadIcon } from '../../../assets/svg/FileDownloadIcon'
import { PdfIcon } from '../../../assets/svg/PdfIcon'
import { useAppSelector } from '../../../store'
import { useGetEmploymentPossibleRolesQuery, useLazyDownloadChatFileQuery } from '../../../store/api/serviceApi'

const seekerToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiIyNTMxNjIiLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJkb2N1bWVudHNIYXNoIjoiQjI2Q0IwQzNFOEFDMzZENkEwQ0I1MTJDRjMwMjM3NzciLCJsb2dpbiI6IklBTWl0cm9mYW5vdiIsInR5cGUiOiJTRUVLRVIifV0sInNlc3Npb25JZCI6IjI0MDMyMjcxNDg3NTE5NDgyOTczMzA5MDQ3MzUzNjY3Iiwic2Vzc2lvbkhhc2giOiJEMkEyMjVBNzQ5OUYxQ0UxNkNCRTAyQjlGNkM5MTdFMSIsImFsbElkIjoiMTc4NDQwIiwiZW1haWwiOiJtaXRyb18wMkBtYWlsLnJ1In0.4dmYBUEDz9UzKxvxWtQhA6poTVwFOkRn-YoSzngfVUs'

const host = import.meta.env.REACT_APP_HOST
const port = import.meta.env.REACT_APP_PORT
const emplBaseURL = `${host ? host : 'localhost'}:${port ? port : 8082}/`

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
