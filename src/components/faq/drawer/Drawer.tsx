import { Button, Collapse, Divider, Drawer, Typography } from 'antd'
import { FC } from 'react'

import { EmailSvg } from '../../../assets/svg/EmailSvg'
import { PhoneSvg } from '../../../assets/svg/PhoneSvg'
import { QuestionSvg } from '../../../assets/svg/QuestionSvg'

import './Drawer.scss'
import { EmailDrawer } from './emailDrawer/EmailDrawer'
import { TitleFaq } from './title/TitleFaq'

interface IDrawerPros {
	open: boolean
	onClose: () => void
	onChildrenDrawerClose: () => void
	showChildrenDrawer: () => void
	childrenDrawer: boolean
}

const { Panel } = Collapse
const { Link } = Typography

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export const DrawerEmail: FC<IDrawerPros> = ({
	open,
	onClose,
	childrenDrawer,
	onChildrenDrawerClose,
	showChildrenDrawer
}) => {
	return (
		<>
			<Drawer
				title={
					<TitleFaq onClose={onClose} showChildrenDrawer={showChildrenDrawer} />
				}
				onClose={onClose}
				closable={false}
				open={open}
				headerStyle={{ textAlign: 'center' }}
			>
				<Collapse expandIcon={() => <QuestionSvg />} ghost>
					<Panel header="Как подключиться к Wi-Fi КФУ?" key="1">
						<p>{text}</p>
					</Panel>
					<Panel header="Как получить учетные данные?" key="2">
						<p>{text}</p>
					</Panel>
					<Panel header="Ответы на частые вопросы" key="3">
						<p>{text}</p>
					</Panel>
				</Collapse>
				<Divider />
				<Button
					onClick={showChildrenDrawer}
					className="flex items-center w-full gap-2 mb-3"
					icon={<EmailSvg />}
					type="text"
				>
					Написать письмо
				</Button>
				<Button
					className="flex w-full items-center gap-2 mb-3"
					icon={<PhoneSvg />}
					type="text"
				>
					Позвонить
				</Button>
				<Divider />
				<div className="flex justify-center items-center text-lg">
					<Link
						href="mailto:deshelp@kpfu.ru"
						strong
						style={{ color: '#808080' }}
						className=" cursor-pointer"
					>
						deshelp@kpfu.ru
					</Link>
					<Divider className=" h-[25px]" type="vertical" />
					<Link
						href="tel:+7 (843) 206-50-84"
						style={{ color: '#808080' }}
						strong
						className="cursor-pointer"
					>
						+7 (843) 206-50-84
					</Link>
				</div>
				<EmailDrawer
					childrenDrawer={childrenDrawer}
					onChildrenDrawerClose={onChildrenDrawerClose}
				/>
			</Drawer>
		</>
	)
}
