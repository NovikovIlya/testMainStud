import _ from 'lodash'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { block } from './constatant'
import './styles.css'

interface IDropDragProps {
	edit: boolean
}

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const DropDrag: FunctionComponent<IDropDragProps> = ({ edit }) => {
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(block)
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [mounted, setMounted] = useState(false)
	const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
		lg: []
	})

	useEffect(() => {
		setMounted(true)
	}, [])

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

	const generateDOM = () => {
		return _.map(layouts.lg, function (l, i) {
			return (
				<div key={i} className="flex items-center justify-center">
					{l.static ? (
						<span
							className="text"
							title="This item is static and cannot be removed or resized."
						>
							Static - {i}
						</span>
					) : (
						<span className="text w-full">{i}</span>
					)}
				</div>
			)
		})
	}

	return (
		<div className=" mb-4">
			<ResponsiveReactGridLayout
				className="layout mx-auto "
				rowHeight={200}
				cols={{ lg: 6, md: 6, sm: 4, xs: 4, xxs: 2 }}
				breakpoint=""
				containerPadding={[10, 10]}
				layouts={layouts}
				measureBeforeMount={true}
				useCSSTransforms={mounted}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				isBounded={true}
				isDraggable={edit}
				isResizable={edit}
			>
				{generateDOM()}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default DropDrag
