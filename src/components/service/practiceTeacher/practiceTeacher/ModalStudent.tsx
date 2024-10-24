import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import StudentTable from './StudentTable'
import { useGetInfoReportStudentQuery, useUpdateCompetencesMutation } from '../../../../store/api/practiceApi/practiceTeacher'
import { useLocation } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../store'
import { showNotification } from '../../../../store/reducers/notificationSlice'

const selectOptions = [
	{value: 'Согласен', name: 'Согласен'},
	{value: 'Не согласен', name: 'Не согласен'},
]

const ModalStudent = ({dataReportStudent,data,dataAllOrder,isFetchingComp,id,idStudent,isSuccessCompetences,dataCompetences,rowData, openModalStudent, handleOk, setIsModalStudent }: any) => {
	const [dataSource,setDataSource] = useState<any>([])
	const [selectGrade,setSelectGrade] = useState(null)
	const [isEdit,setIsEdit] = useState(false)
	const [form] = Form.useForm()
	const [updateCompetence,{data:dataUpdateCompetence}] = useUpdateCompetencesMutation()
	const [isSend,setIsSend] = useState(true)
	const dispatch= useAppDispatch()

	useEffect(()=>{
		download()
	},[dataUpdateCompetence])

	useEffect(() => {
		if (dataCompetences && dataCompetences.length > 0) {
		  setDataSource([...dataCompetences]);
		  form.setFieldValue('rep',data?.comment ? data?.comment : '')
		  form.setFieldValue('gradeKFUProh',data?.gradeForPractice ? data?.gradeForPractice : '')
		  form.setFieldValue('gradeKFUReport',data?.gradeForReport ? data?.gradeForReport : '')
		  form.setFieldValue('gradeProf',data?.gradeFromProfileDirector ? data?.gradeFromProfileDirector : '')
		  form.setFieldValue('selectGrade',data?.gradeAgreement ? 'Согласен' : 'Не согласен')
		  form.setFieldValue('gradeIfSelect',data?.gradeIfNotAgree ? data?.gradeIfNotAgree : '')
		}
	}, [dataCompetences]);

	

	const handleSave = (row: any) => {
		setIsSend(false)
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
			gradeAgreement:  values.selectGrade==='Согласен' ? true : false ,
			gradeIfNotAgree: String(values.gradeIfSelect),
			competencesTable: dataSource
		}
		const mainObj = {
			body:obj,
			practiceId :id,
			studentId :idStudent
		}
		console.log('mainObj',mainObj)
		updateCompetence(mainObj).unwrap().then(res => {
			dispatch(showNotification({ message: 'Отчет сформирован', type: 'success' }))
		})
		// download()
	}

    const handleCancelModal = () => {
        // if(isEdit || form.getFieldValue('rep') || form.getFieldValue('date') || form.getFieldValue('gradeKFUProh') ||  form.getFieldValue('gradeKFUReport') | form.getFieldValue('gradeProf')){
        //     const yes = typeof window !== 'undefined' && window.confirm("Если вы закроете окно, данные не сохраняться. Вы хотите продолжить?");
        //     if(yes) {
        //         form.resetFields()
        //         setIsModalStudent(false)
        //     } else {
        //         return
        //     }
        // }
		if(!isSend){
			const yes = typeof window !== 'undefined' && window.confirm("Если вы закроете окно, данные не сохраняться. Вы хотите продолжить?");
            if(yes) {
                setIsModalStudent(false)
				setDataSource([]);
				form.setFieldValue('rep', '')
				form.setFieldValue('gradeKFUProh', '')
				form.setFieldValue('gradeKFUReport','')
				form.setFieldValue('gradeProf', '')
				form.setFieldValue('selectGrade','')
				form.setFieldValue('gradeIfSelect', '')

				setIsSend(true)
            } else {
                return
            }
		}
		setIsModalStudent(false)
		setDataSource([]);

		form.setFieldValue('rep', '')
		form.setFieldValue('gradeKFUProh', '')
		form.setFieldValue('gradeKFUReport','')
		form.setFieldValue('gradeProf', '')
		form.setFieldValue('selectGrade','')
		form.setFieldValue('gradeIfSelect', '')
	}

	const download = async ()=>{
		console.log('dataUpdateCompetence',dataUpdateCompetence)
		if(dataUpdateCompetence){
			const link = document.createElement('a')
			link.href = dataUpdateCompetence
			link.setAttribute('download', `Отчет студента.docx`)
			document.body.appendChild(link)
			link.click()
		}
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
			<Spin spinning={isFetchingComp}>
			<div className="p-5 mt-5">
			<Form onFinish={onFinish} form={form}>
					{/* <a href=''>{dataReportStudent}Отчет.docx</a> */}
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
								<InputNumber onChange={()=>setIsSend(false)}  className='w-full' min={1} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={12}>
							<span>Оценка руководителя практики от КФУ за отчет</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeKFUReport'}>
								<InputNumber onChange={()=>setIsSend(false)} className='w-full' min={1} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

                    <Row>
						<Col span={12}>
							<span>Оценка руководителя практики от проф.организации (при наличии)</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeProf'}>
								<InputNumber onChange={()=>setIsSend(false)}  className='w-full' min={1} placeholder="Ввести" />
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
								<InputNumber onChange={()=>setIsSend(false)}  className='w-full' min={1} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row> : ''
					}

                    <Row>
                        <StudentTable  handleSave={handleSave} setIsEdit={setIsEdit} dataSource={dataSource} />
                    </Row>

					<div className="flex justify-end mt-5 gap-3">
						<Button htmlType="submit">Сохранить и сформировать отчет</Button>
						{/* <Tooltip title={true===true ? 'Необходимо сохранить отчет' : ''}><Button disabled={true}>Сформировать отчет</Button></Tooltip> */}
					</div>
				</Form>
			</div>
			</Spin>
		</Modal>
	)
}

export default ModalStudent
