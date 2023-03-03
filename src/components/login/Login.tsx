import { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import styles from "./Login.module.scss";
import CircleSVG from "../../assets/svg/CircleSVG";

const { Title } = Typography;

export const Login: FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className={styles.main}>
      <div className={styles.svg}>
        <CircleSVG />
      </div>
      <Form
        name="login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div className={styles.wrapper}>
          <div className={styles.switcher}>
            <span>EN </span>
            <span className={styles.select}>РУС</span>
          </div>
        </div>

        <Title className={styles.title}>Авторизация</Title>

        <Form.Item
          name="username"
          rules={[
            { type: "email" },
            { required: true, message: "Please input your Email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            size="large"
            placeholder="Логин / Email"
            className={styles.test}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            size="large"
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Link to={""}>Не помню пароль</Link>

        <Form.Item>
          <div className={styles.buttons}>
            <Button size="large" type="primary" htmlType="submit">
              Войти
            </Button>
            <span>
              Нет профиля? <Link to="/registration">Зарегистрируйтесь</Link>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
