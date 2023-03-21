import { Typography } from 'antd'
import { FC } from 'react'

import { CloseSvg } from '../../../../assets/svg/CloseSvg'
import { EmailFillSvg } from '../../../../assets/svg/EmailFillSvg'
import { PhoneFillSvg } from '../../../../assets/svg/PhoneFillSvg'

interface ITitleFaqProps {
	showChildrenDrawer: () => void
	onClose: () => void
}

const { Title, Text } = Typography

export const TitleFaq: FC<ITitleFaqProps> = ({
	showChildrenDrawer,
	onClose
}) => {
	return (
		<div className="shadow pb-[25px] rounded-b">
			<div onClick={onClose} className="absolute right-0 m-5 cursor-pointer">
				<CloseSvg />
			</div>
			<Title style={{ marginBottom: 5, marginTop: 20 }} level={3}>
				Центр поддержки
			</Title>
			<Text className="text-black opacity-50 ">
				Работаем с Пн - Пт, 8:00 - 18:00
			</Text>
			<div className="flex justify-center gap-5 mt-[15px]">
				<div onClick={showChildrenDrawer} className="cursor-pointer">
					<EmailFillSvg />
				</div>
				<div className="cursor-pointer">
					<PhoneFillSvg />
				</div>
			</div>
		</div>
	)
}
