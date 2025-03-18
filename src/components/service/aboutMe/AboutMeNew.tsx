import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Row, Tooltip } from 'antd'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'

import UploadAvatar from './UploadAvatar'
import TextArea from 'antd/es/input/TextArea'

const AboutMeNew = () => {
  const [form] = Form.useForm();

  useEffect(() => {
        form.setFieldsValue({ content: 'sss' }); // Установка значения в форму
        // setLoading(false);
  }, [form]);
  
  const onFinish = (values: any) => {
    // values содержит { checkboxes: [...] }
    console.log('Отправка:', values);
  };

  const handleSubmit = (values: { content: string }) => {
   
  };


	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className="bg-white rounded-xl shadow-md">
				<Row>
					<Col span={12}>
						<div className="flex flex-wrap justify-center p-4">
							<UploadAvatar />
							<div className="w-full text-center">ФИО</div>
						</div>
					</Col>
					<Col span={12}>
						<div className="flex flex-wrap justify-start p-4">
							<Descriptions column={1} title="Общие сведения">
								<Descriptions.Item label="Дата рождения">Zhou Maomao</Descriptions.Item>
								<Descriptions.Item label="Пол">1810000000</Descriptions.Item>
								<Descriptions.Item label="Тип гражданства">Hangzhou, Zhejiang</Descriptions.Item>
								<Descriptions.Item label="Страна гражданства">empty</Descriptions.Item>
								<Descriptions.Item label="Место рождения">No. 18,</Descriptions.Item>
							</Descriptions>
						</div>
					</Col>
				</Row>
			</div>

			<div className="bg-white rounded-xl shadow-md mt-7">
				<Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-4">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									Пользовательское соглашение
								</Title>
								<Tooltip title="prompt text">
									<QuestionCircleOutlined />
								</Tooltip>
							</div>
							<Divider />

							<Form onFinish={onFinish}>
								<Form.Item name="codex" valuePropName="checked" label={null}>
									<Checkbox  >Ознакомлен с “Кодексом этики обучающегося КФУ”</Checkbox>
								</Form.Item>
                <Form.Item name="library" valuePropName="checked" label={null}>
									<Checkbox  >Ознакомлен с “Общими положениями из правил библиотеки”</Checkbox>
								</Form.Item>
                <Form.Item name="approve" valuePropName="checked" label={null}>
									<Checkbox  >Принимаю соглашение между участниками электронного взаимодействия и подтверждаю, что ознакомлен с условиями данного соглашения</Checkbox>
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Col>
				</Row>
			</div>

      <div className="bg-white rounded-xl shadow-md mt-7">
      <Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-4">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									Бакалавриат
								</Title>
								
							</div>
							<Divider />
              
              <div className="flex flex-wrap justify-start p-4">
							<Descriptions column={1} title="">
								<Descriptions.Item label="Дата рождения">Zhou Maomao</Descriptions.Item>
								<Descriptions.Item label="Пол">1810000000</Descriptions.Item>
								<Descriptions.Item label="Тип гражданства">Hangzhou, Zhejiang</Descriptions.Item>
								<Descriptions.Item label="Страна гражданства">empty</Descriptions.Item>
								<Descriptions.Item label="Место рождения">No. 18,</Descriptions.Item>
							</Descriptions>
						</div>
							
						</div>
					</Col>
				</Row>
      </div>





      <div className="bg-white rounded-xl shadow-md mt-7">
      <Row>
					<Col span={24}>
						<div className="flex flex-wrap justify-start p-4">
							<div className="flex items-center gap-2">
								<Title className="!mb-0" level={5}>
									Дополнительная информация
								</Title>
								
							</div>
							<Divider />
              
              <Form className='w-full' form={form} onFinish={handleSubmit}>
               <Form.Item className='' name="content" label="">
                <TextArea className='' placeholder='Расскажите о себе' />
               </Form.Item>
               <Button type='primary' htmlType="submit">Сохранить</Button>
              </Form>
							
						</div>
					</Col>
				</Row>
      </div>
		</div>
	)
}

export default AboutMeNew
