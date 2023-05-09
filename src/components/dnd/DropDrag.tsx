import { DeleteOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { data } from '../../api/types'
import CaruselCard from '../user/guest/Components/CaruselCard'
import DescriptionCard from '../user/guest/Components/DescriptionCard'
import FirstBlock from '../user/guest/Components/Navigation'
import OfferOneCard from '../user/guest/Components/OfferCardOne'
import OfferTwoCard from '../user/guest/Components/OfferCardTwo'

import './DropDrag.scss'

interface IDropDragProps {
	edit: boolean
	layouts: { [index: string]: any[] }
	setLayouts: (value: { [index: string]: any[] }) => void
}

const CarucelDataOne: data[] = [
	{ tittle1: 'Математика', tittle2: '01.05.2023' },
	{ tittle1: 'История', tittle2: '02.06.2023' },
	{ tittle1: 'Физика', tittle2: '03.07.2023' },
	{ tittle1: 'География', tittle2: '04.08.2023' }
]

const CarucelDataTwo: data[] = [
	{ tittle1: '30ч.', tittle2: '19 000 руб' },
	{ tittle1: '24ч.', tittle2: '15 000 руб' },
	{ tittle1: '16ч.', tittle2: '5 000 руб' },
	{ tittle1: '18ч.', tittle2: '10 000 руб' }
]

const Vacansies: data[] = [
	{ tittle1: 'Инженер-программист', tittle2: 'от 25 000 р.' },
	{ tittle1: 'Медицинская сестра', tittle2: 'от 15 000 р.' },
	{ tittle1: 'Разнорабочий', tittle2: 'от 15 000 р.' },
	{ tittle1: 'Документовед 2 категории', tittle2: 'от 18 000 р.' }
]

const Events: data[] = [
	{ tittle1: 'День открытых дверей ИВМиТ', tittle2: '24.09.2023' },
	{ tittle1: 'День открытых дверей ИТИС', tittle2: '24.09.2023' },
	{ tittle1: 'День открытых дверей ИЭиП', tittle2: '24.09.2023' },
	{ tittle1: 'День открытых дверей ИГиНТ', tittle2: '24.09.2023' }
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
		if (item.i === '0') {
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
						{/* <AboutUniversity /> */}
						<DescriptionCard
							generalTittle="Об университете"
							someTittle="Мини-текст в 3-4 строки о том какой КФУ крутой, статистика,
              инфографика внутри — хвалебные маркетинговые оды университету"
							ShowButton={true}
							ShowCircle={true}
						/>
					</div>
				</div>
			)
		}
		if (item.i === '1') {
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
								<DeleteOutlined className="text-[1.5vh] max-[2000px]:text-[2vh] mt-[1vh] mr-[1vh] z-10" />
							</div>
						)}
						<CaruselCard
							info={CarucelDataOne}
							generalTittle={'Олимпиады студентам'}
							ThereIsDescription={false}
						/>
					</div>
				</div>
			)
		}
		if (item.i === '2') {
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
								<DeleteOutlined className="text-[1.5vh] max-[2000px]:text-[2vh] mt-[1vh] mr-[1vh] z-10" />
							</div>
						)}
						<CaruselCard
							info={CarucelDataTwo}
							generalTittle={'Олимпиады студентам'}
							someTittle={'Облачные технологии в образовании'}
							ThereIsDescription={true}
						/>
					</div>
				</div>
			)
		}
		if (item.i === '3') {
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
								<DeleteOutlined className="text-[1.5vh] max-[2000px]:text-[2vh] mt-[1vh] mr-[1vh] z-10" />
							</div>
						)}
						<DescriptionCard
							generalTittle="Общие результаты вступительных экзаменов"
							someTittle="В этом году всего поступило 450690 студентов."
							ShowButton={true}
							ShowCircle={true}
						/>
					</div>
				</div>
			)
		}
		if (item.i === '4') {
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
								<DeleteOutlined className="text-[1.5vh] max-[2000px]:text-[2vh] mt-[1vh] mr-[1vh] z-10" />
							</div>
						)}
						<DescriptionCard
							generalTittle="Новости"
							someTittle="Каждый из нас понимает очевидную вещь: убеждённость некоторых оппонентов влечет за собой процесс."
							ShowButton={false}
							ShowCircle={true}
						/>
					</div>
				</div>
			)
		}
		if (item.i === '5') {
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
								<DeleteOutlined className="text-[1.5vh] max-[2000px]:text-[2vh] mt-[1vh] mr-[1vh] z-10" />
							</div>
						)}
						<OfferOneCard info={Vacansies} tittle="Вакансии" />
					</div>
				</div>
			)
		}
		if (item.i === '6') {
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
								<DeleteOutlined className="text-[1.5vh] max-[2000px]:text-[2vh] mt-[1vh] mr-[1vh] z-10" />
							</div>
						)}
						<OfferTwoCard info={Events} tittle="Мероприятия" />
					</div>
				</div>
			)
		}
	})

	return (
		<div className="ml-[8vh] mt-[12vh] mr-[1vh] max-sm:ml-[7vh] font-sans">
			<span className="flex w-full h-auto font-bold text-5xl ml-2 mb-10">
				Личный кабинет КФУ
			</span>
			<FirstBlock />
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
