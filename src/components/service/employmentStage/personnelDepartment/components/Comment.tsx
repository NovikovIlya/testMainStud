import React, { useState } from 'react'

interface CommentProps {
	commentText: string
	commentStatus: 'visible' | 'invisible'
}

export const Comment = ( props: CommentProps ) => {

	const [isCommentExpanded, setIsCommentExpanded] = useState(false);

	let fullText = props.commentText

	let shortText = fullText.slice(0, 40) + "...";

	return (
		<div className={` ${ props.commentStatus === 'visible' ? 'flex' : 'hidden'} flex flex-col pl-[20px] gap-[4px] mt-[20px] mb-[20px] max-w-[50%]`}>
			<span className="text-[14px]/[16.8px] text-black opacity-[40%] font-normal">Комментарий на доработку: </span>
			<span className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">{isCommentExpanded ? fullText : shortText}
				<button
					onClick={() =>
						setIsCommentExpanded(!isCommentExpanded)
				}
						className="ml-[4px] border-none cursor-pointer bg-white text-[14px]/[16.8px] font-bold text-black opacity-[100%]">
					{isCommentExpanded ? 'Свернуть' : 'Развернуть'}
				</button></span>
		</div>
	)
}