import React from 'react'

const InfoCard = ({ text }: any) => {
	return (
		<div className="bg-[#FFF0E5] shadow p-4 flex gap-3">
			<img className="w-[32px] h-[32px]" src="/vosk.png" />
			<div>{text}</div>
		</div>
	)
}

export default InfoCard
