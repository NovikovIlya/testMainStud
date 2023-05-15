import { FC, useState } from 'react'

import { FaqSvg } from '../../assets/svg'

import styles from './Faq.module.scss'
import { DrawerEmail } from './drawer/Drawer'

export const Faq: FC = () => {
	const [open, setOpen] = useState(false)
	const [childrenDrawer, setChildrenDrawer] = useState(false)

	const showDrawer = () => setOpen(true)
	const onClose = () => setOpen(false)
	const showChildrenDrawer = () => setChildrenDrawer(true)
	const onChildrenDrawerClose = () => setChildrenDrawer(false)

	return (
		<div className="fixed right-[92px] bottom-[92px]">
			<div onClick={showDrawer} className="cursor-pointer">
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
