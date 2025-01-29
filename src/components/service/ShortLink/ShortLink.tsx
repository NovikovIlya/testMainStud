import React, { useEffect, useState } from 'react'
import { useSendShortLinkMutation } from '../../../store/api/shortLink/ShortLinkApi'
import { Button, Form, Input } from 'antd'
import { Header } from '../../layout/Header'
import { useLocalStorageState } from 'ahooks'

const ShortLink = () => {
  const [form] = Form.useForm()
  const inputForm = Form.useWatch('input', form)
  const [sendShortLink,{data} ] = useSendShortLinkMutation()
  const [localData,setLocalData] = useLocalStorageState<any>('use-local-storage-state-demo1',
    {
      defaultValue: [{newUrl:'ss',oldUrl:'xx'}],
    }
  )

  useEffect(() => {
    if(data?.length){
      setLocalData([...localData,{newUrl:data,oldUrl:inputForm}])
    }
  },[data])

  console.log(
    `%c ${localData}`,
    "color: white; background: red; font-size: 18px; padding: 5px; border-radius: 5px;"
  );

  const onFinish = () => {
    sendShortLink({
        url: inputForm,
        format:'simple',
        action:'shorturl',
        username:'usr-kpfu',
        password:'pass-A7usj82ks'
    })
    form.resetFields()
  }

  return (
    <>
        <Header type={"service"} service={''}/>
        <div className='mt-[100px] p-24'>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name='input'>
                 <Input />
                </Form.Item>
                <Button htmlType="submit">Отправить</Button>
            </Form>
            <div className='mt-10'>
                {localData?.length ? localData.map((item:any)=>{
                    return <div key={item.newUrl}>{item.newUrl} - {item.oldUrl}</div>
                }) : ''}
            </div>
        </div>
    </>
  )
}

export default ShortLink