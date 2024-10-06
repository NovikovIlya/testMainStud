import { DocumentIcon } from '../../../../../assets/svg/DocumentIcon'
import { useDownloadEmploymentStageFileQuery } from "../../../../../store/api/serviceApi"

interface DocumentElemProps {
	name: string

}

export const DocumentElem = (props: DocumentElemProps) => {

	const fileId = 1 // TODO прикрутить реальный id

	const { data: fileBlob } = useDownloadEmploymentStageFileQuery({ fileId: fileId })

	// Проверка на наличие
	const fileSizeInKB = fileBlob ? (fileBlob.size / 1024).toFixed(2) : 'N/A'

	const downloadFile = (fileBlob: Blob, fileName: string) => {
		const link = document.createElement('a')
		link.href = window.URL.createObjectURL(fileBlob)
		link.download = fileName
		link.click()

	}

	return (
		<button
			className="flex flex-row w-[388px] justify-between cursor-pointer bg-white border-none
      hover:opacity-[80%]"
			onClick={() => {
				if (fileBlob) {
					downloadFile(fileBlob, props.name)
				} else {
					alert('Файл не найден.')
				}
			}}>
			<div className='flex flex-row items-center'>
				<DocumentIcon />
				<span className="underline font-normal ml-[12px] underline-offset-2 text-[16px]/[19.2px] ">
          {props.name}
        </span>
			</div>
			<span className="font-normal opacity-[70%] text-[16px]/[19.2px]">
        {fileSizeInKB !== 'N/A' ? `${fileSizeInKB} кб` : '???'}
      </span>
		</button>
	)
}