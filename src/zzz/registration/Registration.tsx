import { FC } from 'react';
import { Button, Form, Input, Typography } from 'antd';

import styles from './Registration.module.scss';
import CircleSVG from '../../assets/svg/CircleSVG';
import CloseSVG from '../../assets/svg/CloseSVG';

import { useDispatch } from 'react-redux';
import { Reg } from '../../Store/Slice';
import { RegResponse } from '../../models/response/RegResponse';

const { Title } = Typography;

export const Registration: FC = () => {
  let data: RegResponse = {
    lastName: '',
    firstName: '',
    middleName: '',
    registrationPurposeCode: 11,
    agreement: true,
    phone: '',
    password: '',
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const dispath = useDispatch();

  const Reg_Person = () => {
    dispath(Reg(data));
  };

  return (
    <div className={styles.main}>
      <div className={styles.svg}>
        <CircleSVG />
      </div>
      <Form
        name='login'
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div className={styles.wrapper}>
          <div className={styles.switcher}>
            <span>EN </span>
            <span className={styles.select}>РУС</span>
          </div>
          <CloseSVG />
        </div>

        <Title className={styles.title}>Регистрация</Title>

        <Form.Item
          name='surname'
          rules={[{ type: 'string' }, { required: true, message: 'Please input your Surname!' }]}
        >
          <Input size='large' placeholder='Фамилия' />
        </Form.Item>

        <Form.Item
          name='name'
          rules={[{ type: 'string' }, { required: true, message: 'Please input your Name!' }]}
        >
          <Input size='large' placeholder='Имя' />
        </Form.Item>
        <Form.Item
          name='username'
          rules={[{ type: 'email' }, { required: true, message: 'Please input your Email!' }]}
        >
          <Input size='large' placeholder='Логин / Email' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input size='large' type='password' placeholder='Пароль' />
        </Form.Item>
        <Form.Item>
          <div className={styles.buttons}>
            <Button size='large' type='primary' htmlType='submit'>
              Войти
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
