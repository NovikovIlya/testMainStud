import { DeleteOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {
	CarouselDataOne,
	CarouselDataTwo,
	Events,
	Vacancies
} from '../../api/plugs'
import CarouselCard from '../user/guest/Components/CarouselCard'
import DescriptionCard from '../user/guest/Components/DescriptionCard'
import NavigationBlock from '../user/guest/Components/Navigation'
import OfferOneCard from '../user/guest/Components/OfferCardOne'
import OfferTwoCard from '../user/guest/Components/OfferCardTwo'

import './DropDrag.scss'

interface IDropDragProps {
	edit: boolean
	layouts: { [index: string]: any[] }
	setLayouts: (value: { [index: string]: any[] }) => void
}

interface jsx {
	index: string
	element: any
}

export const jsxElements: jsx[] = [
	{
		index: '0',
		element: (
			<DescriptionCard
				generalTittle="Об университете"
				someTittle="Мини-текст в 3-4 строки о том какой КФУ крутой, статистика инфографика внутри — хвалебные маркетинговые оды университету"
				ShowButton={true}
				ShowCircle={true}
			/>
		)
	},
	{
		index: '1',
		element: (
			<CarouselCard
				info={CarouselDataOne}
				generalTittle="Олимпиады студентам"
				ThereIsDescription={false}
			/>
		)
	},
	{
		index: '2',
		element: (
			<CarouselCard
				info={CarouselDataTwo}
				generalTittle="Олимпиады студентам"
				someTittle="Облачные технологии в образовании"
				ThereIsDescription={true}
			/>
		)
	},
	{
		index: '3',
		element: (
			<DescriptionCard
				generalTittle="Общие результаты вступительных экзаменов"
				someTittle="В этом году всего поступило 450690 студентов."
				ShowButton={true}
				ShowCircle={true}
			/>
		)
	},
	{
		index: '4',
		element: (
			<DescriptionCard
				generalTittle="Новости"
				someTittle="Каждый из нас понимает очевидную вещь: убеждённость некоторых оппонентов влечет за собой процесс."
				ShowButton={false}
				ShowCircle={true}
			/>
		)
	},
	{
		index: '5',
		element: <OfferOneCard info={Vacancies} tittle="Вакансии" />
	},
	{
		index: '6',
		element: <OfferTwoCard info={Events} tittle="Мероприятия" />
	}
]

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const DropDrag: FunctionComponent<IDropDragProps> = ({
	edit,
	layouts,
	setLayouts
}) => {
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [mounted, setMounted] = useState(false)
	const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
		lg: []
	})

	useEffect(() => {
		setMounted(true)
	}, [])
	useEffect(() => {
		localStorage.setItem('dashboard', JSON.stringify(layouts))
	}, [layouts])

	const onBreakpointChange = (breakpoint: any) => {
		setCurrentBreakpoint(breakpoint)
		setToolbox({
			...toolbox,
			[breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
		})
	}

	const onLayoutChange = (layout: any, layouts: any) => {
		setLayouts({ ...layouts })
	}

	const onRemoveItem = (i: number) => {
		console.log('removing', i)
		setLayouts({
			...layouts,
			lg: [...layouts.lg].filter(item => item.i !== i)
		})
	}

	const generateDOM = layouts.lg.map(item => {
		return (
			<div
				key={item.i}
				className="bg-white/50 backdrop-blur-sm rounded-[2vh] shadow-md border-[1px] border-solid border-black"
			>
				<div className="text  w-full h-full  ">
					{edit && (
						<div
							className="absolute top-2 cursor-pointer right-2"
							onClick={() => onRemoveItem(item.i)}
						>
							<DeleteOutlined className="text-[1.5vh] max-[2000px]:text-[2vh] mt-[1vh] mr-[1vh]" />
						</div>
					)}
					{jsxElements.filter(el => el.index === item.i)[0].element}
				</div>
			</div>
		)
	})

	return (
		<div className="ml-[8vh] mt-[12vh] mr-[1vh] max-sm:ml-[7vh] font-sans">
			<span className="flex w-full h-auto font-bold text-5xl ml-2 mb-10">
				Личный кабинет КФУ
			</span>
			<NavigationBlock />
			<ResponsiveReactGridLayout
				className="layout "
				cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
				containerPadding={[10, 10]}
				layouts={layouts}
				measureBeforeMount={true}
				useCSSTransforms={mounted}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				isDraggable={edit}
				isResizable={edit}
			>
				{generateDOM}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default DropDrag
