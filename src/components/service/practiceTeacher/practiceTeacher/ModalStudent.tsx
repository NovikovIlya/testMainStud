import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from 'antd'
import React, { useState } from 'react'
import StudentTable from './StudentTable'

const mockData = [
	{
		key: '1',
		number: 1,
		name: 'Задание 1',
		level: 'Высокий',
		grade:'1'
	},
	{
		key: '2',
		number: 2,
		name: 'Задание 2',
		level: 'Средний',
		grade:'1'
	},
	{
		key: '3',
		number: 3,
		name: 'Задание 3',
		level: 'Низкий',
		grade:'2'
	},
	{
		key: '4',
		number: 4,
		name: 'Задание 4',
		level: 'Высокий',
		grade:'0'
	},
	{
		key: '5',
		number: 5,
		name: 'Задание 5',
		level: 'Средний',
		grade:'1'
	}
]
const selectOptions=[
	{value: 'Согласен', name: 'Согласен'},
	{value: 'Не согласен', name: 'Не согласен'},
]

const ModalStudent = ({rowData, openModalStudent, handleOk, setIsModalStudent }: any) => {
    const [dataSource,setDataSource] = useState(mockData)
	const [selectGrade,setSelectGrade] = useState(null)
	const [isEdit,setIsEdit] = useState(false)
	const [form] = Form.useForm()

	const onFinish = (values: any) => {
        console.warn('123')
        console.table(dataSource)
		console.log('Success:', values)
		setIsEdit(false)
	}

    const handleCancelModal = () => {
        if(isEdit || form.getFieldValue('rep') || form.getFieldValue('date') || form.getFieldValue('gradeKFUProh') ||  form.getFieldValue('gradeKFUReport') | form.getFieldValue('gradeProf')){
            const yes = typeof window !== 'undefined' && window.confirm("Если вы закроете окно, данные не сохраняться. Вы хотите продолжить?");
            if(yes) {
                form.resetFields()
                setIsModalStudent(false)
            } else {
                return
            }
        }
	
		setIsModalStudent(false)
	
		
	}

	return (
		<Modal
			title={`Сформируйте отчет по студенту ${rowData?.studentName}`}
			width={900}
			style={{ paddingBottom: '150px'}}
			open={openModalStudent}
			onOk={handleOk}
			onCancel={handleCancelModal}
			footer={false}
		>
			<div className="p-5 mt-5">
				<Form onFinish={onFinish} form={form}>
					<Row>
						<Col span={12}>
							<span>Отзыв руководителя практики</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'rep'}>
								<Input.TextArea maxLength={100} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					

					<Row>
						<Col span={12}>
							<span>Оценка руководителя практики от КФУ за прохождение</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeKFUProh'}>
								<InputNumber className='w-full' min={1} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={12}>
							<span>Оценка руководителя практики от КФУ за отчет</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeKFUReport'}>
								<InputNumber className='w-full' min={1} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

                    <Row>
						<Col span={12}>
							<span>Оценка руководителя практики от проф.организации (при наличии)</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeProf'}>
								<InputNumber className='w-full' min={1} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={12}>
							<span>С результатом оценивания практики руководителя проф.организации</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'selectGrade'}>
								<Select  onChange={(v) => setSelectGrade(v)}   options={selectOptions} className='w-full'  placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					{selectGrade === 'Не согласен' ?
					<Row>
						<Col span={12}>
							<span>Оценка в случае несогласия </span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeIfSelect'}>
								<InputNumber className='w-full' min={1} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row> : ''
					}

                    <Row>
                        <StudentTable setIsEdit={setIsEdit} dataSource={dataSource} setDataSource={setDataSource}/>
                    </Row>

					<div className="flex justify-end mt-5">
						<Button htmlType="submit">Сохранить и сформировать отчет</Button>
					</div>
				</Form>
			</div>
		</Modal>
	)
}

export default ModalStudent
