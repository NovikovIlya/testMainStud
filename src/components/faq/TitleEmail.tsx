import { Typography } from 'antd'
import { FC } from 'react'

interface ITitleEmailProps {
	onClose: () => void
}

const { Title, Text } = Typography

export const TitleEmail: FC<ITitleEmailProps> = ({ onClose }) => {
	return (
		<div className=" pb-[25px] rounded-b">
			<div onClick={onClose} className="absolute right-0 mr-5 cursor-pointer">
				<svg
					width="26"
					height="29"
					viewBox="0 0 26 29"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6.60632 7.78662L19.3342 21.7929"
						stroke="#B3B3B3"
						strokeWidth="1.57667"
						strokeLinecap="round"
					/>
					<path
						d="M6.60742 21.793L19.3353 7.78667"
						stroke="#B3B3B3"
						strokeWidth="1.57667"
						strokeLinecap="round"
					/>
				</svg>
			</div>
			<Title style={{ marginBottom: 5, marginTop: 20 }} level={3}>
				Письмо
			</Title>
			<Text className="text-black opacity-50 text-start flex px-4">
				Время ответа зависит от нагрузки на операторов, но обычно не превышает 1
				рабочего дня
			</Text>
		</div>
	)
}
