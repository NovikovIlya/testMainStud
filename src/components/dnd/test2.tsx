import _ from 'lodash'
import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './styles.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const DropDrag: FunctionComponent = props => {
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>({
		lg: _.map(_.range(0, 25), function (item, i) {
			var y = Math.ceil(Math.random() * 4) + 1
			return {
				x: (_.random(0, 5) * 2) % 12,
				y: Math.floor(i / 6) * y,
				w: 2,
				h: y,
				i: i.toString(),
				static: Math.random() < 0.05
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
				<div key={i} className="bg-gray-300 flex items-center justify-center">
					{l.static ? (
						<span
							className="text"
							title="This item is static and cannot be removed or resized."
						>
							Static - {i}
						</span>
					) : (
						<span className="text">{i}</span>
					)}
				</div>
			)
		})
	}

	return (
		<div className="mb-4">
			<ResponsiveReactGridLayout
				className="layout"
				rowHeight={100}
				cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
				breakpoint=""
				containerPadding={[0, 0]}
				style={{ background: '#f0f0f0' }}
				layouts={layouts}
				measureBeforeMount={false}
				useCSSTransforms={mounted}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				isDroppable
			>
				{generateDOM()}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default DropDrag
