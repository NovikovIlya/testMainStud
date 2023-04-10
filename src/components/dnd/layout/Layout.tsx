import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'

import DropDrag from '../test2'

import styles from './Layout.module.scss'
import { Item } from './item'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const LayoutApp: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
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
		<Layout className={styles.layout}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<div
					style={{
						height: 32,
						margin: 16,
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
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
					</Breadcrumb>
					<div
						style={{
							padding: 24,
							minHeight: 360,
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
