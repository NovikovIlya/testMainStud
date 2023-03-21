import { Typography } from 'antd'
import { FC } from 'react'

import { CloseSvg } from '../../../../assets/svg/CloseSvg'

interface ITitleEmailProps {
	onClose: () => void
}

const { Title, Text } = Typography

export const TitleEmail: FC<ITitleEmailProps> = ({ onClose }) => {
	return (
		<div className=" pb-[25px] rounded-b">
			<div onClick={onClose} className="absolute right-0 mr-5 cursor-pointer">
				<CloseSvg />
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
