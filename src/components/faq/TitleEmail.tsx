import { Typography } from 'antd'
import { FC } from 'react'

const { Title, Text } = Typography

export const TitleEmail: FC = () => {
	return (
		<div className=" pb-[25px] rounded-b">
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
