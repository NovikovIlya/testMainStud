import { MessageFilled } from '@ant-design/icons'
import { FC, useState } from 'react'

import { DrawerEmail } from './Drawer'
import styles from './Faq.module.scss'
import { FaqSvg } from './FaqSvg'
import logo from './Group.png'

export const Faq: FC = () => {
	const [open, setOpen] = useState(false)

	const showDrawer = () => setOpen(true)

	const onClose = () => setOpen(false)

	return (
		<div>
			<img className={styles.img} src={logo} alt="group" />
			<div className={styles.faq} onClick={showDrawer}>
				<FaqSvg />
			</div>
			<DrawerEmail onClose={onClose} open={open} />
		</div>
	)
}
