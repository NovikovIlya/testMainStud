import React, { useState } from 'react'

import DropDrag from '../dnd/DropDrag'
import { block } from '../dnd/constant'
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
			<Heading className="ml-[200px] mt-[145px] text-[62px] font-bold">
				Личный кабинет КФУ
			</Heading>

			<DropDrag edit={false} layouts={layouts} setLayouts={setLayouts} />
		</Layout>
	)
}
