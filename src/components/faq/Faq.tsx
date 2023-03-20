import { FC, useState } from 'react'

import { DrawerEmail } from './Drawer'
import styles from './Faq.module.scss'
import { FaqSvg } from './FaqSvg'
import logo from './Group.png'

export const Faq: FC = () => {
	const [open, setOpen] = useState(false)
	const [childrenDrawer, setChildrenDrawer] = useState(false)

	const showDrawer = () => setOpen(true)
	const onClose = () => setOpen(false)
	const showChildrenDrawer = () => setChildrenDrawer(true)
	const onChildrenDrawerClose = () => setChildrenDrawer(false)

	return (
		<div>
			<img
				width={712}
				height={537}
				className={styles.img}
				src={logo}
				alt="group"
			/>
			<div className={styles.faq} onClick={showDrawer}>
				<FaqSvg />
			</div>
			<DrawerEmail
				childrenDrawer={childrenDrawer}
				onChildrenDrawerClose={onChildrenDrawerClose}
				onClose={onClose}
				showChildrenDrawer={showChildrenDrawer}
				open={open}
			/>
		</div>
	)
}
