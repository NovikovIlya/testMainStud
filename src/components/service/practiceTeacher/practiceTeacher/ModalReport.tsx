import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { useGetInfoReportGroupQuery, useUpdateReportGroupMutation } from '../../../../store/api/practiceApi/practiceTeacher'
import dayjs from 'dayjs'
import { useAppDispatch } from '../../../../store'
import { showNotification } from '../../../../store/reducers/notificationSlice'

const ModalReport = ({ id,openModalReport, handleOk, setIsModalOpenReport }: any) => {
	const [sendUpdateReport,{data:dataUpdateReport}] = useUpdateReportGroupMutation()
	const {data:dataReportGroup} = useGetInfoReportGroupQuery(id)
	const [form] = Form.useForm()
	const [isSend,setIsSend] = useState(false)
	const dispatch= useAppDispatch()

	const onFinish = (values: any) => {
		console.log('values:', values)
		const obj = {
			additionalInfo: values.dop,
			conclusions: values.final,
			date: dayjs(values.date).format('DD.MM.YYYY')
		}
		console.log('obj:', obj)
		sendUpdateReport(obj).unwrap()
			.then(() => {
				dispatch(showNotification({ message: 'Отчет сформирован', type: 'success' }))
				download()
			})
		setIsSend(true)
		
	}

    const handleCancelModal = () => {
		if(isSend){
			setIsModalOpenReport(false)
			return
		}
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

	const download = async ()=>{
		console.log('dataUpdateReport',dataUpdateReport)
		if(dataUpdateReport){
			const link = document.createElement('a')
			link.href = dataUpdateReport
			link.setAttribute('download', `Отчет.docx`)
			document.body.appendChild(link)
			link.click()
		}
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
					<a>{dataReportGroup}</a>
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
