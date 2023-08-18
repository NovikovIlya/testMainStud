import {
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography
} from '@material-tailwind/react'
import React from 'react'

export const AboutMe = () => {
	return (
		<div className="mt-14 mx-14 radio">
			<div className="text-[28px]">Обо мне</div>
			<div className=" mt-10 opacity-80 text-black text-sm font-normal">
				Пол
			</div>
			<List
				className="p-0 mt-5"
				onChange={e => {
					//@ts-ignore
					dispatch(putRole(e.target.id))
				}}
			>
				<ListItem className="p-0">
					<label
						htmlFor="GUEST"
						className="px-3 py-2 flex items-start mt-1 w-full cursor-pointer"
					>
						<ListItemPrefix className="mr-3">
							<Radio
								name="vertical-list"
								id="GUEST"
								ripple={false}
								className="hover:before:opacity-0 mt-1"
								containerProps={{
									className: 'p-0'
								}}
							/>
						</ListItemPrefix>
						<Typography color="blue-gray" className="font-medium text-sm">
							a
						</Typography>
					</label>
				</ListItem>
				<ListItem className="p-0 ">
					<label
						htmlFor="SCHOOL"
						className="px-3 py-2 flex items-start  w-full cursor-pointer"
					>
						<ListItemPrefix className="mr-3">
							<Radio
								name="vertical-list"
								id="SCHOOL"
								ripple={false}
								className="hover:before:opacity-0 mt-1"
								containerProps={{
									className: 'p-0'
								}}
							/>
						</ListItemPrefix>
						<Typography color="blue-gray" className="font-medium text-sm">
							b
						</Typography>
					</label>
				</ListItem>
			</List>
		</div>
	)
}
