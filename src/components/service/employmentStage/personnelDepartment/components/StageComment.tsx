import { useState } from 'react'

interface CommentProps {
	commentTextBd: string
	commentTextState: string
}

export const StageComment = (props: CommentProps ) => {

	let commentText = ''

	if (props.commentTextState === '' && props.commentTextBd !== undefined) {
		commentText = props.commentTextBd.trim()
	}

	if (props.commentTextState === props.commentTextBd) {
		commentText = props.commentTextBd.trim()
	}

	if ((props.commentTextBd === null) || (props.commentTextBd === '') || (props.commentTextBd === undefined)) {
		commentText = props.commentTextState
	}

	if ((props.commentTextBd !== null) && (props.commentTextState !== undefined) && (props.commentTextState !== '') && (props.commentTextBd !== props.commentTextState)) {
		commentText = props.commentTextState
	}

	const [isCommentExpanded, setIsCommentExpanded] = useState(false);

	let shortText = commentText.slice(0, 120) + "..."

	let isTextLongEnough : boolean = false

	if (commentText.length>120) {
		isTextLongEnough = true
	}
	if (commentText.length<=120) {
		isTextLongEnough = false
	}
	console.log('коммент из стейта ' + "|" + props.commentTextState + "|")
	console.log('коммент из бд ' + props.commentTextBd)
	console.log('длина коммента ' + commentText.length)

	return (
		<div className="flex flex-col gap-[4px] max-w-[90%]">
			<span className="text-[14px]/[16.8px] text-black opacity-[40%] font-normal">Комментарий на доработку: </span>
			{!(isTextLongEnough) && (
				<span className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">{commentText}</span>
			)}
			{(isTextLongEnough) && (
				<>

				<span
					className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">{(isCommentExpanded && isTextLongEnough) ? commentText : shortText}
					<button
						onClick={() =>
							setIsCommentExpanded(!isCommentExpanded)}
						className="ml-[4px] border-none cursor-pointer bg-white text-[14px]/[16.8px] font-bold text-black opacity-[100%]">
						{isCommentExpanded ? 'Свернуть' : 'Развернуть'}
					</button>
				</span></>
			)}
		</div>
	)
}