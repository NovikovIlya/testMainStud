import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'

import DropDrag from '../test2'

import styles from './Layout.module.scss'
import { Item } from './item'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const LayoutApp: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true)
	const [edit, setEdit] = useState(false)

	const {
		token: { colorBgContainer }
	} = theme.useToken()
	const onSelect = ({ key }: any) => {
		if (key !== '10') {
			setEdit(false)
		}
	}
	const items: MenuItem[] = Item(setEdit, edit)
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				style={{ position: 'absolute', bottom: 0, top: 0 }}
				onCollapse={value => setCollapsed(value)}
			>
				<div
					style={{
						height: 32,
						background: 'rgba(255, 255, 255, 0.2)'
					}}
				/>
				<Menu
					theme="dark"
					defaultSelectedKeys={['1']}
					mode="inline"
					items={items}
					onSelect={onSelect}
				/>
			</Sider>
			<Layout
				className={`site-layout transition-all ${
					collapsed ? ' ml-[120px]' : ' ml-[200px]'
				}`}
			>
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content className="ml-4">
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
					</Breadcrumb>
					<div
						className={`p-6 min-h-fit transition-all ${
							collapsed ? ' mr-[80px]' : ' mr-0'
						}`}
						style={{
							background: colorBgContainer
						}}
					>
						<DropDrag edit={edit} />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					©2023 Created by Subhonbek
				</Footer>
			</Layout>
		</Layout>
	)
}
