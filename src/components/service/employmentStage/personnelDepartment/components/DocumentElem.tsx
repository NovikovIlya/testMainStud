import { DocumentIcon } from '../../../../../assets/svg/DocumentIcon'
import {
	useDownloadEmploymentStageFileQuery,
} from '../../../../../store/api/serviceApi'

interface DocumentElemProps {
	name: string
	id: number
}

export const DocumentElem = (props: DocumentElemProps) => {

	return (
		<button
			className="flex flex-row min-w-[500px] w-[50%] justify-between cursor-pointer bg-white border-none
      hover:opacity-[80%]"
			onClick={() => {
				console.log('click')

			}}>
			<div className='flex flex-row items-center'>
				<DocumentIcon />
				<span className="underline font-normal ml-[12px] underline-offset-[4px] text-[16px]/[19.2px] ">
          			{props.name}
        		</span>
			</div>
			{/*
			<span className="font-normal opacity-[70%] text-[16px]/[19.2px]">
         		тут кб по и дее
      		</span>
			*/}
		</button>
	)
}