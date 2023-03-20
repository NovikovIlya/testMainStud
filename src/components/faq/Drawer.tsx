import { Collapse, Drawer } from 'antd'
import { FC } from 'react'

import './Drawer.scss'
import { TitleFaq } from './Title'

interface IDrawerPros {
	open: boolean
	onClose: () => void
}

const { Panel } = Collapse

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export const DrawerEmail: FC<IDrawerPros> = ({ open, onClose }) => {
	return (
		<>
			<Drawer
				title={<TitleFaq />}
				size="default"
				onClose={onClose}
				closable={false}
				open={open}
				headerStyle={{ textAlign: 'center' }}
			>
				<Collapse expandIcon={() => <></>} ghost>
					<Panel header="This is panel header 1" key="1">
						<p>{text}</p>
					</Panel>
					<Panel header="This is panel header 2" key="2">
						<p>{text}</p>
					</Panel>
					<Panel header="This is panel header 3" key="3">
						<p>{text}</p>
					</Panel>
				</Collapse>
			</Drawer>
		</>
	)
}
