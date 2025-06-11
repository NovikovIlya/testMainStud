import { Button, Form, Input, Spin, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../store'
import { useGetSocQuery, usePostSocMutation, usePutSocMutation } from '../../../store/api/aboutMe/forAboutMe'

const { Text } = Typography
const { TextArea } = Input

const Social = () => {
	const { t } = useTranslation()
	const { data: socialData ,isLoading:isLoadingData} = useGetSocQuery()
	const [putSoc,{isLoading:isLoadingPut}] = usePutSocMutation()
	const [postSoc,{}] = usePostSocMutation()
	const [form] = Form.useForm()
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		if(socialData){
			form.setFieldsValue({
				socialWork: socialData?.socialWork || '',
				creativeEvents: socialData?.creativeEvents || '',
				sportEvents: socialData?.sportEvents || '',
				sectionsAndClubs: socialData?.sectionsAndClubs || '',
			})
		}
	}, [form, socialData])

	const onFinish = (values:any) => {
		putSoc(values)
	}

	return (
		<div className="px-[50px] pt-[60px] mb-[50px] animate-fade-in">
			<Spin spinning={isLoadingPut || isLoadingData}>
				<Title className="!text-[28px]">{t('socialTitle')}</Title>
				<Form form={form} onFinish={onFinish} className="w-full pt-10" layout="vertical">
					<Form.Item name="socialWork" label={<Text strong>{t('socialWork')}</Text>} className="mb-4">
						<TextArea 
						 placeholder={t('placeholdSoc')}
						 rows={isExpanded ? 6 : 3} />
					</Form.Item>
					<Form.Item name="creativeEvents" label={<Text strong>{t('creativeEvents')}</Text>} className="mb-4">
						<TextArea 
						 placeholder={t('placeholdCreative')}
						 rows={isExpanded ? 6 : 3} />
					</Form.Item>
					<Form.Item name="sportEvents" label={<Text strong>{t('sportEvents')}</Text>} className="mb-4">
						<TextArea
						 placeholder={t('placesportEvents')}
						 
						 rows={isExpanded ? 6 : 3} />
					</Form.Item>
					<Form.Item name="sectionsAndClubs" label={<Text strong>{t('sectionsAndClubs')}</Text>} className="mb-4">
						<TextArea 
						 placeholder={t('placesectionsAndClubs')}
						rows={isExpanded ? 6 : 3} />
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
