import React, { useEffect } from 'react'
import {
	Button, Form, Input, List,
	Skeleton, Spin
} from 'antd'
import { useSearchUserQuery } from '../../../../store/api/messages/messageApi'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'ahooks'

const SearchComponent = ({onSearchResults,searchEmpty} :any) => {
  const [form] = Form.useForm()
  const value = Form.useWatch('input', form)
  const {t} = useTranslation()

  const debouncedValue = useDebounce(value, { wait: 1000 })
  const {data:dataSearch} = useSearchUserQuery({name:debouncedValue,page:0,size:15},{skip:!debouncedValue})
  console.log('dataSearch',dataSearch)
  console.log('value',value)

  useEffect(() => {
    if ( dataSearch) {
      onSearchResults(dataSearch);
    }
  }, [dataSearch,onSearchResults]);

  if(value?.length!==0){
    searchEmpty(false)
  }

  if(value?.length===0){
    searchEmpty(true)
  }
    
  return (
    <Form form={form} className='m-0 p-0'>
      <Form.Item  className='p-0 m-0' name={'input'}>
        <div className="p-4">
            <Input  allowClear  placeholder={t('searchMEssage')} prefix={<SearchOutlined />} />
        </div>
      </Form.Item>
    </Form>
  )
}

export default SearchComponent