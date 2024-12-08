

import type { MenuProps } from 'antd'
import { Button, Menu, Tour } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PracticesSvg } from '../../../assets/svg/PracticesSvg'

import './Practices.sass'
import './PracticesStyle.scss'
import { Tasks } from './individual-tasks/Tasks'
import { Practical } from './practical/Practical'
import { Roster } from './roster/Roster'
import { Schedule } from './forming-schedule/Schedule'
import {Header} from "../../layout/Header";
import {useTranslation} from "react-i18next";
import { Representation } from './Representation/Representation'
import { PracticeOrder } from './practice-order/PracticeOrder'
import { Appendix } from './appendix/Appendix'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Finally } from './finally/Finally'
import useWindowOrientation from '../../../utils/hooks/useDeviceOrientation'
import { isMobileDevice } from '../../../utils/hooks/useIsMobile'


type MenuItem = Required<MenuProps>['items'][number]




const rootSubmenuKeys = ['sub1','sub2','sub22']
export const NavPractices = () => {
	const [openKeys, setOpenKeys] = useState(['sub1'])
	const [current, setCurrent] = useState('registerContracts')
	const navigate = useNavigate()
	const {t} = useTranslation()
	const ref1 = useRef<HTMLButtonElement | null>(null);
	const ref2 = useRef<HTMLButtonElement | null>(null);
	const ref3 = useRef<HTMLButtonElement | null>(null);
	
	const refArray:any = [ref1, ref2, ref3];
	const [open, setOpen] = useState<boolean>(false);
	const orientation  = useWindowOrientation()
	const isMobile = false


	const items: any = [
		{
		  key: 'sub1',
		  label: 'Справочники',
		  icon: <PracticesSvg />,
		  children: [
			{ key: 'registerContracts', label: 'Реестр договоров' },
			{ key: 'individualTasks', label: 'Индивидуальные задания' },
			{ key: 'practical.ts', label: 'Практики' }
		  ],
		},
		{
		  key: 'sub2',
		  label: 'Формирование документов',
		  icon: <PracticesSvg />,
		  children: [
			{ key: 'formingSchedule', label: 'График практик' },
			{ key: 'representation', label: 'Представление в приказ' },
			{ key: 'practiceOrder', label: 'Приказ по практике' },
			{ key: 'appendix', label: 'Приложение 4' }
		  ],
		},
		{
		  key: 'sub22',
		  label: 'Итоговая проверка',
		  icon: <PracticesSvg />,
		  children: [
			{ key: 'finally', label: 'Итоговая проверка' }
		  ],
		},
		{
		  key: 'sub3',
		  label: <Button className='opacity-70 mt-1 items-center' onClick={() => {
			if(!ref1.current?.closest('li')?.classList.contains('ant-menu-submenu-open') ){
			  ref1.current?.click()
			}
			if(!ref2.current?.closest('li')?.classList.contains('ant-menu-submenu-open') ){
			  ref2.current?.click()
			}
			if(!ref3.current?.closest('li')?.classList.contains('ant-menu-submenu-open') ){
			  ref3.current?.click()
			}
			setOpen(true);
		  }}>Пройти обучение</Button>,
		  icon: <QuestionCircleOutlined className='invisible absolute top-1/2 -translate-y-1/2 right-4' />
		}
	  ]
	  
  
	const steps: any = [
		{
			title: '',
			description: 'Модуль «Практики студентов» предназначен для автоматизации процесса направления студентов на практические подготовки, а также для контроля прохождения практики студентов, т.е. для формирования и отправки на согласование отчетных документов.',
			cover: (
			  <img
				style={{ width: '300px',height: '200px' }}
				alt="tour.png"
				src="https://govoritnotariat.com/upload/iblock/a4f/a4f8276b6d077d137da443ba27faa3dc.jpg"
			  />
			),
			
		  },
	  {
		title: 'Справочники',
		description: 'Справочники представляют собой «банк информации», которая в дальнейшем используется для формирования документов. Реестр договоров – «банк договоров» КФУ с организациями, в которых студенты КФУ могут проходить практику. Информация об организациях в дальнейшем используется при формировании Представления в Приказ (ПвП), Приказа по практике (ПП) и Приложения 4 (П4).',
		cover: (
		  <img
			style={{ width: '200px',height: '150px' }}
			alt="tour.png"
			src="https://i.ibb.co/T4MsPmz/c139a117-e447-4b7f-a3d0-0d69da42c23d.png"
		  />
		),
		target: () => ref1.current,
		placement: 'bottom',
	  },
	
	  {
		title: 'Реестр договоров',
		description: 'Принципы работы в «Реестре договоров»: для заполнения обязательны все поля, особенно прикрепление документов (файл договора и и доп. Соглашения) – поскольку если студент пройдет практику в организации, с которой еще не успели заключить или продлить договор, то практика не будет засчитываться. Для недопущения подобных ситуаций данные поля были сделаны обязательными.',
		target: () => document.querySelectorAll('.ant-menu-item')[0],
		placement: 'right',
	  },
	  {
		title: '«Индивидуальные задания»',
		description: 'В справочнике «Индивидуальные задания» хранится перечень индивидуальных заданий для конкретной специальности и типа практики. Инд. Задания будут нужны для формирования документов в ЛК студента',
		target: () => document.querySelectorAll('.ant-menu-item')[1],
		placement: 'right',
	  },
	  {
		title: 'Практики',
		description: 'Справочник практики содержит информацию о конкретной (проходящей в определенный период времени) практике, а также об индивидуальных заданиях и компетенциях, которые осваиваются при прохождении данной практики.',
		target: () => document.querySelectorAll('.ant-menu-item')[2],
		placement: 'right',
	  },
	  {
		title: 'Формирование документов',
		description: 'Вкладка представляет собой таблицы для создания, редактирования, печати документов и отправления их на согласование',
		cover: (
		  <img
		    style={{ width: '200px',height: '150px' }}
			alt="tour.png"
			src="https://i.ibb.co/qNH92GJ/7adcff7c-43a9-4fb1-b426-795d735abaac.png"
		  />
		),
		target: () => ref2.current,
		placement: 'right',
	  },
	  {
		title: 'График практик',
		description: 'График практик – документ, который содержит основную информацию о практиках для всего подразделения в общем виде (без ФИО студентов и преподавателей). Документ представляет собой расписание практик для всего подразделения на учебный год.',
		target: () => document.querySelectorAll('.ant-menu-item')[3],
		placement: 'right',
	  },
	  {
		title: 'Представление в приказ',
		description: 'Представление в Приказ - документ, который содержит информацию о конкретных студентах, которые направляются на N практику в M период. Необходимо, чтобы отдельно была заполнена информация об организациях и о студентах, которые проходят в них практику в M период. ',
		target: () => document.querySelectorAll('.ant-menu-item')[4],
		placement: 'right',
	  },
	  {
		title: 'Приказ по практике',
		description: 'Приказ по практике - документ, который содержит информацию о конкретных студентах, которые направляются на  практику в определенный период. Является логическим продолжением вкладки «Представление в приказ»',
		target: () => document.querySelectorAll('.ant-menu-item')[5],
		placement: 'right',
	  },
	  {
		title: 'Приложение 4',
		description: 'Приложение 4 – документ, содержащий информацию об обучающихся, направляемых на практическую подготовку в профильную организацию',
		target: () => document.querySelectorAll('.ant-menu-item')[6],
		placement: 'right',
	  }, 
	  {
		title: 'Итоговая проверка',
		description: 'Итоговая проверка – документ, содержащий информацию об обучающихся, которые прошли практику и ожидают проверки',
		target: () => ref3.current,
		placement: 'right',
	  },
	//   {
	// 	title: '7',
	// 	description: 'текст',
	// 	target: () => document.querySelectorAll('.ant-menu-item')[5],
	// 	placement: 'right',
	//   },
	//   {
	// 	title: '8',
	// 	description: 'текст',
	// 	target: () => document.querySelectorAll('.ant-menu-item')[6],
	// 	placement: 'right',
	//   },
	];

	const onClick: MenuProps['onClick'] = e => {
		if(e.key==='sub3'){
			return
		}
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
				defaultOpenKeys={rootSubmenuKeys}
				selectedKeys={[current]}
				defaultActiveFirst
				mode="inline"
				onClick={onClick}
				onOpenChange={onOpenChange}
				className="min-w-[230px] max-w-[230px] flex flex-col gap-7 mt-28"
				// @ts-ignore
				items={items.map((item, index) => ({
					key: item.key,
					icon: item.icon,
					children: item.children,
					label: (
					  <div  ref={refArray[index]}>
						{item?.label}
					  </div>
					)
				  }))}
			/>
			{isMobile && orientation === 'portrait' ? <div className='flex justify-center items-center text-center p-4'>Для данного устройства модуль работает только в горизонтальном положении, поверните устройство</div> : 
			<div className="bg-[#F5F8FB] overflow-hidden min-h-[840px] w-full pt-14 px-14  xl:mt-20 mt-20 ">
				{current === 'registerContracts' && <Roster />}
				{current === 'individualTasks' && <Tasks />}
				{current === 'practical.ts' && <Practical />}
				{current === 'formingSchedule' && <Schedule/>}
				{current === 'representation' && <Representation/>}
				{current === 'practiceOrder' && <PracticeOrder/>}
				{current === 'appendix' && <Appendix/>}
				{current === 'finally' && <Finally/>}
				
				<Tour  open={open} onClose={() => setOpen(false)} steps={steps} />
			</div>
			}
			
		</>
	)
}
