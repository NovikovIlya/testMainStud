import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetScheduleQuery } from '../../store/api/scheduleApi'
import DropDrag from '../dnd/DropDrag'
import { block } from '../dnd/constant'
import { Faq } from '../faq/Faq'
import { Layout } from '../layout/Layout'

export const User = () => {
	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(() => {
		return localStorage.getItem('dashboard')
			? JSON.parse(localStorage.getItem('dashboard') || '')
			: block
	})
	const { data } = useGetScheduleQuery()
	console.log(data)
	const { t } = useTranslation()
	return (
		<Layout>
			<div className="px-10 flex items-center justify-center">
				<div className="max-w-[1600px] w-[1600px]">
					<div className={clsx(`mt-[125px] text-2xl font-bold text-[#1F5CB8]`)}>
						{t('PersonalAccount')} <br />
					</div>
					<DropDrag edit={false} layouts={layouts} setLayouts={setLayouts} />
					<Faq />
				</div>
			</div>
		</Layout>
	)
}
