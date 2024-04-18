import { DocxIcon } from '../../../assets/svg/DocxIcon'
import { FileDownloadIcon } from '../../../assets/svg/FileDownloadIcon'
import { PdfIcon } from '../../../assets/svg/PdfIcon'

export const ChatMessageFile = (props: { id: number; name: string }) => {
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
				<FileDownloadIcon />
			</div>
		</>
	)
}
