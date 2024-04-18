import { useEffect, useRef } from 'react'

import { DocxIcon } from '../../../assets/svg/DocxIcon'
import { FileDownloadIcon } from '../../../assets/svg/FileDownloadIcon'
import { PdfIcon } from '../../../assets/svg/PdfIcon'
import { useAppSelector } from '../../../store'

const seekerToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiI2Iiwic2Vzc2lvbklkIjoiMjQwMzIyNzE0ODc1MTk0ODI5NzMzMDkwNDczNTM2NjciLCJzZXNzaW9uSGFzaCI6IkQyQTIyNUE3NDk5RjFDRTE2Q0JFMDJCOUY2QzkxN0UxIiwiZG9jdW1lbnRzSGFzaCI6IkIyNkNCMEMzRThBQzM2RDZBMENCNTEyQ0YzMDIzNzc3IiwibG9naW4iOiJJQU1pdHJvZmFub3YiLCJ0eXBlIjoiU0VFS0VSIn1dLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJhbGxJZCI6IjE3ODQ0MCIsImVtYWlsIjoibWl0cm9fMDJAbWFpbC5ydSJ9.rbdEbs6b2NVFyFa65GW5rpy8VBd7TKpNxaTrVBMh5i0'

export const ChatMessageFile = (props: {
	id: number
	name: string
	msgId: number
}) => {
	const chatId = useAppSelector(state => state.chatId)
	const linkRef = useRef<HTMLAnchorElement | null>(null)

	useEffect(() => {
		fetch(
			`http://localhost:8082/employment-api/v1/chat/${chatId.chatId}/message/${props.msgId}/file/${props.id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${seekerToken}`
				}
			}
		)
			.then(res => {
				console.log(res.headers.get('content-type'))
				return res.blob()
			})
			.then(blob => {
				const file = new Blob([blob], { type: 'application/pdf' })
				const url = window.URL.createObjectURL(
					new Blob([blob], { type: 'application/pdf' })
				)
				if (linkRef.current) {
					linkRef.current.href = url
				}
			})
		console.log(linkRef)
	}, [])

	return (
		<>
			<div className="h-[64px] w-full bg-white rounded-[8px] flex items-center justify-between py-[12px] pl-[12px] pr-[20px]">
				{props.name.substring(props.name.length - 4) &&
					props.name.substring(props.name.length - 4) === '.pdf' && <PdfIcon />}
				{props.name.substring(props.name.length - 5) &&
					props.name.substring(props.name.length - 5) === '.docx' && (
						<DocxIcon />
					)}
				<p className="font-content-font text-black font-normal text-[16px]/[19.2px]">
					{props.name}
				</p>
				<a download={true} ref={linkRef}>
					<FileDownloadIcon />
				</a>
			</div>
		</>
	)
}
