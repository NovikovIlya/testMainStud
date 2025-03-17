import React from 'react'
import UploadAvatar from './UploadAvatar'
import { Checkbox, Col, Divider, Row } from 'antd'
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import Title from 'antd/es/typography/Title';

const AboutMeNew = () => {
  return (
    <div className='px-[50px] pt-[60px] mb-[50px]'>
        <div className='bg-white rounded-xl shadow-md'>
            
            <Row>
               <Col span={12}>
                    <div className='flex flex-wrap justify-center p-4'>
                        <UploadAvatar/>
                        <div className='w-full text-center'>ФИО</div>
                    </div>
                </Col> 
               <Col span={12}>
                  <div className='flex flex-wrap justify-start p-4'>
                     <Descriptions column={1} title="Общие сведения">
                        <Descriptions.Item label="Дата рождения">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="Пол">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Тип гражданства">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Страна гражданства">empty</Descriptions.Item>
                        <Descriptions.Item label="Место рождения">
                            No. 18, 
                        </Descriptions.Item>
                    </Descriptions>
                  </div>
               </Col>
            </Row>

            
        </div>

        <div className='bg-white rounded-xl shadow-md mt-7'>
        <Row >
              <Col span={24}>
                <div className='flex flex-wrap justify-start p-4'>
                  <Title level={5}>Контактная информация</Title>
                  <Divider/>
                  <Checkbox/>
                </div>
              </Col>
            </Row>
        </div>
        
    </div>
  )
}

export default AboutMeNew