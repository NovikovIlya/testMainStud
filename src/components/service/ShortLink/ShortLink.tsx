import React, { useEffect, useState } from 'react'
import { useSendShortLinkMutation } from '../../../store/api/shortLink/ShortLinkApi'
import { Button, Form, Input, Spin } from 'antd'
import { Header } from '../../layout/Header'
import { useLocalStorageState } from 'ahooks'
import { LinkOutlined } from '@ant-design/icons'

const ShortLink = () => {
  const [form] = Form.useForm()
  const inputForm = Form.useWatch('input', form)
  const [sendShortLink,{data,isLoading,isSuccess} ] = useSendShortLinkMutation()
  const [localData,setLocalData] = useLocalStorageState<any>('use-local-storage-state-demo1',
    {
      defaultValue: [{newUrl:'ss',oldUrl:'xx'}],
    }
  )

  // useEffect(() => {
  //   if(isSuccess){
  //     console.log('111',data)
  //     setLocalData([...localData,{newUrl:data,oldUrl:inputForm}])
  //   }
  // },[data,isSuccess])

  // console.log(
  //   `%c ${localData}`,
  //   "color: white; background: red; font-size: 18px; padding: 5px; border-radius: 5px;"
  // );

  const onFinish = () => {
    sendShortLink({
        url: inputForm,
        format:'simple',
        action:'shorturl',
        username:'usr-kpfu',
        password:'pass-A7usj82ks'
    }).unwrap().then((res=>{
      console.log(res)
      setLocalData([...localData,{newUrl:res,oldUrl:inputForm}])
    }))
  
    form.resetFields()
  }

  return (
    <>
    <Header type="service" service="" />
    <Spin spinning={isLoading}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto pt-[100px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <LinkOutlined className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              URL Shortener
            </h1>
            <p className="text-lg text-gray-600">
              Transform your long URLs into short, memorable links
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
                  placeholder="Paste your long URL here..."
                  className="rounded-lg"
                />
              </Form.Item>
              <Button
                htmlType="submit"
                size="large"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg h-12"
              >
                Shorten URL
              </Button>
            </Form>
          </div>

          {localData?.length > 1 && (
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <LinkOutlined className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Recent Links
                </h2>
              </div>
              <div className="space-y-4">
                {localData.slice(1).map((item: any) => (
                  <div
                    key={item.newUrl}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500 truncate">
                        {item.oldUrl}
                      </p>
                      <a
                        href={item.newUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 font-medium truncate flex items-center gap-1"
                      >
                        {item.newUrl}
                        <LinkOutlined className="w-4 h-4" />
                      </a>
                    </div>
                    <Button
                      type="text"
                      className="text-gray-600 hover:text-indigo-600"
                      onClick={() => navigator.clipboard.writeText(item.newUrl)}
                    >
                      Copy
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Spin>
  </>
  )
}

export default ShortLink