import {PlusOutlined} from '@ant-design/icons'
import {
    Button,
    Col,
    DatePicker,
    Input,
    Row,
    Select,
    Space,
    Typography,
    Upload,
    Form, InputNumber
} from 'antd'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {ArrowLeftSvg} from '../../../../assets/svg'
import {useCreateContractMutation} from '../../../../store/api/practiceApi/taskService'
import {ICreateContract} from '../../../../models/Practice'
import {validateMessages} from "../../../../utils/validateMessage";
import {useNavigate} from "react-router-dom";


export const CreateContracts = () => {
	const nav = useNavigate()
    const optionsContractsType = [
		{
			value: 'Бессрочный',
			label: 'Бессрочный'
		},
        {
            value: 'Указать пролонгацию',
            label: 'Указать пролонгацию'
        }]
	const [prolongation, setProlongation] = useState(false)
    const [newContract] = useCreateContractMutation()

    function onFinish(values: ICreateContract) {
        const formDataCreateContract = new FormData()
        values.dateConclusionContract = dayjs(values.dateConclusionContract).format('DD.MM.YYYY')
        values.contractTime = dayjs(values.contractTime).format('DD.MM.YYYY')
        for (let key in values) {
            formDataCreateContract.append(key, values[key as keyof ICreateContract])
        }
		console.log(values)
        console.log(formDataCreateContract)
    }

    return (
        <section className="container">
            <Space size={10}>
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
                    onClick={() => nav('/services/practices/registerContracts')}
                />
                <Typography.Text className="text-black text-3xl font-normal">
                    Новый документ
                </Typography.Text>
            </Space>
            <Form validateMessages={validateMessages}
                  layout={'vertical'}
                  onFinish={values => onFinish(values)}
            >
				<Row gutter={[16, 16]} className="mt-12">
					<Col xs={24} sm={24} md={18} lg={16} xl={12}>
						<Form.Item label={'ИНН'}
								   name={'inn'}
								   rules={[{required: true}]}>
							<InputNumber
								className="w-full"
								size="large"
							/>
						</Form.Item>

					</Col>
				</Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Наименование организации по договору'}
                                   name={'contractFacility'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Номер договора'}
                                   name={'contractNumber'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Дата заключения договора'}
                                   name={'dateConclusionContract'}
                                   rules={[{required: true}]}>
                            <DatePicker
                                format={'DD.MM.YYYY'}
                                placeholder={''}
                                className="w-full"
                                size={'large'}
                            />
                        </Form.Item>

                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Тип договора'}
                                   name={'contractType'}
                                   rules={[{required: true}]}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                                defaultValue=""
                                className="w-full"
                                options={optionsContractsType}
								onChange={value => {
									if (value === 'Указать пролонгацию') {
										setProlongation(true)
									} else setProlongation(false)
								}}
                            />
                        </Form.Item>
                    </Col>
					{
						prolongation
						&&
						<Col xs={24} sm={24} md={18} lg={8} xl={6}>
							<Form.Item label={'Пролонгация'}
									   name={'prolongation'}
									   rules={[{required: true}]}>
								<InputNumber
									className="w-full"
									size="large"
									controls={false}
								/>
							</Form.Item>
						</Col>
					}

                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Срок действия договора'}
                                   name={'contractTime'}
                                   rules={[{required: true}]}>
                            <DatePicker
                                format={'DD.MM.YYYY'}
                                placeholder={''}
                                className="w-full"
                                size={'large'}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Шифр и наименование специальности'}
                                   name={'specialtyName'}
                                   rules={[{required: true}]}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                                defaultValue=""
                                className="w-full"
                                options={[
                                    {
                                        value: '31.08.01 Акушерство и гинекология',
                                        label: '31.08.01 Акушерство и гинекология'
                                    },
                                    {
                                        value: '31.08.11 Педиатрия',
                                        label: '31.08.11 Педиатрия'
                                    }
                                ]}
                            />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Юридический адрес организации'}
                                   name={'legalFacility'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Фактический адрес организации'}
                                   name={'actualFacility'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Количество мест'}
                                   name={'placeNumber'}
                                   rules={[{required: true}]}>
                            <InputNumber
                                className="w-full"
                                size="large"
                                type={'number'}
                                controls={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Прикрепить скан договора в формате pdf'}
                                   name={'pdfContract'}
                                   rules={[{required: true}]}>
                            <Upload
                                beforeUpload={() => {
                                    return false
                                }}
                                maxCount={1}
                                accept={'.pdf'}
                                name={'pdfContract'}
                            >
                                <Button
                                    className="w-full"
                                    size="large"
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                >
                                    Добавить файл
                                </Button>
                            </Upload>
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Прикрепить дополнительный документ в формате pdf'}
                                   name={'pdfAgreement'}
                                   rules={[{required: true}]}>
                            <Upload
                                beforeUpload={() => {
                                    return false
                                }}
                                maxCount={1}
                                accept={'.pdf'}
                                name={'pdfAgreement'}
                            >
                                <Button
                                    className="w-full"
                                    size="large"
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                >
                                    Добавить файл
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="my-8">
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space className="w-full">
                            <Button
                                className="!rounded-full"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Сохранить
                            </Button>
                            {/*<Button*/}
                            {/*    className="!rounded-full"*/}
                            {/*    size="large"*/}
                            {/*    onClick={() => {*/}
                            {/*        //setIsPreview(true)*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Режим просмотра*/}
                            {/*</Button>*/}
                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}
