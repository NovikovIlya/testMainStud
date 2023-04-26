import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import uuid from 'react-uuid'

import { block } from '../constatant'
import DropDrag from '../test2'

import { Item } from './item'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const LayoutApp: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true)
	const [edit, setEdit] = useState(false)
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(() => {
		return localStorage.getItem('dashboard')
			? JSON.parse(localStorage.getItem('dashboard') || '')
			: block
	})
	const onAddItem = () => {
		setLayouts({
			...layouts,
			lg: [
				...layouts.lg,
				{
					i: uuid(),
					x: (layouts.lg.length * 2) % 5,
					y: Infinity,
					w: 2,
					h: 2
				}
			]
		})
	}
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	const onSelect = ({ key }: any) => {
		if (key !== '10') {
			setEdit(false)
		}
	}
	const items: MenuItem[] = Item(setEdit, edit, onAddItem)
	return (
		<Layout
			style={{ minHeight: '100vh', position: 'absolute', minWidth: '100vw' }}
		>
			<Sider
				collapsible
				collapsed={collapsed}
				style={{ position: 'absolute', height: '100%' }}
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
						<DropDrag edit={edit} layouts={layouts} setLayouts={setLayouts} />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					©2023 Created by Subhonbek
				</Footer>
			</Layout>
		</Layout>
	)
}
