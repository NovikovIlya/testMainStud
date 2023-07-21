import clsx from 'clsx'
import { useState } from 'react'

import { useAppSelector } from '../../store'
import DropDrag from '../dnd/DropDrag'
import { block } from '../dnd/constant'
import { Faq } from '../faq/Faq'
import { Layout } from '../layout/Layout'
import { Heading } from '../ui/Heading'

export const User = () => {
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(() => {
		return localStorage.getItem('dashboard')
			? JSON.parse(localStorage.getItem('dashboard') || '')
			: block
	})
	const user = useAppSelector(state => state.InfoUser.role)
	return (
		<Layout>
			<Heading
				className={clsx(
					`ml-[180px] mt-[125px] max-sm:ml-3 text-2xl font-bold text-[#1F5CB8]`,
					user === 'guest' && 'bg-black',
					user === 'enrollee' && 'bg-red-500',
					user === 'student' && 'bg-yellow-500',
					user === 'schoolboy' && 'bg-green-500',
					user === 'listener' && 'bg-blue-500',
					user === 'applicant' && 'bg-purple-500'
				)}
			>
				Личный кабинет КФУ <br />
				{user}
			</Heading>
			<DropDrag edit={true} layouts={layouts} setLayouts={setLayouts} />
			<Faq />
		</Layout>
	)
}
