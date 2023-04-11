import {
	AppstoreAddOutlined,
	DesktopOutlined,
	EditOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]
function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label
	} as MenuItem
}
export const Item = (
	setValue: (value: boolean) => void,
	value: boolean,
	addItem: () => void
): MenuItem[] => {
	const textEdit = value ? 'Save dashboard' : 'Edit dashboard'
	return [
		getItem('Option 1', '1', <PieChartOutlined />),
		getItem('Option 2', '2', <DesktopOutlined />),
		getItem('User', 'sub1', <UserOutlined />, [
			getItem('Tom', '3'),
			getItem('Bill', '4'),
			getItem('Alex', '5')
		]),
		getItem('Team', 'sub2', <TeamOutlined />, [
			getItem('Team 1', '6'),
			getItem('Team 2', '8')
		]),
		getItem('Files', '9', <FileOutlined />),
		{
			key: '10',
			label: textEdit,
			icon: <EditOutlined />,
			danger: value,

			onClick: () => setValue(!value)
		},
		{
			key: '11',
			label: 'Add item',
			icon: <AppstoreAddOutlined />,

			onClick: () => addItem()
		}
	]
}
