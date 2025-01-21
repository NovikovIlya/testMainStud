import React from 'react'
import InfoCard from './InfoCard'
import { Col, Form, Row, Select } from 'antd'
import { TableSchedule } from './table/TableSchedule'

const ScheduleTeacher = () => {
  const [form] = Form.useForm()
  const yearForm = Form.useWatch('year', form);
  const semestrForm = Form.useWatch('semestr', form);
  
  return (
    <div className="p-[80px]">
        <InfoCard text={'Уважаемый преподаватель! При отсутствии расписания или обнаружении несоответствий между выведенным расписанием и Вашим фактическим расписанием на определенный Вами учебный год, просим обратиться в деканат Вашего института или факультета для устранения выявленных ошибок.'}/>

        <Form className='mt-8' form={form}>
          <Row >
            <Col span={24}>
              <Form.Item
                name="year"
                label="Учебный год"
                labelAlign="left"
                labelCol={{ span: 4 }} // Фиксированная ширина лейбла
                wrapperCol={{ span: 10 }} // Оставшаяся ширина для инпута
              >
                <Select placeholder="Выберите дисциплину" allowClear options={[{ value: '1', label: 'Дисциплина 1' },{ value: '2', label: 'Дисциплина 2' }]} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="semestr"
                label="Семестр"
                labelAlign="left"
                labelCol={{ span: 4 }} // Такая же ширина лейбла
                wrapperCol={{ span: 10 }} // Такая же ширина инпута
              >
                <Select disabled={!yearForm} placeholder="Выберите группу" allowClear />
              </Form.Item>
            </Col>
          </Row>
			  </Form>

       <TableSchedule data={null} />
    </div>
  )
}

export default ScheduleTeacher