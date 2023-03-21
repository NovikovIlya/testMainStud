import { FC, useState } from 'react'

import { FaqSvg } from '../../assets/svg/FaqSvg'

import styles from './Faq.module.scss'
import logo from './Group.png'
import { DrawerEmail } from './drawer/Drawer'

export const Faq: FC = () => {
	const [open, setOpen] = useState(false)
	const [childrenDrawer, setChildrenDrawer] = useState(false)

	const showDrawer = () => setOpen(true)
	const onClose = () => setOpen(false)
	const showChildrenDrawer = () => setChildrenDrawer(true)
	const onChildrenDrawerClose = () => setChildrenDrawer(false)

	return (
		<div className={styles.main}>
			<img className={styles.img} src={logo} alt="group" />
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
