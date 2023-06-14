import {
	ListItemPrefix,
	Radio,
	Typography
} from '@material-tailwind/react'

export const Switcher = () => {
	return (
		<div className="flex self-start mb-4">
			<label htmlFor="0" className="flex items-start  w-full cursor-pointer">
				<ListItemPrefix className="mr-3">
					<Radio
						name="vertical-list"
						id="0"
						ripple={false}
						className="hover:before:opacity-0 mt-1"
						containerProps={{
							className: 'p-0'
						}}
					/>
				</ListItemPrefix>
				<Typography color="blue-gray" className="font-medium text-sm">
					Женщина
				</Typography>
			</label>
			<label
				htmlFor="1"
				className="pl-3 flex items-start  w-full cursor-pointer"
			>
				<ListItemPrefix className="mr-3">
					<Radio
						name="vertical-list"
						id="1"
						ripple={false}
						className="hover:before:opacity-0 mt-1"
						containerProps={{
							className: 'p-0'
						}}
					/>
				</ListItemPrefix>
				<Typography color="blue-gray" className="font-medium text-sm">
					Мужчина
				</Typography>
			</label>
		</div>
	)
}
