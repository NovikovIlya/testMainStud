import React, { useEffect } from 'react'
import InfoCard from './InfoCard'
import { Button, Col, Form, Result, Row, Select, Spin } from 'antd'
import { TableSchedule } from './table/TableSchedule'
import { t } from 'i18next'
import { useGetScheduleForTeacherQuery } from '../../../../store/api/forTeacher/forTeacherApi'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { setYear } from 'date-fns'
import { setYearForm } from '../../../../store/reducers/forTeacherSlice'
import Title from 'antd/es/typography/Title'

const ScheduleTeacher = () => {
  const [form] = Form.useForm()
  const yearForm = useAppSelector(state => state.forTeacher.yearForm)
  const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)
  const {data:dataSchedule,isFetching,isError,error} = useGetScheduleForTeacherQuery({year:yearForm,semester:semestrForm},{skip:!yearForm || !semestrForm})



  
 

  return (
    <div className="px-[80px] pb-[80px]">
        <InfoCard text={t('infoTextScdedule')}/>
        <Title className='mt-8' level={2}>Расписание</Title>

        
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