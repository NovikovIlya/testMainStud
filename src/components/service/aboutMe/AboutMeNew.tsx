import { EditOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Row, Tooltip } from 'antd'
import { Descriptions } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import QuillComponents from './QuillComponents'
import UploadAvatar from './UploadAvatar'
import { useGetAboutMeQuery } from '../../../store/api/aboutMe/forAboutMe'
import { SkeletonPage } from './Skeleton'

const AboutMeNew = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm()
	const [content, setContent] = useState('')
	const {data:dataAboutMe,isFetching:isFetchingAboutMe} = useGetAboutMeQuery()

	useEffect(()=>{
		if(dataAboutMe?.employeeAddedDto?.COMMENT){
			setContent(dataAboutMe?.employeeAddedDto?.COMMENT)
		}
	},[dataAboutMe])

	const onFinish = (values: any) => {
		console.log('Отправка чекбоксов:', values)
	}


	if(isFetchingAboutMe) return <div className='mt-[-10px] ml-[6px]'><SkeletonPage /></div>

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className="bg-white rounded-xl shadow-md">
				<Row>
					<Col span={12}>
						<div className="flex flex-wrap justify-center p-[40px]">
							<UploadAvatar dataAboutMe={dataAboutMe} />
							<div className="w-full mt-3 text-center">{`${dataAboutMe?.LASTNAME} ${dataAboutMe?.FIRSTNAME} ${dataAboutMe?.SECONDNAME}`}</div>
						</div>
					</Col>
					<Col span={12}>
						<div className="flex flex-wrap justify-start p-[40px]">
							<Descriptions column={1} title={t('generalInfo')}>
								<Descriptions.Item label={t('birthDate')}>{dataAboutMe?.BIRTH_DATE}</Descriptions.Item>
								<Descriptions.Item label={t('gender')}>{dataAboutMe?.SEX==='m'?'Мужской': 'Женский'}</Descriptions.Item>
								<Descriptions.Item label={t('citizenshipType')}>{dataAboutMe?.CITIZENSHIP_TYPE}</Descriptions.Item>
								<Descriptions.Item label={t('citizenshipCountry')}>{dataAboutMe?.CITIZENSHIP_COUNTRY}</Descriptions.Item>
								{dataAboutMe?.BIRTH_PLACE ? <Descriptions.Item label={t('birthPlace')}>{dataAboutMe?.BIRTH_PLACE}</Descriptions.Item>: ''}
							</Descriptions>
						</div>
					</Col>
				</Row>
			</div>

			{/* Секция пользовательского соглашения */}
			<div className="bg-white rounded-xl shadow-md mt-7">
				<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{t('userAgreementText')}
								</Title>
								<Tooltip title={t('agreementTooltip')}>
									<QuestionCircleOutlined />
								</Tooltip>
							</div>
							<Divider />

							<Form className="" onFinish={onFinish}>
								<Form.Item className="mb-[20px]" name="codex" valuePropName="checked" label={null}>
									<Checkbox>
										{t('codexAgreement')}
										<a
											className="underline ml-1"
											href="https://kpfu.ru/portal/docs/F1769183796/Kodeks.etiki.obuch_sya.pdf"
											target="_blank"
											rel="noopener noreferrer"
										>
											{t('codexAgreement2')}
										</a>
									</Checkbox>
								</Form.Item>
								<Form.Item className="mb-[20px]" name="library" valuePropName="checked" label={null}>
									<Checkbox>
										{t('libraryRegulations')}
										<a
											className="underline ml-1"
											href="https://kpfu.ru/library/obschie-polozheniya-iz-pravil-polzovaniya"
											target="_blank"
											rel="noopener noreferrer"
										>
											{t('libraryRegulations2')}
										</a>
									</Checkbox>
								</Form.Item>
								<Form.Item className="mb-[20px]" name="approve" valuePropName="checked" label={null}>
									<Checkbox>
										<a
											className="underline mr-1"
											href="https://shelly.kpfu.ru/e-ksu/docs/F_437732066/prikaz_soglashenie_na_PEP211_docx_18_05_2022.docx"
											target="_blank"
											rel="noopener noreferrer"
										>
											{t('generalAgreement')}
										</a>
										{t('generalAgreement2')}
									</Checkbox>
								</Form.Item>
								<Form.Item className="mb-[20px]" name="sogl" valuePropName="checked" label={null}>
									<Checkbox>
										{t('sogl')}
										<a className="underline " href="/Soglasie.docx" target="_blank" rel="noopener noreferrer">
											{t('sogl2')}
										</a>
									</Checkbox>
								</Form.Item>
								<Form.Item className="mb-[20px]" name="oznak" valuePropName="checked" label={null}>
									<Checkbox>
										{t('politics')}
										<a className="underline ml-1" href="/politika.pdf" target="_blank" rel="noopener noreferrer">
											{t('politics2')}
										</a>
									</Checkbox>
								</Form.Item>

								<Form.Item className="mb-[5px] mt-[15px]">
									<Button type="primary" htmlType="submit">
										{t('saveButton')}
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Col>
				</Row>
			</div>

			{/* Секция образования */}
			{dataAboutMe?.studentAddedDto ?
			<div className="bg-white rounded-xl shadow-md mt-7">
				{dataAboutMe?.studentAddedDto?.GRADE==='bachelor'?<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{t(dataAboutMe?.studentAddedDto?.GRADE)}
								</Title>
							</div>
							<Divider />

							<div className="flex flex-wrap justify-start">
								<Descriptions column={1} title="">
									<Descriptions.Item label={t('insitute')}>{dataAboutMe?.studentAddedDto?.FACULTY}</Descriptions.Item>
									<Descriptions.Item label={t('specialization')}>{dataAboutMe?.studentAddedDto?.SPECIALITY}</Descriptions.Item>
									<Descriptions.Item label={t('typeObr')}>{dataAboutMe?.studentAddedDto?.STUDY_TYPE}</Descriptions.Item>
									<Descriptions.Item label={t('category')}>{dataAboutMe?.studentAddedDto?.CATEGORY}</Descriptions.Item>

									<Descriptions.Item label={t('ident')}>{dataAboutMe?.studentAddedDto?.IDENT}</Descriptions.Item>
									<Descriptions.Item label={t('groupNumbers')}>{dataAboutMe?.studentAddedDto?.GROUP}</Descriptions.Item>
									<Descriptions.Item label={t('bilet')}>{dataAboutMe?.studentAddedDto?.LIBCARD}</Descriptions.Item>
									<Descriptions.Item label={t('graduateYear')}>{dataAboutMe?.studentAddedDto?.STUDYEND}</Descriptions.Item>
								</Descriptions>
							</div>
						</div>
					</Col>
				</Row> : ''}

				{dataAboutMe?.studentAddedDto?.GRADE===''?<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{t(dataAboutMe?.studentAddedDto?.GRADE)}
								</Title>
							</div>
							<Divider />

							<div className="flex flex-wrap justify-start">
								<Descriptions column={1} title="">
									<Descriptions.Item label={t('insitute')}>{dataAboutMe?.studentAddedDto?.FACULTY}</Descriptions.Item>
									<Descriptions.Item label={t('specialization')}>{dataAboutMe?.studentAddedDto?.SPECIALITY}</Descriptions.Item>
									<Descriptions.Item label={t('typeObr')}>{dataAboutMe?.studentAddedDto?.STUDY_TYPE}</Descriptions.Item>
									<Descriptions.Item label={t('category')}>{dataAboutMe?.studentAddedDto?.CATEGORY}</Descriptions.Item>

									<Descriptions.Item label={t('groupNumbers')}>{dataAboutMe?.studentAddedDto?.GROUP}</Descriptions.Item>
									<Descriptions.Item label={t('graduateYear')}>{dataAboutMe?.studentAddedDto?.STUDYEND}</Descriptions.Item>
								</Descriptions>
							</div>
						</div>
					</Col>
				</Row> : ''}

				{dataAboutMe?.studentAddedDto?.GRADE===''?<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{t(dataAboutMe?.studentAddedDto?.GRADE)}
								</Title>
							</div>
							<Divider />

							<div className="flex flex-wrap justify-start">
								<Descriptions column={1} title="">
									<Descriptions.Item label={t('insitute')}>{dataAboutMe?.studentAddedDto?.FACULTY}</Descriptions.Item>
									<Descriptions.Item label={t('specialization')}>{dataAboutMe?.studentAddedDto?.SPECIALITY}</Descriptions.Item>
									<Descriptions.Item label={t('typeObr')}>{dataAboutMe?.studentAddedDto?.STUDY_TYPE}</Descriptions.Item>
									<Descriptions.Item label={t('category')}>{dataAboutMe?.studentAddedDto?.CATEGORY}</Descriptions.Item>

									<Descriptions.Item label={t('naych')}>ыы</Descriptions.Item>
									<Descriptions.Item label={t('graduateYear')}>{dataAboutMe?.studentAddedDto?.STUDYEND}</Descriptions.Item>
								</Descriptions>
							</div>
						</div>
					</Col>
				</Row> : ''}


				{dataAboutMe?.AspirAddedDto?.SPECIALITY===''?<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{t(dataAboutMe?.AspirAddedDto?.GRADE)}
								</Title>
							</div>
							<Divider />

							<div className="flex flex-wrap justify-start">
								<Descriptions column={1} title="">
									<Descriptions.Item label={t('insitute')}>{dataAboutMe?.AspirAddedDto?.FACULTY}</Descriptions.Item>
									<Descriptions.Item label={t('specialization')}>{dataAboutMe?.AspirAddedDto?.SPECIALITY}</Descriptions.Item>
									<Descriptions.Item label={t('typeObr')}>{dataAboutMe?.AspirAddedDto?.STUDY_TYPE}</Descriptions.Item>
									<Descriptions.Item label={t('category')}>{dataAboutMe?.AspirAddedDto?.CATEGORY}</Descriptions.Item>

									<Descriptions.Item label={'Супервизор'}>{dataAboutMe?.AspirAddedDto?.SCI_SUPERVISOR}</Descriptions.Item>
									<Descriptions.Item label={t('graduateYear')}>{dataAboutMe?.AspirAddedDto?.STUDYEND}</Descriptions.Item>
								</Descriptions>
							</div>
						</div>
					</Col>
				</Row> : ''}
			</div>: ''}

			

			{/* Секция сотрудника */}
			{dataAboutMe?.employeeAddedDto ? <>
			<div className="bg-white rounded-xl shadow-md mt-7">
			<Row className=''>
				<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{'О работе'}
								</Title>
							</div>
							<Divider />

							<div className="flex flex-wrap justify-start">
								<Descriptions column={1} title="">
								{dataAboutMe?.employeeAddedDto?.POSITION ?<Descriptions.Item label={t('job')}>{dataAboutMe?.employeeAddedDto?.POSITION}</Descriptions.Item>:''}
									{dataAboutMe?.employeeAddedDto?.WORKADDRESS_BUILDING ?<Descriptions.Item label={t('adress')}>{dataAboutMe?.employeeAddedDto?.WORKADDRESS_BUILDING}</Descriptions.Item>:''}
									{dataAboutMe?.employeeAddedDto?.WORKADDRESS_ROOM ?<Descriptions.Item label={t('numberCabinet')}>{dataAboutMe?.employeeAddedDto?.WORKADDRESS_ROOM}</Descriptions.Item>: ''}
									{dataAboutMe?.employeeAddedDto?.PARTTIMEWORK ?<Descriptions.Item label={t('jobSovm')}>{dataAboutMe?.employeeAddedDto?.PARTTIMEWORK}</Descriptions.Item>: ''}
								</Descriptions>
							</div>
						</div>
					</Col>
				</Row>
			</div>

			<div className="bg-white rounded-xl shadow-md mt-7">
				
				<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{t('additionalInfo')}
								</Title>
							</div>
							<Divider />

							<div className="w-full">
								<Row>
									
									<QuillComponents
										content={content}
										setContent={setContent}
										
									/> 
								</Row>
								<Row>
									<Button type="primary">{t('save')}</Button>
								</Row>
							</div>
						</div>
					</Col>
				</Row>
			</div></>: ''}
		</div>
	)
}

export default AboutMeNew
