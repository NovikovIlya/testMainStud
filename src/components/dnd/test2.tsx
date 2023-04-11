import _ from 'lodash'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './styles.css'

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

	const generateDOM = _.map(layouts.lg, function (l, i) {
		return (
			<div key={i}>
				<div className="text w-full h-full flex items-center justify-center">
					{i}
				</div>
			</div>
		)
	})

	return (
		<div className=" mb-4">
			<ResponsiveReactGridLayout
				className="layout "
				rowHeight={200}
				cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
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
