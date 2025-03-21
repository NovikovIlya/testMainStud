import { EditOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Row, Tooltip } from 'antd'
import { Descriptions } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import QuillComponents from './QuillComponents'
import UploadAvatar from './UploadAvatar'

const AboutMeNew = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm()
	const [content, setContent] = useState(
		'<p><strong><a href="https://scholar.google.ru/citations?user=UlOzbD0AAAAJ&amp;hl=ru" target="_blank">Google Scholar</a></strong></p>\r\n<p>&nbsp;</p>\r\n<p><strong><a href="http://www.researcherid.com/rid/N-5374-2016" target="_blank">ResearcherID:&nbsp;N-5374-2016</a></strong></p>\r\n<p>&nbsp;</p>\r\n<p><strong><a href="https://www.scopus.com/authid/detail.uri?authorId=58150677300">Author ID:&nbsp;58150677300&#65279;</a></strong></p>\r\n<p>&nbsp;</p>\r\n<p><strong><a href="http://orcid.org/0000-0002-6721-7488">ORCID ID:&nbsp;0000-0002-6721-7488</a></strong></p>\r\n<p>&nbsp;</p>\r\n<p><strong><a href="http://www.mathnet.ru/rus/person/121217" target="_blank">Math-Net ID:&nbsp;121217</a></strong></p>\r\n<p><strong>------------------------------------</strong></p>\r\n<p><strong>Член редколлегии журнала РАН <a href="https://sciencejournals.ru/journal/vysen/">"Химия высоких энергий"</a></strong></p>\r\n<p><strong><strong>Рецензент журналов: <a href="http://jetpletters.ru/ru/jetpl.shtml">Письма в ЖЭТФ</a>,&nbsp;<a href="https://link.springer.com/journal/11452">Plasma Physics Reports</a>,&nbsp;</strong><a href="https://benthamscience.com/journals/current-nanoscience/">Current Nanoscience</a>, <a href="https://www.mdpi.com/journal/plasma">Plasma&#65279;</a>, <a href="https://www.mdpi.com/journal/metals">Metals</a>, <a href="https://www.springer.com/journal/10733/">High Energy Chemistry</a>,&nbsp;<a href="https://www.mdpi.com/journal/biomolecules">Biomolecules&#65279;</a><br /></strong></p>'
	)
	const [isPreview, setIsPreview] = useState(false)

	useEffect(() => {
		form.setFieldsValue({ content: 'sss' })
	}, [form])

	const onFinish = (values: any) => {
		console.log('Отправка чекбоксов:', values)
	}
  console.log('content',content)

	// if() return <div className='mt-[-45px] ml-[-40px]'><SkeletonPage /></div>

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className="bg-white rounded-xl shadow-md">
				<Row>
					<Col span={12}>
						<div className="flex flex-wrap justify-center p-[40px]">
							<UploadAvatar />
							<div className="w-full text-center">{t('fullName')}</div>
						</div>
					</Col>
					<Col span={12}>
						<div className="flex flex-wrap justify-start p-[40px]">
							<Descriptions column={1} title={t('generalInfo')}>
								<Descriptions.Item label={t('birthDate')}>Zhou Maomao</Descriptions.Item>
								<Descriptions.Item label={t('gender')}>1810000000</Descriptions.Item>
								<Descriptions.Item label={t('citizenshipType')}>Hangzhou, Zhejiang</Descriptions.Item>
								<Descriptions.Item label={t('citizenshipCountry')}>empty</Descriptions.Item>
								<Descriptions.Item label={t('birthPlace')}>No. 18,</Descriptions.Item>
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
								{/* <Form.Item className='mb-[24px]  !flex !items-start' name="razr" valuePropName="checked" label={null}>
                  <Checkbox  className='flex !items-start'>{t('razr')}</Checkbox>
                </Form.Item> */}
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

			{/* Секция бакалавриата */}
			<div className="bg-white rounded-xl shadow-md mt-7">
				<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-6">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									{t('bachelorsDegree')}
								</Title>
							</div>
							<Divider />

							<div className="flex flex-wrap justify-start">
								<Descriptions column={1} title="">
									<Descriptions.Item label={t('insitute')}>2020</Descriptions.Item>
									<Descriptions.Item label={t('specialization')}>Исскуство</Descriptions.Item>
									<Descriptions.Item label={t('typeObr')}>ТЕСТ</Descriptions.Item>
									<Descriptions.Item label={t('category')}>Бюджет</Descriptions.Item>

									<Descriptions.Item label={t('status')}>{t('activeStatus')}</Descriptions.Item>
								</Descriptions>
							</div>
						</div>
					</Col>
				</Row>
			</div>

			{/* Секция дополнительной информации */}
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

							<div className="">
								<Row>
									<QuillComponents
										content={content}
										setContent={setContent}
										isPreview={isPreview}
										setIsPreview={setIsPreview}
									/>
								</Row>
								<Row>
									<Button type="primary">Сохранить</Button>
									{/* <Button
                          onClick={() => setIsPreview(!isPreview)}
                          
                          className=""
                        >
                          {isPreview ? (
                            <>
                              <EditOutlined  size={18} /> Редактировать
                            </>
                          ) : (
                            <>
                              <EyeOutlined  size={18} /> Предпросмотр
                            </>
                          )}
                        </Button> */}
								</Row>
							</div>
							{/* <Form className='w-full' form={form} onFinish={handleSubmit}>
                <Form.Item className='' name="content" label="">
                 <TextArea className='' placeholder={t('aboutMePlaceholder')} />
                 
                </Form.Item>
                <Button type='primary' htmlType="submit">{t('saveButton')}</Button>
              </Form> */}
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default AboutMeNew
