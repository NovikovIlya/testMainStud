import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageOutlined, PieChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Header } from '../../layout/Header'
import { RouteMessage } from './Messages/routeMessages'




export const NavMessages = () => {
	const [current, setCurrent] = useState('messages')
	const navigate = useNavigate()
	const {t} = useTranslation()
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const refArray = [ref1, ref2, ref3];
	console.log('current',current)

	const items: any = [
		{ key: 'messages', icon: <MessageOutlined  />, label: t('messages') },

		{ key: 'delete', icon: <PieChartOutlined />, label: 'Корзина' },
		{ key: 'delete3', icon: <PieChartOutlined />, label: 'Корзина3' }
		
	]
  
	const onClick: MenuProps['onClick'] = e => {
		console.log('click ', e)
		if(e.key==='sub3'){
			return
		}
		// navigate('/services/' + e.key)
		setCurrent(e.key)
	}



	return (
		<>
			<Header type={"service"} service={t("messages")}/>
			{/* <Menu
				defaultSelectedKeys={['messages']}
	
				mode="inline"
				onClick={onClick}
				className="min-w-[230px] max-w-[230px] flex flex-col  mt-36 h-full"
				items={items.map((item: any, index: number) => ({
					key: item.key,
					icon: item.icon,
					children: item.children,
					label: (
					  <div className='' ref={refArray[index]}>
						{item?.label}
					  </div>
					)
				  }))}
			/> */}
			
			<div className="bg-[#F5F8FB] w-full       ">
				{current === 'messages' && <RouteMessage/>}
				{current === 'delete' && <>sad</>}
			</div>
			
			
		</>
	)

}