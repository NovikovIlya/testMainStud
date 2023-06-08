import React, { useState } from 'react'

import DropDrag from '../dnd/DropDrag'
import { block } from '../dnd/constant'
import { Faq } from '../faq/Faq'
import { InfoUserModal } from '../infomationUser/InfoUserModal'
import { Layout } from '../layout/Layout'
import { Heading } from '../ui/Heading'

export const User = () => {
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(() => {
		return localStorage.getItem('dashboard')
			? JSON.parse(localStorage.getItem('dashboard') || '')
			: block
	})
	const [isShow, setIsShow] = useState(true)
	return (
		<Layout>
			<Heading className="ml-[180px] mt-[125px] max-sm:ml-3 text-2xl font-bold text-[#1F5CB8]">
				Личный кабинет КФУ
			</Heading>
			<InfoUserModal close={setIsShow} isOpen={isShow} />
			<DropDrag edit={true} layouts={layouts} setLayouts={setLayouts} />
			<Faq />
		</Layout>
	)
}
