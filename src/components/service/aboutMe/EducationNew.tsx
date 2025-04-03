import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Row, Tooltip } from 'antd'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React, { useEffect } from 'react'

import { EducationsTable } from './EducationsTable'
import UploadAvatar from './UploadAvatar'

const EducationNew = () => {
	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue({ content: 'sss' }) // Установка значения в форму
		// setLoading(false);
	}, [form])

	const onFinish = (values: any) => {
		// values содержит { checkboxes: [...] }
		console.log('Отправка:', values)
	}

	const handleSubmit = (values: { content: string }) => {}

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<h1 className="font-bold text-[28px]/[28px]">{t('education')}</h1>
			<h2 className="pt-[52px] font-bold text-[14px]/[100%]">{t('finishedEducationalInstitutions')}</h2>
			<EducationsTable />
		</div>
	)
}

export default EducationNew
