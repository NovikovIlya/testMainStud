import type { MenuProps } from 'antd'
import { Menu, Tour } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PracticesSvg } from '../../../assets/svg/PracticesSvg'
import { useAppSelector } from '../../../store'
import useWindowOrientation from '../../../utils/hooks/useDeviceOrientation'
import { isMobileDevice } from '../../../utils/hooks/useIsMobile'
import { Header } from '../../layout/Header'

import { RouteMyPractice } from './myPracice/routeMyPractice'

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']
export const NavMyPractices = () => {
	const [openKeys, setOpenKeys] = useState(['sub1'])
	const [current, setCurrent] = useState('myPractice')
	const navigate = useNavigate()
	const { t } = useTranslation()
	const ref1 = useRef(null)
	const ref2 = useRef(null)
	const ref3 = useRef(null)
	const refArray = [ref1, ref2, ref3]
	const [open, setOpen] = useState<boolean>(false)
	const orientation = useWindowOrientation()
	const isMobile = false
	const isCollapsed = useAppSelector(state => state.auth.isCollapsed)

	const items: any = [
		{
			key: 'sub1',
			label: t('practices'),
			icon: <PracticesSvg />,
			children: [{ key: 'myPractice', label: t('myPractices') }]
		}
	]

	const steps: any = [
		{
			title: '',
			description:
				'Модуль «Практики студентов» предназначен для автоматизации процесса направления студентов на практические подготовки, а также для контроля прохождения практики студентов, т.е. для формирования и отправки на согласование отчетных документов.',
			cover: (
				<img
					style={{ width: '300px', height: '200px' }}
					alt="tour.png"
					src="https://govoritnotariat.com/upload/iblock/a4f/a4f8276b6d077d137da443ba27faa3dc.jpg"
				/>
			)
		},
		{
			title: 'Справочники',
			description:
				'Справочники представляют собой «банк информации», которая в дальнейшем используется для формирования документов. Реестр договоров – «банк договоров» КФУ с организациями, в которых студенты КФУ могут проходить практику. Информация об организациях в дальнейшем используется при формировании Представления в Приказ (ПвП), Приказа по практике (ПП) и Приложения 4 (П4).',
			cover: (
				<img
					style={{ width: '100px', height: '100px' }}
					alt="tour.png"
					src="https://flexys.net/images/article/dictionaries/cabinet_256.png"
				/>
			),
			target: () => ref1.current,
			placement: 'right'
		},

		{
			title: 'Реестр договоров',
			description:
				'Принципы работы в «Реестре договоров»: для заполнения обязательны все поля, особенно прикрепление документов (файл договора и и доп. Соглашения) – поскольку если студент пройдет практику в организации, с которой еще не успели заключить или продлить договор, то практика не будет засчитываться. Для недопущения подобных ситуаций данные поля были сделаны обязательными.',
			target: () => document.querySelectorAll('.ant-menu-item')[0],
			placement: 'right'
		},
		{
			title: '«Индивидуальные задания»',
			description:
				'В справочнике «Индивидуальные задания» хранится перечень индивидуальных заданий для конкретной специальности и типа практики. Инд. Задания будут нужны для формирования документов в ЛК студента',
			target: () => document.querySelectorAll('.ant-menu-item')[1],
			placement: 'right'
		},
		{
			title: 'Практики',
			description:
				'Справочник практики содержит информацию о конкретной (проходящей в определенный период времени) практике, а также об индивидуальных заданиях и компетенциях, которые осваиваются при прохождении данной практики.',
			target: () => document.querySelectorAll('.ant-menu-item')[2],
			placement: 'right'
		},
		{
			title: 'Формирование документов',
			description:
				'Вкладка представляет собой таблицы для создания, редактирования, печати документов и отправления их на согласование',
			cover: (
				<img
					style={{ width: '100px', height: '100px' }}
					alt="tour.png"
					src="https://flexys.net/images/article/basic/printer_64.png"
				/>
			),
			target: () => ref2.current,
			placement: 'right'
		},
		{
			title: 'График практик',
			description:
				'График практик – документ, который содержит основную информацию о практиках для всего подразделения в общем виде (без ФИО студентов и преподавателей). Документ представляет собой расписание практик для всего подразделения на учебный год.',
			target: () => document.querySelectorAll('.ant-menu-item')[3],
			placement: 'right'
		},
		{
			title: 'Представление в приказ',
			description:
				'Представление в Приказ - документ, который содержит информацию о конкретных студентах, которые направляются на N практику в M период. Необходимо, чтобы отдельно была заполнена информация об организациях и о студентах, которые проходят в них практику в M период. ',
			target: () => document.querySelectorAll('.ant-menu-item')[4],
			placement: 'right'
		}
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
	]

	const onClick: MenuProps['onClick'] = e => {
		if (e.key === 'sub3') {
			return
		}
		navigate('/services/mypractices/' + e.key)
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
			<Header type={'service'} service={t('Practices')} />
			<div className="h-screen">
				<Menu
					inlineCollapsed={isCollapsed}
					defaultOpenKeys={['sub1', 'sub2']}
					selectedKeys={[current]}
					mode="inline"
					style={{ width: isCollapsed ? 80 : 256 }}
					onClick={onClick}
					onOpenChange={onOpenChange}
					className="mt-32 "
					// @ts-ignore
					items={items.map((item, index) => ({
						key: item.key,
						icon: item.icon,
						children: item.children,
						label: <div ref={refArray[index]}>{item?.label}</div>
					}))}
				/>
			</div>
			{isMobile && orientation === 'portrait' ? (
				<div className="flex justify-center items-center text-center p-4">
					Для данного устройства модуль работает только в горизонтальном положении, поверните устройство
				</div>
			) : (
				<div className="bg-[#F5F8FB] min-h-[900px] w-full pt-14 px-14  xl:mt-20 mt-20 ">
					{current === 'myPractice' && <RouteMyPractice />}

					<Tour open={open} onClose={() => setOpen(false)} steps={steps} />
				</div>
			)}
		</>
	)
}
