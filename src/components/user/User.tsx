import React, { useState } from 'react'

import DropDrag from '../dnd/DropDrag'
import { block } from '../dnd/constatant'
import { Layout } from '../layout/Layout'

import Guest from './guest/Guest'

export const User = () => {
	const [edit, setEdit] = useState(true)
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(() => {
		return localStorage.getItem('dashboard')
			? JSON.parse(localStorage.getItem('dashboard') || '')
			: block
	})
	return (
		<Layout>
			<Guest />
			{/* <DropDrag edit={edit} layouts={layouts} setLayouts={setLayouts} /> */}
		</Layout>
	)
}
