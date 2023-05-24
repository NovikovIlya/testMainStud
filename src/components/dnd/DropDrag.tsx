import { DeleteOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './DropDrag.scss'
import { jsxElements } from './defaultElement'

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
		setLayouts({
			...layouts,
			lg: [...layouts.lg].filter(item => item.i !== i)
		})
	}

	const generateDOM = layouts.lg.map(item => {
		return (
			<div
				key={item.i}
				className="bg-white/70 backdrop-blur-sm rounded-[20px] shadow-md "
			>
				<div className="text w-full">
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
		<div className="ml-[180px] mt-[40px] mr-[80px] mb-[100px]">
			<ResponsiveReactGridLayout
				className="layout "
				cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
				containerPadding={[0, 0]}
				margin={[40, 40]}
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
