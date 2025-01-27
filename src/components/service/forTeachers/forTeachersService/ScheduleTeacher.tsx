import React from 'react'
import InfoCard from './InfoCard'
import { Button, Col, Form, Result, Row, Select, Spin } from 'antd'
import { TableSchedule } from './table/TableSchedule'
import { t } from 'i18next'
import { useGetScheduleForTeacherQuery } from '../../../../store/api/forTeacher/forTeacherApi'

const ScheduleTeacher = () => {
  const [form] = Form.useForm()
  const yearForm = Form.useWatch('year', form);
  const semestrForm = Form.useWatch('semestr', form);
  const {data:dataSchedule,isFetching} = useGetScheduleForTeacherQuery({year:yearForm,semester:semestrForm},{skip:!yearForm || !semestrForm})

  const handleYearChange = () => {
    form.resetFields(['semestr']);
  }
  
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
                <Select   allowClear options={[{ value: 2024, label: '2024' },{ value: 2023, label: '2023' }]}  onChange={handleYearChange} />
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
                <Select disabled={!yearForm}  allowClear options={[{value:1,label:'1'},{value:2,label:'2'}]}/>
              </Form.Item>
            </Col>
          </Row>
			  </Form>

         {/* <Row>
          <Col span={24}>
            <Button className='rounded-xl' type='primary'>Сформировать</Button>
          </Col>
        </Row> */}
        
        <Spin spinning={isFetching}>
          {
          semestrForm  ?
          <TableSchedule isFetching={isFetching} schedule={dataSchedule?.subjects} />
          : <Result
              title=""
              extra='Выберите учебный год и семестр'
            />
        }
       </Spin>
    </div>
  )
}

export default ScheduleTeacher