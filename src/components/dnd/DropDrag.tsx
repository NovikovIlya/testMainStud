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
				<div className="w-full h-full">
					{edit && (
						<div
							className="absolute top-2 cursor-pointer right-2"
							onClick={() => onRemoveItem(item.i)}
						>
							<DeleteOutlined className=" mt-2 mr-2 opacity-50" />
						</div>
					)}
					{jsxElements.filter(el => el.index === item.i)[0].element}
				</div>
			</div>
		)
	})

	return (
		<div className="ml-[180px] mt-[40px] pr-[80px] mb-[100px] max-sm:ml-3  max-xl:pr-3 max-xl:ml-[100px]">
			<ResponsiveReactGridLayout
				className="layout "
				cols={{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }}
				rowHeight={150}
				containerPadding={[0, 0]}
				margin={[40, 40]}
				layouts={layouts}
				measureBeforeMount={true}
				useCSSTransforms={mounted}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				isDraggable={edit}
				isResizable={false}
			>
				{generateDOM}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default DropDrag
