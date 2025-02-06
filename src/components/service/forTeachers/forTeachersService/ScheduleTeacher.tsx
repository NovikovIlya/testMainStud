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
  const {data:dataSchedule,isFetching,isError,error} = useGetScheduleForTeacherQuery({year:yearForm,semester:semestrForm},{skip:!yearForm || !semestrForm})
  console.log('yearForm',yearForm)
  const handleYearChange = () => {
    form.resetFields(['semestr']);
  }

  const generateYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let year = currentYear; year >= 2008; year--) {
      years.push({
        value: year,
        label: `${year}/${year + 1}`
      });
    }
    
    return years;
  }

  function getCurrentAcademicYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Месяцы начинаются с 0 (январь)
  
    // Учебный год обычно начинается в сентябре
    if (month >= 8) {
      return `${year}/${year + 1}`;
    } else {
      return `${year - 1}/${year}`;
    }
  }
  
 

  return (
    <div className="p-[80px]">
        <InfoCard text={t('infoTextScdedule')}/>

        <Form 
          initialValues={{
           year: `${getCurrentAcademicYear()}`,
          }} 
          className='mt-8' 
          form={form}>
          <Row >
            <Col span={24}>
              <Form.Item
                name="year"
                label={t('academicYear')}
                labelAlign="left"
                labelCol={{ span: 4 }} // Фиксированная ширина лейбла
                wrapperCol={{ span: 10 }} // Оставшаяся ширина для инпута
              >
                <Select   allowClear options={generateYearsArray()}  onChange={handleYearChange} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="semestr"
                label={t('Semester')}
                labelAlign="left"
                labelCol={{ span: 4 }} 
                wrapperCol={{ span: 10 }} 
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
              extra={t('selectYearSemest')}
            />
        }
       </Spin>
    </div>
  )
}

export default ScheduleTeacher