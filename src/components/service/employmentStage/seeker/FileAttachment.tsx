import { Button, Upload } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { MyDocsSvg } from '../../../../assets/svg/MyDocsSvg'
import { useAppSelector } from '../../../../store'
import {
	useDeleteEmploymentDocMutation,
	useLazyDownloadEmploymentSeekerFileQuery,
	useLazyGetEmploymentDataQuery,
	useUploadEmploymentDocumentMutation
} from '../../../../store/api/serviceApi'
import {
	removePartialData,
	setAllData,
	setPartialData
} from '../../../../store/reducers/EmploymentDataSlice'
import { EmploymentDocsType } from '../../../../store/reducers/type'

export const FileAttachment = (
	props: EmploymentDocsType & {
		respondId: number
		stageName: string
		seventhStage: boolean
	}
) => {
	const { empData } = useAppSelector(state => state.employmentData)

	const [fileType, setFileType] = useState<string>('')
	const [isFileUploading, setIsFileUploading] = useState<boolean>(false)
	const [fileName, setFileName] = useState<string>('dkaskjdasd9')

	const foundDoc = empData.stages
		.find(stage => stage.type === props.stageName)
		?.documents.find(doc => doc.docType === props.name)

	const dispatch = useDispatch()
	const [deleteDoc] = useDeleteEmploymentDocMutation()
	const [getEmpData] = useLazyGetEmploymentDataQuery()
	const [uploadDoc] = useUploadEmploymentDocumentMutation()
	const [downloadDoc] = useLazyDownloadEmploymentSeekerFileQuery()

	return (
		<>
			<div className="flex gap-[12px] col-start-1">
				<MyDocsSvg />
				<p>{props.name}</p>
			</div>
			{foundDoc ? (
				<>
					<p
						className="col-start-2 h-[20px] text-ellipsis overflow-clip pointer-events-auto underline text-blue-600 cursor-pointer"
						onClick={() => {
							downloadDoc({ respondId: props.respondId, docId: foundDoc.id })
								.unwrap()
								.then(({ href }) => {
									const docA = document.createElement('a')
									docA.href = href
									docA.download = decodeURI(foundDoc.name)
									docA.click()
								})
						}}
					>
						{decodeURI(foundDoc.name)}
					</p>
					<div className="col-start-3 ml-auto flex gap-[36px] items-center">
						<p className="">
							{Math.round(foundDoc.size / 1000000) > 0
								? Math.round(foundDoc.size / 1000000) + ' Мб'
								: Math.round(foundDoc.size / 1000) > 0
								? Math.round(foundDoc.size / 1000) + ' Кб'
								: foundDoc.size + ' б'}
						</p>
						{!props.seventhStage && (
							<Button
								className="bg-inherit ml-auto opacity-40 underline"
								type="text"
								onClick={() => {
									deleteDoc({ respondId: props.respondId, docId: foundDoc.id })
										.unwrap()
										.then(() => {
											dispatch(
												removePartialData({
													stageName: props.stageName,
													docId: foundDoc.id
												})
											)
										})
								}}
							>
								Удалить
							</Button>
						)}
					</div>
				</>
			) : !props.seventhStage ? (
				<Upload
					className="col-start-3 ml-auto mr-[10%]"
					accept=".png,.jpg,.jpeg,.pdf"
					showUploadList={false}
					customRequest={options => {
						const { file, filename, onSuccess, onError } = options

						setIsFileUploading(true)

						uploadDoc({
							respondId: props.respondId,
							id: props.id,
							file: file as File,
							fileName: fileName
						})
							.unwrap()
							.then(res => {
								console.log(decodeURI(res.name))
								onSuccess && onSuccess(file)
								dispatch(
									setPartialData({
										stageName: props.stageName,
										docType: props.name,
										id: res.id,
										name: res.name,
										size: res.size
									})
								)
								setIsFileUploading(false)
							})
							.catch(() => {
								const err = new Error('Не удалось загрузить файл')
								onError && onError(err)
							})
					}}
					beforeUpload={file => {
						setFileType(file.type)
						setFileName(file.name)
					}}
					onChange={options => {
						options.file.status === 'uploading'
							? setIsFileUploading(true)
							: options.file.status === 'error' ||
							  options.file.status === 'removed'
							? console.log('Произошла чудовищная ошибка')
							: setIsFileUploading(false)
					}}
				>
					{' '}
					<Button
						loading={isFileUploading}
						className="border-black border rounded-[5px] py-[12px] px-[20px]"
						type="text"
					>
						Добавить файл
					</Button>
				</Upload>
			) : (
				<p className="col-start-3 ml-auto">Отсутствует</p>
			)}
		</>
	)
}
