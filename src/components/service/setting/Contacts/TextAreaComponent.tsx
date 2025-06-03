import { Button, Form, Input, Spin } from 'antd'
import { t } from 'i18next'

import React, { useEffect } from 'react'
import { useGetSocialNetworksQuery, useUpdateSocialNetworksMutation } from '../../../../store/api/aboutMe/forAboutMe'
import { message } from 'antd'

const { TextArea } = Input

const TextAreaComponent = () => {
	const [form] = Form.useForm()
  const { data: dataSocial, isLoading } = useGetSocialNetworksQuery()
  const [updateSocial, { isLoading: isUpdating }] = useUpdateSocialNetworksMutation()

  // Заполняем форму данными при их получении
  useEffect(() => {
    if (dataSocial) {
      form.setFieldsValue({
        vk: dataSocial.vk || '',
        telegram: dataSocial.telegram || '',
        rutube: dataSocial.rutube || '',
        odnoklassniki: dataSocial.odnoklassniki || '',
        dzen: dataSocial.dzen || ''
      })
    }
  }, [dataSocial, form])

	const onSubmit = async (values:any) => {
    try {
      await updateSocial(values).unwrap()
      // message.success('Социальные сети успешно обновлены')
    } catch (error) {
      message.error('Ошибка при обновлении социальных сетей')
      console.error('Ошибка обновления:', error)
    }
  }

	return (
		<Form form={form} onFinish={onSubmit}>
      <Spin spinning={isLoading || isUpdating}>
			<section className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="p-6">
					<div className="mb-4 !text-[16px] font-bold">Соц сети:</div>

          <div className="mb-4 !text-[16px] ">Vk.com:</div>
					<Form.Item name="vk" noStyle>
						<TextArea maxLength={1000} rows={3} className='mb-8'/>
					</Form.Item>

          <div className="mb-4 !text-[16px] ">Telegram</div>
					<Form.Item name="telegram" noStyle>
						<TextArea maxLength={1000}  rows={3} className='mb-8'/>
					</Form.Item>

          <div className="mb-4 !text-[16px] ">Rutube</div>
					<Form.Item name="rutube" noStyle>
						<TextArea maxLength={1000}  rows={3} className='mb-8'/>
					</Form.Item>

          <div className="mb-4 !text-[16px] ">Однолкассники</div>
					<Form.Item name="odnoklassniki" noStyle>
						<TextArea maxLength={1000}  rows={3} className='mb-8'/>
					</Form.Item>

            <div className="mb-4 !text-[16px] ">Яндекс Дзен</div>
					<Form.Item name="dzen" noStyle>
						<TextArea maxLength={1000}  rows={3} className='mb-8'/>
					</Form.Item>

          <Button  type="primary" htmlType="submit" className="rounded-lg" loading={isUpdating}>
						{t('save')}
					</Button>
				</div>
			</section>
      </Spin>
		</Form>
	)
}

export default TextAreaComponent
