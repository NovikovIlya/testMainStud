import { useState } from 'react'
import { useAppSelector } from '../../../../../store'

interface CommentProps {
	commentText: string
}

export const Comment = ( props: CommentProps ) => {

	const visibility = useAppSelector(state => state.currentCommentVisibility.visibility)

	const [isCommentExpanded, setIsCommentExpanded] = useState(false);

	let fullText = props.commentText
	let shortText = fullText.slice(0, 40) + "...";

	return (
		<div className={` ${ (visibility === 'invisible') ? 'hiiden' : 'flex'}
											${ (visibility === 'visible') ? 'flex' : 'hidden'}
		 									flex flex-col gap-[4px] max-w-[50%]`}>
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