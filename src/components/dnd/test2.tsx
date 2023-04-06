import _ from 'lodash'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './styles.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const DropDrag: FunctionComponent = () => {
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>({
		lg: _.map(_.range(0, 5), function (item, i) {
			var y = Math.ceil(Math.random() * 4) + 1
			return {
				x: (_.random(0, 5) * 2) % 12,
				y: Math.floor(i / 12) * y,
				w: 2,
				h: y,
				i: i.toString()
			}
		})
	})
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
		console.log(layouts)

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
		<div className=" mb-4 max-w-screen-xl mx-auto">
			<ResponsiveReactGridLayout
				className="layout"
				rowHeight={100}
				cols={{ lg: 6, md: 6, sm: 4, xs: 4, xxs: 2 }}
				breakpoint=""
				containerPadding={[0, 0]}
				layouts={layouts}
				measureBeforeMount={true}
				useCSSTransforms={mounted}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				isDroppable={false}
				isResizable={false}
			>
				{generateDOM()}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default DropDrag
