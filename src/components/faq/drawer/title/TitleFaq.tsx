import { Typography } from 'antd'
import { FC } from 'react'

import { CloseSvg } from '../../../../assets/svg/CloseSvg'
import { EmailFillSvg } from '../../../../assets/svg/EmailFillSvg'
import { PhoneFillSvg } from '../../../../assets/svg/PhoneFillSvg'

import styles from './Title.module.scss'

interface ITitleFaqProps {
	showChildrenDrawer: () => void
	onClose: () => void
}

const { Text } = Typography

export const TitleFaq: FC<ITitleFaqProps> = ({
	showChildrenDrawer,
	onClose
}) => {
	return (
		<div className={styles.main}>
			<div onClick={onClose} className={styles.close}>
				<CloseSvg />
			</div>
			<h3 className={styles.title}>Центр поддержки</h3>
			<Text className={styles.work}>Работаем с Пн - Пт, 8:00 - 18:00</Text>
			<div className={styles.buttons}>
				<div onClick={showChildrenDrawer} className="cursor-pointer ">
					<EmailFillSvg />
				</div>
				<div className="cursor-pointer ">
					<PhoneFillSvg />
				</div>
			</div>
		</div>
	)
}
