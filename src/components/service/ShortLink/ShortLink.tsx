import React, { useEffect, useState } from 'react'
import { useSendShortLinkMutation } from '../../../store/api/shortLink/ShortLinkApi'
import { Button, Form, Input, List, message, Spin, Typography } from 'antd'
import { Header } from '../../layout/Header'
import { useLocalStorageState } from 'ahooks'
import { ArrowRightOutlined, CopyOutlined, LinkOutlined } from '@ant-design/icons'
const { Text } = Typography
const ShortLink = () => {
  const [form] = Form.useForm()
  const inputForm = Form.useWatch('input', form)
  const [sendShortLink,{data,isLoading,isSuccess} ] = useSendShortLinkMutation()
  const [localData,setLocalData] = useLocalStorageState<any>('use-local-storage-state-demo1',
    {
      defaultValue: [],
    }
  )

  useEffect(() => {
    if(isSuccess){
      console.log('111',data)
      console.log('222',inputForm)
      setLocalData([
        {newUrl: data.newUrl,
          oldUrl:inputForm
        },
        ...localData
       
      ])
      form.resetFields()
    }
  },[data,isSuccess])

 

  const onFinish = () => {
    sendShortLink({
        url: inputForm,
        format:'simple',
        action:'shorturl',
        username:'usr-kpfu',
        password:'pass-A7usj82ks'
    }).unwrap().then((res=>{
      // console.log('reeeeeees',res)
      // setLocalData([...localData,{newUrl:res,oldUrl:inputForm}])
    }))
  
    
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success("Ссылка скопирована в буфер обмена!")
    })
  }

  return (
    <>
    <Header type="service" service="" />
    <Spin spinning={isLoading}>
      <div className="w-full">
        <div className="  pt-[100px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <img className='w-[100px] h-[100px]' src='https://cdn-icons-png.flaticon.com/512/6994/6994770.png'/>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-8">
              Сократитель ссылок
            </h1>
            <p className="text-lg text-gray-600">
              Сократите ссылки с помощью нашего сервиса.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
            <Form
              form={form}
              onFinish={onFinish}
              className="space-y-4"
            >
              <Form.Item name="input" className="mb-6">
                <Input 
                  size="large"
                  placeholder="Вставьте ссылку для сокращения"
                  className="rounded-lg"
                />
              </Form.Item>
              <Button
                htmlType="submit"
                size="large"
                type='primary'
            
                className="w-full  font-semibold rounded-lg h-12"
              >
                Получить короткую ссылку
              </Button>
              <Button 
               size="large"
                className="w-full  font-semibold rounded-lg h-12"
              onClick={()=>{
                setLocalData([])
              }}>
                Очистить список
              </Button>
            </Form>
          </div>


          <div className="bg-white rounded-xl shadow-xl p-8 mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">История сокращений</h2>
              <List
                itemLayout="horizontal"
                dataSource={localData}
                renderItem={(item: { oldUrl: string; newUrl: string }, index: number) => (
                  <List.Item key={index} className="flex items-center py-4 border-b last:border-b-0">
                    <div className="flex-grow">
                      <Text className="text-gray-600 mb-1 block" >
                        <LinkOutlined className="mr-2 text-indigo-600" />
                        {item.oldUrl}
                      </Text>
                      <Text className="text-indigo-600 font-medium block" >
                        <ArrowRightOutlined className="mr-2" />
                        {item.newUrl}
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(item.newUrl)} className="ml-4">
                        Копировать
                      </Button>
                      <Button onClick={()=>{
                        setLocalData((prev:any)=>prev.filter((item:any,i:any)=>i!==index))
                      }} >Удалить</Button>
                    </div>
                  </List.Item>
                )}
              />
            </div>

          

       
        </div>
      </div>
    </Spin>
  </>
  )
}

export default ShortLink