import { useState } from 'react'
import { useAppSelector } from '../../../../../store'

interface CommentProps {
	commentTextBd: string
	commentTextState: string
}

export const StageComment = (props: CommentProps ) => {

	let commentText = ''
	console.log(props.commentTextBd)
	console.log(props.commentTextState)
	if (props.commentTextState === '') {
		commentText = props.commentTextBd;
	}

	if (props.commentTextState === props.commentTextBd) {
		commentText = props.commentTextBd;
	}

	if (props.commentTextBd === null ) {
		commentText = props.commentTextState;
	}

	const [isCommentExpanded, setIsCommentExpanded] = useState(false);

	let shortText = commentText.slice(0, 40) + "...";

	let isTextLongEnough : boolean = false

	if (commentText.length>40) {
		isTextLongEnough = true
	}
	if (commentText.length<=40) {
		isTextLongEnough = false
	}
	console.log('гена на:' + isTextLongEnough)

	return (
		<div className="flex flex-col gap-[4px] max-w-[50%]">
			<span className="text-[14px]/[16.8px] text-black opacity-[40%] font-normal">Комментарий на доработку: </span>
			{!(isTextLongEnough) && (
				<span className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">{commentText}</span>
			)}
			{(isTextLongEnough) && (
				<span
					className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">{(isCommentExpanded && isTextLongEnough) ? commentText : shortText}
					<button
						onClick={() =>
							setIsCommentExpanded(!isCommentExpanded)}
						className="ml-[4px] border-none cursor-pointer bg-white text-[14px]/[16.8px] font-bold text-black opacity-[100%]">
						{isCommentExpanded ? 'Свернуть' : 'Развернуть'}
					</button>
				</span>
			)}
		</div>
	)
}