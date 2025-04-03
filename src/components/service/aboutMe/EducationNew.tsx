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
      ыфвфыв
		</div>
	)
}

export default AboutMeNew
