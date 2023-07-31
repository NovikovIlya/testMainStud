import React, { ReactNode } from 'react'

type TypeNavProps = {
	className?: string
	children?: ReactNode
}
const navList = ['Мое расписание', 'Расписание служб']
export const NavLayout = ({ className, children }: TypeNavProps) => {
	const handleList = navList.map((item, index) => (
		<li className="w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer">
			{item}
		</li>
	))
	return <ul className={className}>{handleList}</ul>
}
