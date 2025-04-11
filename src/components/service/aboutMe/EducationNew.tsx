import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { t } from 'i18next'
import { useState } from 'react'

import { AddEducationModal } from './AddEducationModal'
import { EducationsTable } from './EducationsTable'
import { OldEducationsTable } from './OldEducationsTable'

const EducationNew = () => {
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<h1 className="font-bold text-[28px]/[28px]">{t('education')}</h1>
			<h2 className="pt-[52px] font-bold text-[14px]/[100%]">{t('finishedEducationalInstitutions')}</h2>
			<EducationsTable />
			<AddEducationModal
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
				{t('addEducation')}
			</Button>
			<h2 className="pt-[41.72px] font-bold text-[14px]/[100%]">{t('previousEducation')}</h2>
			<OldEducationsTable />
		</div>
	)
}

export default EducationNew
