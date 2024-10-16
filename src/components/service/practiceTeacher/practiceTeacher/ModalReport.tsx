import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd'
import React from 'react'

const ModalReport = ({ openModalReport, handleOk, setIsModalOpenReport }: any) => {

	const [form] = Form.useForm()

	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

    const handleCancelModal = () => {
        if(form.getFieldValue('dop') || form.getFieldValue('date') || form.getFieldValue('final')){
            const yes = typeof window !== 'undefined' && window.confirm("Если вы закроете окно, данные не сохраняться. Вы хотите продолжить?");
            if(yes) {
                form.resetFields()
                setIsModalOpenReport(false)
            } else {
                return
            }
        }
		setIsModalOpenReport(false)
	
		
	}

	return (
		<Modal
			title="Сформируйте отчет"
			width={650}
			style={{ paddingBottom: '150px' }}
			open={openModalReport}
			onOk={handleOk}
			onCancel={handleCancelModal}
			footer={false}
		>
			<div className="p-5">
				<Form onFinish={onFinish} form={form}>
					<Row>
						<Col span={12}>
							<span>Дополнительная информация</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'dop'}>
								<Input placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={12}>
							<span>Даты приема зачета</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'date'}>
								<DatePicker className="w-full" format="DD.MM.YYYY" />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={12}>
							<span>Выводы</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'final'}>
								<Input placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					<div className="flex justify-end">
						<Button htmlType="submit">Сформировать отчет</Button>
					</div>
				</Form>
			</div>
		</Modal>
	)
}

export default ModalReport
