import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Text } = Typography;

const ErrorFallback = () => (
  <Result
    status="error"
    title="Произошла ошибка"
    subTitle="Пожалуйста, перезагрузите страницу. Если ошибка останется - обратиться к тех.поддержке"
    extra={[
      <Link to={'/user'} >
        Вернуться на главную страницу
      </Link>,
     
    ]}
  >
    
  </Result>
);

export default ErrorFallback;