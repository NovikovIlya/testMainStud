import { ElectronicBook } from '../cards/ElectronicBook'
import { Session } from '../cards/Session'

export const jsxElements = [
	{
		index: 'ElectronicBook',
		element: <ElectronicBook />,
		place: {
			w: 1,
			h: 1,
			maxH: 4,
			maxW: 4,
			x: 0,
			y: 0,
			i: 'ElectronicBook',
			moved: true,
			static: false
		}
	},
	{
		index: 'Session',
		element: <Session />,
		place: {
			w: 1,
			h: 1,
			maxH: 4,
			maxW: 4,
			x: 1,
			y: 0,
			i: 'Session',
			moved: true,
			static: false
		}
	}
]
