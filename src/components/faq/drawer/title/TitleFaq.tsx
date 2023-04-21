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

const { Text, Link } = Typography

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
				<div className="cursor-pointer bg-darkblue flex items-center justify-center rounded-full p-[1.5vh]">
					<Link href="mailto:deshelp@kpfu.ru">
						<EmailFillSvg />
					</Link>
				</div>
				<div className="cursor-pointer bg-darkblue flex items-center justify-center rounded-full p-[1.5vh]">
					<Link href="tel:+7 (843) 206-50-84">
						<PhoneFillSvg />
					</Link>
				</div>
			</div>
		</div>
	)
}
