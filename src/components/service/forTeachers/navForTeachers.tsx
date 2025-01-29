import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageOutlined, PieChartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Header } from '../../layout/Header'
import Brs from './forTeachersService/Brs'
import { BrsSvg } from '../../../assets/svg/BrsSvg'
import { Raspis } from '../../../assets/svg/Raspis'
import { Schedule } from '../../cards/Schedule'
import ScheduleTeacher from './forTeachersService/ScheduleTeacher'
import { VedomostiSvg } from '../../../assets/svg/VedomostiSvg'
import { JournalPos } from '../../../assets/svg/JournalPos'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setIsEditTableScheduleTeacher } from '../../../store/reducers/authSlice'
import { Pvd } from '../../../assets/svg/Pvd'





export const NavForTeachers = () => {
	const [current, setCurrent] = useState('schedule')
	const navigate = useNavigate()
	const {t} = useTranslation()
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const refArray = [ref1, ref2, ref3];
	const isEditTableScheduleTeacher = useAppSelector((state)=>state.auth.isEditTableScheduleTeacher)
	const dispatch = useAppDispatch()

	const items: any = [
		{ key: 'schedule', icon: <Raspis  />, label: <p className='ml-[10px]'>{t('Schedule')}</p> },
		{ key: 'BRS', icon: <BrsSvg />, label: <p className='ml-[10px]'>{t('BRS')}</p> },
		{ key: 'vedomosti', icon: <VedomostiSvg />, label: <p className='ml-[10px]'>{t('vedomosti')}</p> },
		{ key: 'journalPos', icon: <JournalPos />, label: <p className='ml-[10px]'>{t('journalPos')}</p> },
		{ key: 'rpd', icon: <Pvd />, label: <p className='ml-[10px]'>{t('rpd')}</p> },
	]	
  
	const onClick: MenuProps['onClick'] = e => {
		if(isEditTableScheduleTeacher){
			let conf = window.confirm('Вы действительно хотите продолжить? Есть несохраненные изменения');
			if(!conf){
				return
			}
		}
		if(e.key==='sub3'){
			return
		}
		// navigate('/services/' + e.key)
		setCurrent(e.key)
		dispatch(setIsEditTableScheduleTeacher(false))
	}
	


	return (
		<>
			<Header type={"service"} service={t('Schedule')}/>
			<Menu
				selectedKeys={[current]}
				mode="inline"
				onClick={onClick}
				className="min-w-[230px] max-w-[230px] flex flex-col  mt-36 h-[calc(100vh-144px)]"
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
			/>
			
			<div className="bg-[#F5F8FB] w-full pt-[80px]      ">
				{current === 'schedule' && <ScheduleTeacher/>}
				{current === 'BRS' ? <Brs/> : ''}
			</div>
			
			
		</>
	)

}