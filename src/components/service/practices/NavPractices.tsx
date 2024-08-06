import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PracticesSvg } from '../../../assets/svg/PracticesSvg'

import './Practices.sass'
import { Tasks } from './individual-tasks/Tasks'
import { Practical } from './practical/Practical'
import { Roster } from './roster/Roster'
import { Schedule } from './forming-schedule/Schedule'
import {Header} from "../../layout/Header";
import {useTranslation} from "react-i18next";
import { Representation } from './Representation/Representation'
import { PracticeOrder } from './practice-order/PracticeOrder'

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
		getItem('Индивидуальные задания', 'individualTasks'),
		getItem('Практики', 'practical.ts')
	]),
	getItem('Формирование документов', 'sub2', <PracticesSvg />, [
		getItem('График практик', 'formingSchedule'),
		// getItem('Представление в приказ', 'representation'),
		// getItem('Приказ по практике', 'practiceOrder')
	]),
	// getItem('Cогласование документов', 'sub4', <PracticesSvg />, [
	// 	getItem('График практик', '9'),
	// 	getItem('Представление в приказ', '10'),
	// 	getItem('Приказ по практике', '11')
	// ])
]
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']
export const NavPractices = () => {
	const [openKeys, setOpenKeys] = useState(['sub1'])
	const [current, setCurrent] = useState('registerContracts')
	const navigate = useNavigate()
	const {t} = useTranslation()

	const onClick: MenuProps['onClick'] = e => {
		navigate('/services/practices/' + e.key)
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
			<Header type={"service"} service={t("Practices")}/>
			<Menu
				defaultOpenKeys={['sub1']}
				selectedKeys={[current]}
				defaultActiveFirst
				mode="inline"
				onClick={onClick}
				onOpenChange={onOpenChange}
				className="min-w-[230px] max-w-[230px] flex flex-col gap-7 mt-28"
				items={items}
			/>
			<div className="bg-[#F5F8FB] w-full pt-14 px-14 mt-20">
				{current === 'registerContracts' && <Roster />}
				{current === 'individualTasks' && <Tasks />}
				{current === 'practical.ts' && <Practical />}
				{current === 'formingSchedule' && <Schedule/>}
				{current === 'representation' && <Representation/>}
				{current === 'practiceOrder' && <PracticeOrder/>}
			</div>
		</>
	)
}
