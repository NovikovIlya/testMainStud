import { FC, useState } from "react";
import {
  Button,
  Form,
  Checkbox,
  Input,
  Typography,
  Radio,
  RadioChangeEvent,
} from "antd";

import styles from "./Registration.module.scss";
import { Link } from "react-router-dom";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

const { Title } = Typography;

export const Registration: FC = () => {
  const [value, setValue] = useState(0);
  const [check, setCheck] = useState(false);

  const onChangeRadio = (e: RadioChangeEvent) => setValue(e.target.value);

  const onChangeCheckbox = (e: CheckboxChangeEvent) =>
    setCheck(e.target.checked);

  const onFinish = (values: any) => {
    if (check) console.log("Received values of form: ", values);
  };
  return (
    <div className={styles.main}>
      <Form
        name="login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Title className={styles.title}>Регистрация</Title>
          <Radio.Group
            onChange={onChangeRadio}
            defaultValue={0}
            size="large"
            className={styles.switcher}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>По Email</Radio.Button>
            <Radio.Button value={1}>По номеру телефона</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="surname"
          rules={[
            { type: "string" },
            { required: true, message: "Please input your Surname!" },
          ]}
        >
          <Input size="large" placeholder="Фамилия" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            { type: "string" },
            { required: true, message: "Please input your Name!" },
          ]}
        >
          <Input size="large" placeholder="Имя" />
        </Form.Item>
        {value ? (
          <Form.Item
            name="phone"
            rules={[
              { type: "string" },
              { required: true, message: "Please input your Phone!" },
            ]}
          >
            <Input size="large" type="tel" placeholder="Телефон" />
          </Form.Item>
        ) : (
          <Form.Item
            name="email"
            rules={[
              { type: "email" },
              { required: true, message: "Please input your Email!" },
            ]}
          >
            <Input size="large" placeholder="Электронная почта" />
          </Form.Item>
        )}

        <Form.Item
          className={styles.password}
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input size="large" type="password" placeholder="Пароль" />
        </Form.Item>

        <p className={styles.passwordText}>
          Пароль должен содержать от 8 символов, буквы верхнего и нижнего
          регистра, а также цифры
        </p>

        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your Password!" }]}
        >
          <Input size="large" type="password" placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item>
          <div className={styles.buttons}>
            <Button size="large" type="primary" htmlType="submit">
              Далее
            </Button>
            <Checkbox onChange={onChangeCheckbox} checked={check}>
              <p>
                Я принимаю пользовательское соглашение и даю разрешение порталу
                КФУ на обработку моих персональных данных в соотвествии с
                Федеральным законом №152-ФЗ от 27.07.2006 года “О персональных
                данных”
              </p>
            </Checkbox>
            <span>
              Уже есть профиль? <Link to="/login">Войдите</Link>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
