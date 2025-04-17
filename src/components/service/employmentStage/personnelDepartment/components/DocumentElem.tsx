import { useEffect, useState } from 'react'

import { DocumentIcon } from '../../../../../assets/svg/DocumentIcon'
import { useLazyDownloadEmploymentStageFileQuery } from '../../../../../store/api/serviceApi'

interface DocumentElemProps {
	name: string
	fileName: string
	id: number
}

export const DocumentElem = (props: DocumentElemProps) => {
	const [resume, setResume] = useState<string>('')
	const [resumeSize, setResumeSize] = useState<number>(0)

	const [download, downloadStatus] = useLazyDownloadEmploymentStageFileQuery()

	useEffect(() => {
		download({ fileId: props.id })
			.unwrap()
			.then(file => {
				setResume(prev => file.href)
				setResumeSize(prev => file.size)
			})
	}, [])

	return (
		<button
			className="flex flex-row min-w-[500px] w-[50%] justify-between cursor-pointer bg-white border-none
      hover:opacity-[80%]"
			onClick={() => {
				const link = document.createElement('a')
				link.href = resume
				link.download = decodeURI(props.name)
				link.click()
			}}
		>
			<div className="flex flex-row items-center">
				<DocumentIcon />
				<span className="underline font-normal ml-[12px] underline-offset-[4px] text-[16px]/[19.2px] ">
					{props.name}
				</span>
			</div>
		</button>
	)
}
