import { DocumentIcon } from '../../../../../assets/svg/DocumentIcon'
import React from 'react'

interface DocumentElemProps {
	name: string
	weight: string
}

export const DocumentElem = (props: DocumentElemProps) => {
	return (
		<div className="flex flex-row w-[388px] justify-between cursor-pointer">
			<div className='flex flex-row items-center'>
				<DocumentIcon></DocumentIcon>
				<span className="underline font-normal ml-[12px] underline-offset-2 text-[16px]/[19.2px] ">{props.name}</span>
			</div>
			<span className="font-normal opacity-[70%] text-[16px]/[19.2px]">{props.weight}</span>
		</div>
	)
}