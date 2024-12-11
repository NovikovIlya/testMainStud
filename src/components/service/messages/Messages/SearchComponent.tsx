import React, { useEffect } from 'react'
import {
	Button, Form, Input, List,
	Skeleton, Spin
} from 'antd'
import { useSearchUserQuery } from '../../../../store/api/messages/messageApi'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'ahooks'

const SearchComponent = ({searchEmpty,onDebouncedValueChange} :any) => {
  const [form] = Form.useForm()
  const value = Form.useWatch('input', form)
  const {t} = useTranslation()
  const debouncedValue = useDebounce(value, { wait: 500 })
 
  console.log('value',value)

  useEffect(() => {
    onDebouncedValueChange(debouncedValue || '');
  }, [debouncedValue, onDebouncedValueChange]);

  const handleInputChange = (e:any) => {
    const inputValue = e.target.value;
    if (inputValue) {
      searchEmpty(false);
    } else {
      searchEmpty(true);
    }
  };
    
  return (
    <Form form={form} className='m-0 p-0'>
      <Form.Item  className='p-0 m-0' name={'input'}>
        <div className="p-4">
            <Input allowClear   onChange={handleInputChange} placeholder={t('searchMEssage')} prefix={<SearchOutlined />} />
        </div>
      </Form.Item>
    </Form>
  )
}

export default SearchComponent