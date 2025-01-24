import React from 'react'
import InfoCard from './InfoCard'
import { Button, Col, Form, Row, Select } from 'antd'
import { TableSchedule } from './table/TableSchedule'
import { t } from 'i18next'

const ScheduleTeacher = () => {
  const [form] = Form.useForm()
  const yearForm = Form.useWatch('year', form);
  const semestrForm = Form.useWatch('semestr', form);
  
  return (
    <div className="p-[80px]">
        <InfoCard text={t('infoTextScdedule')}/>

        <Form className='mt-8' form={form}>
          <Row >
            <Col span={24}>
              <Form.Item
                name="year"
                label={t('academicYear')}
                labelAlign="left"
                labelCol={{ span: 4 }} // Фиксированная ширина лейбла
                wrapperCol={{ span: 10 }} // Оставшаяся ширина для инпута
              >
                <Select  allowClear options={[{ value: '1', label: 'Дисциплина 1' },{ value: '2', label: 'Дисциплина 2' }]} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="semestr"
                label={t('Semester')}
                labelAlign="left"
                labelCol={{ span: 4 }} // Такая же ширина лейбла
                wrapperCol={{ span: 10 }} // Такая же ширина инпута
              >
                <Select disabled={!yearForm}  allowClear />
              </Form.Item>
            </Col>
          </Row>
			  </Form>

        <Row>
          <Col span={24}>
            <Button className='rounded-xl' type='primary'>Сформировать</Button>
          </Col>
        </Row>
        
       <TableSchedule data={null} />
    </div>
  )
}

export default ScheduleTeacher