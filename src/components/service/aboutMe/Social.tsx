import { Button, Form, Input, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../store'
import Title from 'antd/es/typography/Title'

const { Text } = Typography
const { TextArea } = Input
const Social = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm()
	const [isExpanded, setIsExpanded] = useState(false)

	// useEffect(() => {
	// 	form.setFieldsValue({
	// 		socialWork: socialData?.socialWork || '',
	// 		creativeCollectives: socialData?.creativeCollectives || '',
	// 		sportsCompetitions: socialData?.sportsCompetitions || '',
	// 		sectionsAndClubs: socialData?.sectionsAndClubs || '',
	// 	})
	// }, [form, socialData])

	const handleSubmit = () => {

	}

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<Spin spinning={false}>
			<Title className='!text-[28px]'>{t('socialTitle')}</Title>
			<Form form={form} onFinish={handleSubmit} className="w-full pt-10" layout="vertical">
				<Form.Item name="socialWork" label={<Text strong>{t('socialWork')}</Text>} className="mb-4">
					<TextArea rows={isExpanded ? 6 : 3} />
				</Form.Item>
				<Form.Item name="creativeCollectives" label={<Text strong>{t('creativeCollectives')}</Text>} className="mb-4">
					<TextArea rows={isExpanded ? 6 : 3} />
				</Form.Item>
				<Form.Item name="sportsCompetitions" label={<Text strong>{t('sportsCompetitions')}</Text>} className="mb-4">
					<TextArea rows={isExpanded ? 6 : 3} />
				</Form.Item>
				<Form.Item name="sectionsAndClubs" label={<Text strong>{t('sectionsAndClubs')}</Text>} className="mb-4">
					<TextArea rows={isExpanded ? 6 : 3} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						{t('saveButton')}
					</Button>
				</Form.Item>
			</Form>
			</Spin>
		</div>
	)
}
export default Social
