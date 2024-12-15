import { resolve } from 'path'
import { useEffect, useRef } from 'react'

import { DocxIcon } from '../../../assets/svg/DocxIcon'
import { FileDownloadIcon } from '../../../assets/svg/FileDownloadIcon'
import { PdfIcon } from '../../../assets/svg/PdfIcon'
import { useAppSelector } from '../../../store'
import { useGetEmploymentPossibleRolesQuery } from '../../../store/api/serviceApi'

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

	useEffect(() => {
		fetch(
			`http://${emplBaseURL}employment-api/v1/chat/${chatId.chatId}/message/${props.msgId}/file/${props.id}?sender=${
				isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
			}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token?.replaceAll('"', '')}`
				}
			}
		)
			.then(res => {
				console.log(res.headers.get('content-type'))
				return res.blob()
			})
			.then(blob => {
				const file = new Blob([blob], { type: 'application/pdf' })
				const url = window.URL.createObjectURL(file)
				if (linkRef.current) {
					linkRef.current.href = url
				}
			})
		console.log(linkRef)
	}, [])

	return (
		<>
			<div className="min-h-[64px] shadow-custom-shadow w-full bg-white rounded-[8px] flex items-center justify-between py-[12px] pl-[12px] pr-[20px]">
				{props.name.substring(props.name.length - 4) && props.name.substring(props.name.length - 4) === '.pdf' && (
					<PdfIcon />
				)}
				{props.name.substring(props.name.length - 5) && props.name.substring(props.name.length - 5) === '.docx' && (
					<DocxIcon />
				)}
				<p className="font-content-font text-black font-normal text-[16px]/[19.2px] w-[70%] overflow-hidden text-ellipsis">
					{props.name}
				</p>
				<div className="flex items-center gap-[20px]">
					<hr className="h-[64px] opacity-30" />
					<a download={true} ref={linkRef}>
						<FileDownloadIcon />
					</a>
				</div>
			</div>
		</>
	)
}
