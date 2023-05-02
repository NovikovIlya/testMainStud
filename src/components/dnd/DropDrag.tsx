import { DeleteOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { AboutUniversity } from '../user/bek/aboutUniversity/AboutUniversity'

import './DropDrag.scss'

interface IDropDragProps {
	edit: boolean
	layouts: { [index: string]: any[] }
	setLayouts: (value: { [index: string]: any[] }) => void
}

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
		if (item.i === '1') {
			return (
				<div
					key={item.i}
					className="bg-white font-sans rounded-[2vh] shadow-md"
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
						<AboutUniversity />
					</div>
				</div>
			)
		}
		return (
			<div key={item.i}>
				<div className="text rounded-[2vh] text-white w-full h-full flex items-center justify-center ">
					{edit && (
						<div
							className="absolute top-2 cursor-pointer right-2"
							onClick={() => onRemoveItem(item.i)}
						>
							<DeleteOutlined style={{ color: 'white', fontSize: 18 }} />
						</div>
					)}
					{item.i}
				</div>
			</div>
		)
	})

	return (
		<div className="ml-[12vh] mt-[12vh] mr-[1vh] max-sm:ml-[7vh]">
			<ResponsiveReactGridLayout
				className="layout "
				rowHeight={320}
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
