import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import StudentTable from './StudentTable'
import { useUpdateCompetencesMutation } from '../../../../store/api/practiceApi/practiceTeacher'
import { useLocation } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

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

const ModalStudent = ({dataAllOrder,isFetchingComp,id,idStudent,isSuccessCompetences,dataCompetences,rowData, openModalStudent, handleOk, setIsModalStudent }: any) => {
	const [dataSource,setDataSource] = useState<any>([])
	const [selectGrade,setSelectGrade] = useState(null)
	const [isEdit,setIsEdit] = useState(false)
	const [form] = Form.useForm()
	const [updateCompetence,{}] = useUpdateCompetencesMutation()
	const [flag,setFlag] = useState(false)
	
	// useEffect(()=>{
	// 	if(isSuccessCompetences && !flag){
	// 		setDataSource(dataCompetences)
	// 		setFlag(true)
	// 	}
	// },[isSuccessCompetences,dataCompetences])
	console.log('dataSource',dataSource)
	useEffect(() => {
		if (dataCompetences && dataCompetences.length > 0) {
		  setDataSource([...dataCompetences]);
		}
	  }, [dataCompetences]);
	  
	  

	const handleSave = (row: any) => {
		const newData = [...dataSource];
		// @ts-ignore
		const index = newData.findIndex(item => row.competenceId === item.competenceId);
		const item = newData[index];
			// @ts-ignore
		newData.splice(index, 1, {
				// @ts-ignore
		  ...item,
		  ...row,
		});
		setDataSource(newData);
	  };

	const onFinish = (values: any) => {
        console.warn('123')
        console.table(dataSource)
		console.log('Success:', values)
		
		setIsEdit(false)
		const obj = {
			comment: values.rep,
			gradeForPractice: String(values.gradeKFUProh),
			gradeForReport: String(values.gradeKFUReport),
			gradeFromProfileDirector:  String(values.gradeProf),
			gradeAgreement:  values.gradeProf==='Согласен' ? true : false ,
			gradeIfNotAgree: String(values.gradeIfSelect),
			competencesTable: dataSource
		}
		const mainObj = {
			body:obj,
			practiceId :id,
			studentId :idStudent
		}
		console.log('mainObj',mainObj)
		updateCompetence(mainObj)
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
		setDataSource([]);
		
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
							<Form.Item name={'selectGrade'} required>
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
                       {isFetchingComp ? <Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> : <StudentTable handleSave={handleSave} setIsEdit={setIsEdit} dataSource={dataSource} />}
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