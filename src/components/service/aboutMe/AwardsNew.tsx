import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { t } from 'i18next'
import { useState } from 'react'

import { AddAwardModal } from './AddAwardModal'
import { AddEducationModal } from './AddEducationModal'
import { AwardsTable } from './AwardsTable'

export const AwardsNew = () => {
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<h1 className="font-bold text-[28px]/[28px]">{t('awards')}</h1>
			<AwardsTable />
			<AddAwardModal
				type="ADD"
				form={form}
				open={isModalOpen}
				onCancel={() => {
					setIsModalOpen(false)
				}}
			/>
			<Button
				type="text"
				className="!pl-0 mt-[32px]"
				onClick={() => {
					setIsModalOpen(true)
				}}
			>
				<PlusCircleFilled className="!text-[28px]/[28px]" style={{ height: 28, width: 28, color: '#3073D7' }} />
				{t('addAward')}
			</Button>
		</div>
	)
}
