import { ConfigProvider, DatePicker, DatePickerProps, Space, Spin, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import en_US from 'antd/locale/en_US'
import ru_RU from 'antd/locale/ru_RU'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import i18n from '../../../../18n'

import JournalPosTable from './table/JournalPosTable'
import { useGetByDateQuery } from '../../../../store/api/forTeacher/forTeacherApi'
import { useAppSelector } from '../../../../store'

const { Text } = Typography

const JournalPosDay = () => {
  const [dataSource, setDataSource] = useState<any>([])
  const [date, setDate] = useState<any>('')
  const { data, isFetching, isSuccess } = useGetByDateQuery(date, { skip: !date })
  const yearForm = useAppSelector(state => state.forTeacher.yearForm)
  const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)

  useEffect(() => {
    if (data) {
      setDataSource(data)
    }
  }, [data])

  // Функция для определения границ семестра
  const getSemesterBoundaries = () => {
    
    const  startYear = yearForm
	const  endYear = yearForm ? yearForm+1 : 2099;
    let startDate, endDate;
    if (semestrForm === 1) {
      // Первый семестр: 1 сентября - 31 января
      startDate = dayjs(`${startYear}-09-01`);
      endDate = dayjs(`${endYear}-01-31`);
    } else {
      // Второй семестр: 1 февраля - 30 июня
      startDate = dayjs(`${endYear}-02-01`);
      endDate = dayjs(`${endYear}-06-30`);
    }
    
    return { startDate, endDate };
  };

  // Создаем функцию disabledDate на основе границ семестра
  const disabledDate = (current:any) => {
    const { startDate, endDate } = getSemesterBoundaries();
    // Блокируем даты вне текущего семестра
    return current && (current.isBefore(startDate, 'day') || current.isAfter(endDate, 'day'));
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
    setDate(dateString)
    setDataSource([])
  }

  return (
    <>
      <Spin spinning={isFetching}>
        <Space direction="vertical">
          <Text className=''>{t('textLessonLog2')}</Text>
          <ConfigProvider locale={i18n.language === 'ru' ? ru_RU : en_US}>
            <DatePicker 
              className='mb-4 mt-2' 
              onChange={onChange} 
              format="DD.MM.YYYY"
              disabledDate={disabledDate}
            />
          </ConfigProvider>
          {dataSource?.map((item: any) => {
            return <div key={`${item.groupId}-${date}`}>
              <JournalPosTable 
                date={date} 
                groupId={item.groupId} 
                description={item?.subjectName} 
                fixDay={item?.fixDay} 
                time={item?.time} 
                timeId={item?.timeId} 
                title={item?.groupName} 
                data={item.students} 
              />
            </div>
          })}
        </Space>
      </Spin>
      {isSuccess && !isFetching && date && data?.length === 0 ? <Title className='animate-fade-in' level={4}>{t('noData')}</Title> : ''}
    </>
  )
}

export default JournalPosDay
