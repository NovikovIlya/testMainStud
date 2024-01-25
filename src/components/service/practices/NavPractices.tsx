import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useState } from 'react'

import { PracticesSvg } from '../../../assets/svg/PracticesSvg'

import './Practices.sass'
import { RegisterContracts } from './RegisterContracts'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem
}

const items: MenuItem[] = [
	getItem('Справочники', 'sub1', <PracticesSvg />, [
		getItem('Реестр договоров', 'registerContracts'),
		getItem('Индивидуальные задания', '2'),
		getItem('Практики', '3')
	]),
	getItem('Формирование документов', 'sub2', <PracticesSvg />, [
		getItem('График практик', '5'),
		getItem('Представление в приказ', '6'),
		getItem('Приказ по практике', '7')
	]),
	getItem('Cогласование документов', 'sub4', <PracticesSvg />, [
		getItem('График практик', '9'),
		getItem('Представление в приказ', '10'),
		getItem('Приказ по практике', '11')
	])
]
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']
export const NavPractices = () => {
	const [openKeys, setOpenKeys] = useState(['sub1'])
	const [current, setCurrent] = useState('registerContracts')

	const onClick: MenuProps['onClick'] = e => {
		console.log('click ', e)
		setCurrent(e.key)
	}

	const onOpenChange: MenuProps['onOpenChange'] = keys => {
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
		if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys)
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
		}
	}

	return (
		<>
			<Menu
				defaultOpenKeys={['sub1']}
				selectedKeys={[current]}
				defaultActiveFirst
				mode="inline"
				onClick={onClick}
				onOpenChange={onOpenChange}
				className="w-60 flex flex-col gap-7"
				items={items}
			/>
			{current === 'registerContracts' && <RegisterContracts />}
		</>
	)
}
