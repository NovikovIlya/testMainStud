import { DeleteOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useDispatch } from 'react-redux'
import 'react-resizable/css/styles.css'

import { useAppSelector } from '../../store'
import { changeLayout, removeCard } from '../../store/reducers/LayoutsSlice'

import './DropDrag.scss'
import { jsxElements } from './defaultElement'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const DropDrag = () => {
	const dispatch = useDispatch()
	const layout = useAppSelector(state => state.Layout)
	const edit = useAppSelector(state => state.auth.edit)
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [mounted, setMounted] = useState(false)
	const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
		lg: []
	})

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		localStorage.setItem('dashboard', JSON.stringify(layout))
	}, [layout])

	const onBreakpointChange = (breakpoint: any) => {
		setCurrentBreakpoint(breakpoint)
		setToolbox({
			...toolbox,
			[breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
		})
	}

	const onLayoutChange = (layout: any, layouts: any) => {
		dispatch(changeLayout(layouts))
	}

	const onRemoveItem = (i: string) => {
		dispatch(removeCard(i))
	}

	const generateDOM = layout.lg.map(item => {
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
		<div className=" mt-[40px] w-[min(1600px, 100%)] mb-[100px]">
			<ResponsiveReactGridLayout
				className="layout "
				cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
				rowHeight={320}
				containerPadding={[0, 0]}
				margin={[20, 20]}
				layouts={layout}
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
