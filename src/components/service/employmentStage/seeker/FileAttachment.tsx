import { Button, Upload } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { MyDocsSvg } from '../../../../assets/svg/MyDocsSvg'
import { useAppSelector } from '../../../../store'
import { EmploymentDocsType } from '../../../../store/reducers/type'

export const FileAttachment = (
	props: EmploymentDocsType & { respondId: number; stageId: number }
) => {
	const { empData } = useAppSelector(state => state.employmentData)

	const [fileType, setFileType] = useState<string>('')

	const foundDoc = empData.stages
		.find(stage => stage.id === props.stageId)
		?.documents.find(doc => doc.docType === props.name)

	const dispatch = useDispatch()

	const seekerToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiIyNTMxNjIiLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJkb2N1bWVudHNIYXNoIjoiQjI2Q0IwQzNFOEFDMzZENkEwQ0I1MTJDRjMwMjM3NzciLCJsb2dpbiI6IklBTWl0cm9mYW5vdiIsInR5cGUiOiJTRUVLRVIifV0sInNlc3Npb25JZCI6IjI0MDMyMjcxNDg3NTE5NDgyOTczMzA5MDQ3MzUzNjY3Iiwic2Vzc2lvbkhhc2giOiJEMkEyMjVBNzQ5OUYxQ0UxNkNCRTAyQjlGNkM5MTdFMSIsImFsbElkIjoiMTc4NDQwIiwiZW1haWwiOiJtaXRyb18wMkBtYWlsLnJ1In0.4dmYBUEDz9UzKxvxWtQhA6poTVwFOkRn-YoSzngfVUs'

	return (
		<>
			<div className="flex gap-[12px] col-start-1">
				<MyDocsSvg />
				<p>{props.name}</p>
			</div>
			{foundDoc ? (
				<>
					<p className="col-start-2">f1sch239sohhsi3389</p>
					<p className="col-start-3">123 кб</p>
					<p className="col-start-4">Удалить</p>
				</>
			) : (
				<Upload
					action={`http://localhost:8082/employment-api/v1/respond/${props.respondId}/employment/file?employmentDocDefId=${props.id}`}
					method="PUT"
					beforeUpload={file => {
						setFileType(file.type)
					}}
					headers={{
						Authorization: `Bearer ${seekerToken}`,
						'Content-Type': fileType
					}}
					onChange={options => {
						options.file.status === 'error'
							? console.log('Произошла чудовищная ошибка')
							: console.log('Успешно всё, успешно')
					}}
				>
					{' '}
					<Button
						className="border-black border rounded-[5px] py-[12px] px-[20px] col-start-3 col-end-4"
						type="text"
					>
						Добавить файл
					</Button>
				</Upload>
			)}
		</>
	)
}
