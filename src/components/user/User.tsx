import React, { useState } from 'react'

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
	return (
		<Layout>
			<Heading className="ml-[180px] mt-[145px] text-2xl font-bold text-[#1F5CB8]">
				Личный кабинет КФУ
			</Heading>

			<DropDrag edit={true} layouts={layouts} setLayouts={setLayouts} />
			<Faq />
		</Layout>
	)
}
