import { DownOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Collapse, Divider, Form, Progress, Row, Spin, Switch, Tooltip } from 'antd'
import { Descriptions } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	useGetAboutMeQuery,
	useGetCheckboxQuery,
	useSetCheckboxMutation,
	useSetCommentMutation
} from '../../../store/api/aboutMe/forAboutMe'

import QuillComponents from './QuillComponents'
import { SkeletonPage } from './Skeleton'
import UploadAvatar from './UploadAvatar'

const AboutMeNew = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm()
	const [form2] = Form.useForm()
	const [content, setContent] = useState('')
	const { data: dataAboutMe, isLoading: isFetchingAboutMe } = useGetAboutMeQuery()
	const [sendComment, { isLoading: isLoadComment }] = useSetCommentMutation()
	const { data: dataCheckbox } = useGetCheckboxQuery()
	const [setCheckbox, { isLoading: isLoadingCheckbox }] = useSetCheckboxMutation()
	const [disabled, setDisabled] = useState(true)
	const switchForm = Form.useWatch('switch', form2)
	const [initialCheckboxes, setInitialCheckboxes] = useState({
		codex: false,
		library: false,
		approve: false,
		sogl: false,
		oznak: false
	})
	console.log('switch', switchForm)

	useEffect(() => {
		if (dataAboutMe?.employeeAddedDto?.COMMENT) {
			setContent(dataAboutMe?.employeeAddedDto?.COMMENT)
		}

		const allChecked =
			dataCheckbox?.IS_CHECKED_ETIQ === 1 &&
			dataCheckbox?.IS_CHECKED_LIB === 1 &&
			dataCheckbox?.IS_CHECKED_REL === 1 &&
			dataCheckbox?.IS_CHECKED_HANDLING === 1 &&
			dataCheckbox?.IS_CHECKED_PERS_DATA === 1
		setDisabled(!allChecked)
	}, [dataAboutMe])

	useEffect(() => {
		if (dataCheckbox) {
			// Обновление состояния чекбоксов на основе данных с бэкенда
			const updatedCheckboxes = {
				codex: dataCheckbox.IS_CHECKED_ETIQ === 1,
				library: dataCheckbox.IS_CHECKED_LIB === 1,
				approve: dataCheckbox.IS_CHECKED_REL === 1,
				sogl: dataCheckbox.IS_CHECKED_HANDLING === 1,
				oznak: dataCheckbox.IS_CHECKED_PERS_DATA === 1
			}

			form.setFieldsValue(updatedCheckboxes)
			setInitialCheckboxes(updatedCheckboxes)
		}
	}, [dataCheckbox])

	const onFinish = (values: any) => {
		console.log('Отправка чекбоксов:', values)
		const transformedObject = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value ? 1 : 0]))
		const transformedObjectValid = {
			IS_CHECKED_ETIQ: transformedObject.codex,
			IS_CHECKED_LIB: transformedObject.library,
			IS_CHECKED_REL: transformedObject.approve,
			IS_CHECKED_HANDLING: transformedObject.sogl,
			IS_CHECKED_PERS_DATA: transformedObject.oznak
		}
		console.log('transformedObjectValid:', transformedObjectValid)
		setCheckbox(transformedObjectValid)
	}

	const sendDop = () => {
		sendComment({ comment: content })
	}

	if (isFetchingAboutMe)
		return (
			<div className="mt-[-10px] ml-[6px]">
				<SkeletonPage />
			</div>
		)

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<Row className="mb-8 flex items-center justify-between">
				<Title level={2} className="!mb-0">
					{t('PersonalData')}
				</Title>
				<div className="flex items-center gap-2">
					<Form form={form2} className="flex items-center">
						<Form.Item name={'switch'} className="flex items-center mb-0">
							<Switch disabled={disabled} defaultChecked />
						</Form.Item>
					</Form>
					<span>Сделать профиль публичным</span>
					<Tooltip title={t('agreementTooltip')}>
						<img src="/src/assets/svg/GroupVop.svg" />
					</Tooltip>
				</div>
			</Row>
			<div className="bg-white rounded-xl shadow-md">
				<Row>
					<Col span={12}>
						<div className="flex flex-wrap justify-center p-[40px]">
							<UploadAvatar dataAboutMe={dataAboutMe} />
							<div className="w-full mt-3 text-center">{`${dataAboutMe?.LASTNAME || ''} ${
								dataAboutMe?.FIRSTNAME || ''
							} ${dataAboutMe?.SECONDNAME || ''}`}</div>
							<div className="mt-[32px] w-[80%]">
								<div>Профиль заполнена на 20%</div>
								<Progress
									showInfo={false}
									percent={20}
									strokeColor={{
										'0%': '#3073D7',
										'100%': '#A0C6FF'
									}}
								/>
							</div>
						</div>
					</Col>
					<Col span={12}>
						<div className="flex flex-wrap justify-start p-[40px]">
							<Descriptions column={1} title={t('generalInfo')}>
								{dataAboutMe?.BIRTH_DATE ? (
									<Descriptions.Item label={t('birthDate')}>{dataAboutMe.BIRTH_DATE}</Descriptions.Item>
								) : null}

								{dataAboutMe?.SEX ? (
									<Descriptions.Item label={t('gender')}>{t(dataAboutMe.SEX)}</Descriptions.Item>
								) : null}

								{dataAboutMe?.CITIZENSHIP_TYPE ? (
									<Descriptions.Item label={t('citizenshipType')}>{dataAboutMe.CITIZENSHIP_TYPE}</Descriptions.Item>
								) : null}

								{dataAboutMe?.CITIZENSHIP_COUNTRY ? (
									<Descriptions.Item label={t('citizenshipCountry')}>
										{dataAboutMe.CITIZENSHIP_COUNTRY}
									</Descriptions.Item>
								) : null}

								{dataAboutMe?.BIRTH_CITY ? (
									<Descriptions.Item label={t('birthPlace')}>{dataAboutMe.BIRTH_CITY}</Descriptions.Item>
								) : null}
							</Descriptions>
						</div>
					</Col>
				</Row>
			</div>

			{/* Секция пользовательского соглашения */}
			<Spin spinning={isLoadingCheckbox}>
				<div className="bg-white rounded-xl shadow-md mt-7">
					<Collapse
						accordion
						ghost
						expandIconPosition="right"
						expandIcon={({ isActive }) => (
							<div className="translate transition " style={{ float: 'right' }}>
								{isActive ? <UpOutlined /> : <DownOutlined />}
							</div>
						)}
					>
						<Collapse.Panel
							showArrow={true}
							forceRender
							className=" p-[7px] transition-all duration-500 ease-in-ou"
							header={
								<Title className="!mb-0" level={5}>
									{t('userAgreementText')}
								</Title>
							}
							key="1"
						>
							<Row>
								<Col span={24}>
									<div className="flex flex-wrap justify-start ">
										<div className="flex items-center gap-2">
											{/* <Tooltip title={t('agreementTooltip')}>
										<QuestionCircleOutlined />
									</Tooltip> */}
										</div>

										<Divider className="mt-0" />

										<Form form={form} className="" onFinish={onFinish}>
											<Form.Item className="mb-[20px]" name="codex" valuePropName="checked" label={null}>
												<Checkbox disabled={initialCheckboxes.codex}>
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
												<Checkbox disabled={initialCheckboxes.library}>
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
												<Checkbox disabled={initialCheckboxes.approve}>
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
												<Checkbox disabled={initialCheckboxes.sogl}>
													{t('sogl')}
													<a className="underline " href="/Soglasie.docx" target="_blank" rel="noopener noreferrer">
														{t('sogl2')}
													</a>
												</Checkbox>
											</Form.Item>
											<Form.Item
												// className={`${initialCheckboxes.oznak ? 'opacity-[60%]' : ''}`}
												name="oznak"
												valuePropName="checked"
												label={null}
											>
												<Checkbox disabled={initialCheckboxes.oznak}>
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
						</Collapse.Panel>
					</Collapse>
				</div>
			</Spin>

			{/* Секция образования */}
			{dataAboutMe?.studentAddedDto ? (
				<div className="bg-white rounded-xl shadow-md mt-7">
					<Row>
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
										{/* Институт */}
										{dataAboutMe?.studentAddedDto?.FACULTY ? (
											<Descriptions.Item label={t('insitute')}>{dataAboutMe.studentAddedDto.FACULTY}</Descriptions.Item>
										) : null}

										{/* Специализация */}
										{dataAboutMe?.studentAddedDto?.SPECIALITY ? (
											<Descriptions.Item label={t('specialization')}>
												{dataAboutMe.studentAddedDto.SPECIALITY}
											</Descriptions.Item>
										) : null}

										{/* Тип обучения */}
										{dataAboutMe?.studentAddedDto?.STUDY_TYPE ? (
											<Descriptions.Item label={t('typeObr')}>
												{dataAboutMe.studentAddedDto.STUDY_TYPE}
											</Descriptions.Item>
										) : null}

										{/* Категория */}
										{dataAboutMe?.studentAddedDto?.CATEGORY ? (
											<Descriptions.Item label={t('category')}>
												{dataAboutMe.studentAddedDto.CATEGORY}
											</Descriptions.Item>
										) : (
											''
										)}

										{/* Идентификатор */}
										{dataAboutMe?.studentAddedDto?.IDENT ? (
											<Descriptions.Item label={t('ident')}>{dataAboutMe.studentAddedDto.IDENT}</Descriptions.Item>
										) : null}

										{/* Номер группы */}
										{dataAboutMe?.studentAddedDto?.GROUP ? (
											<Descriptions.Item label={t('groupNumbers')}>
												{dataAboutMe.studentAddedDto.GROUP}
											</Descriptions.Item>
										) : null}

										{/* Билет */}
										{dataAboutMe?.studentAddedDto?.LIBCARD ? (
											<Descriptions.Item label={t('bilet')}>{dataAboutMe.studentAddedDto.LIBCARD}</Descriptions.Item>
										) : null}

										{/* Год окончания */}
										{dataAboutMe?.studentAddedDto?.STUDYEND ? (
											<Descriptions.Item label={t('graduateYear')}>
												{dataAboutMe.studentAddedDto.STUDYEND}
											</Descriptions.Item>
										) : null}
									</Descriptions>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			) : (
				''
			)}

			{/* Секция аспирантура */}
			{dataAboutMe?.aspirAddedDto?.FACULTY ? (
				<div className="bg-white rounded-xl shadow-md mt-7">
					<Row>
						<Col span={24}>
							<div className="flex flex-wrap justify-start p-6">
								<div className="flex items-center gap-2">
									<Title className="!mb-0" level={5}>
										{t('Postgraduate')}
									</Title>
								</div>
								<Divider />

								<div className="flex flex-wrap justify-start">
									<Descriptions column={1} title="">
										<Descriptions.Item label={t('insitute')}>{dataAboutMe?.aspirAddedDto?.FACULTY}</Descriptions.Item>
										<Descriptions.Item label={t('specialization')}>
											{dataAboutMe?.aspirAddedDto?.SPECIALITY}
										</Descriptions.Item>
										<Descriptions.Item label={t('typeObr')}>{dataAboutMe?.aspirAddedDto?.STUDY_TYPE}</Descriptions.Item>
										<Descriptions.Item label={t('category')}>{dataAboutMe?.aspirAddedDto?.CATEGORY}</Descriptions.Item>

										<Descriptions.Item label={'Супервизор'}>
											{dataAboutMe?.aspirAddedDto?.SCI_SUPERVISOR}
										</Descriptions.Item>
										<Descriptions.Item label={t('graduateYear')}>
											{dataAboutMe?.aspirAddedDto?.STUDYEND}
										</Descriptions.Item>
									</Descriptions>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			) : (
				''
			)}

			{/* Секция сотрудника */}
			{dataAboutMe?.employeeAddedDto ? (
				<>
					<div className="bg-white rounded-xl shadow-md mt-7">
						<Row className="">
							<Col span={24}>
								<div className="flex flex-wrap justify-start p-6">
									<div className="flex items-center gap-2">
										<Title className="!mb-0" level={5}>
											{t('aboutWork')}
										</Title>
									</div>
									<Divider />

									<div className="flex flex-wrap justify-start">
										<Descriptions column={1} title="">
											{dataAboutMe?.employeeAddedDto?.POSITION ? (
												<Descriptions.Item label={t('job')}>
													{dataAboutMe?.employeeAddedDto?.POSITION}
												</Descriptions.Item>
											) : null}
											{dataAboutMe?.employeeAddedDto?.WORKADDRESS_BUILDING ? (
												<Descriptions.Item label={t('adress')}>
													{dataAboutMe?.employeeAddedDto?.WORKADDRESS_BUILDING}
												</Descriptions.Item>
											) : null}
											{dataAboutMe?.employeeAddedDto?.WORKADDRESS_ROOM ? (
												<Descriptions.Item label={t('numberCabinet')}>
													{dataAboutMe?.employeeAddedDto?.WORKADDRESS_ROOM}
												</Descriptions.Item>
											) : null}
											{dataAboutMe?.employeeAddedDto?.PARTTIMEWORK ? (
												<Descriptions.Item label={t('jobSovm')}>
													{dataAboutMe?.employeeAddedDto?.PARTTIMEWORK}
												</Descriptions.Item>
											) : null}
										</Descriptions>
									</div>
								</div>
							</Col>
						</Row>
					</div>

					<div className="bg-white rounded-xl shadow-md mt-7">
						<Spin spinning={isLoadComment}>
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
												<QuillComponents content={content} setContent={setContent} />
											</Row>
											<Row>
												<Button onClick={sendDop} type="primary">
													{t('save')}
												</Button>
											</Row>
										</div>
									</div>
								</Col>
							</Row>
						</Spin>
					</div>
				</>
			) : (
				''
			)}
		</div>
	)
}

export default AboutMeNew
