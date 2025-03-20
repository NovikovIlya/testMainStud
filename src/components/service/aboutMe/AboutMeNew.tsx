import { useTranslation } from 'react-i18next';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Form, Row, Tooltip } from 'antd';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import UploadAvatar from './UploadAvatar';
import TextArea from 'antd/es/input/TextArea';


const AboutMeNew = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ content: 'sss' });
  }, [form]);

  const onFinish = (values: any) => {
    console.log('Отправка:', values);
  };

  const handleSubmit = (values: { content: string }) => {
    // Обработка отправки формы
  };



  return (
    <div className="px-[50px] pt-[60px] mb-[50px]">
      {/* Секция с основной информацией */}
      <div className="bg-white rounded-xl shadow-md">
        <Row>
          <Col span={12}>
            <div className="flex flex-wrap justify-center p-[40px]">
              <UploadAvatar />
              <div className="w-full text-center">{t('fullName')}</div>
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-wrap justify-start p-[40px]">
              <Descriptions column={1} title={t('generalInfo')}>
                <Descriptions.Item label={t('birthDate')}>Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label={t('gender')}>1810000000</Descriptions.Item>
                <Descriptions.Item label={t('citizenshipType')}>Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label={t('citizenshipCountry')}>empty</Descriptions.Item>
                <Descriptions.Item label={t('birthPlace')}>No. 18,</Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
      </div>

      {/* Секция пользовательского соглашения */}
      <div className="bg-white rounded-xl shadow-md mt-7">
        <Row>
          <Col span={24}>
            <div className="flex flex-wrap justify-start p-6">
              <div className="flex items-center gap-2">
                <Title className="!mb-0" level={5}>
                  {t('userAgreement')}
                </Title>
                <Tooltip title={t('agreementTooltip')}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
              <Divider />

              <Form className='' onFinish={onFinish}>
                <Form.Item className='mb-[20px]' name="codex" valuePropName="checked" label={null}>
                  <Checkbox >
                    {t('codexAgreement')}
                    <a className='underline ml-1' href="https://kpfu.ru/portal/docs/F1769183796/Kodeks.etiki.obuch_sya.pdf" target="_blank" rel="noopener noreferrer">
                      {t('codexAgreement2')}
                    </a>
                  </Checkbox>
                </Form.Item>
                <Form.Item className='mb-[20px]' name="library" valuePropName="checked" label={null}>
                  <Checkbox>
                    {t('libraryRegulations')}
                    <a className='underline ml-1' href="https://kpfu.ru/library/obschie-polozheniya-iz-pravil-polzovaniya" target="_blank" rel="noopener noreferrer">
                      {t('libraryRegulations2')}
                    </a>
                  </Checkbox>
                </Form.Item>
                <Form.Item className='mb-[20px]' name="approve" valuePropName="checked" label={null}>
                  <Checkbox>
                 
                    <a className='underline ml-1' href="https://shelly.kpfu.ru/e-ksu/docs/F_437732066/prikaz_soglashenie_na_PEP211_docx_18_05_2022.docx" target="_blank" rel="noopener noreferrer">
                      {t('generalAgreement')}
                    </a>
                    {t('generalAgreement2')}
                    </Checkbox>
                </Form.Item>
                <Form.Item className='mb-[20px]' name="sogl" valuePropName="checked" label={null}>
                  <Checkbox>
                     {t('sogl')}
                      <a className='underline ' href="/Soglasie.docx" target="_blank" rel="noopener noreferrer">
                        {t('sogl2')}
                      </a>
                    </Checkbox>
                </Form.Item>
                <Form.Item className='mb-[20px]' name="oznak" valuePropName="checked" label={null}>
                  <Checkbox>
                    {t('politics')}
                    <a className='underline ml-1' href="/politika.pdf" target="_blank" rel="noopener noreferrer">
                      {t('politics2')}
                    </a>
                    </Checkbox>
                </Form.Item>
                <Form.Item className='mb-[24px]  !flex !items-start' name="razr" valuePropName="checked" label={null}>
                  <Checkbox  className='flex !items-start'>{t('razr')}</Checkbox>
                </Form.Item>
                <Form.Item className='mb-[5px] mt-[15px]'>
                  <Button type="primary" htmlType="submit">
                    {t('saveButton')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      {/* Секция бакалавриата */}
      <div className="bg-white rounded-xl shadow-md mt-7">
        <Row>
          <Col span={24}>
            <div className="flex flex-wrap justify-start p-6">
              <div className="flex items-center gap-2">
                <Title className="!mb-0" level={5}>
                  {t('bachelorsDegree')}
                </Title>
              </div>
              <Divider />
              
              <div className="flex flex-wrap justify-start">
                <Descriptions column={1} title="">
                  <Descriptions.Item label={t('insitute')}>2020</Descriptions.Item>
				          <Descriptions.Item label={t('specialization')}>Исскуство</Descriptions.Item>
                  <Descriptions.Item label={t('typeObr')}>ТЕСТ</Descriptions.Item>
                  <Descriptions.Item label={t('category')}>Бюджет</Descriptions.Item>
                 
                  <Descriptions.Item label={t('status')}>{t('activeStatus')}</Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Секция дополнительной информации */}
      <div className="bg-white rounded-xl shadow-md mt-7">
        <Row>
          <Col span={24}>
            <div className="flex flex-wrap justify-start p-6">
              <div className="flex items-center gap-2">
                <Title className="!mb-0" level={5}>
                  {t('additionalInfo')}
                </Title>
              </div>
              <Divider />
              
              <Form className='w-full' form={form} onFinish={handleSubmit}>
                <Form.Item className='' name="content" label="">
                  <TextArea className='' placeholder={t('aboutMePlaceholder')} />
                </Form.Item>
                <Button type='primary' htmlType="submit">{t('saveButton')}</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutMeNew;