import { FC, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";

import styles from "./Login.module.scss";
import CircleSVG from "../../assets/svg/CircleSVG";
import CloseSVG from "../../assets/svg/CloseSVG";
import { IUser } from "../../models/user.interface";

const { Title } = Typography;

export const Login: FC = () => {
  const onFinish = (values: IUser) => {
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
          <CloseSVG />
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

        <a href="">Не помню пароль</a>

        <Form.Item>
          <div className={styles.buttons}>
            <Button size="large" type="primary" htmlType="submit">
              Войти
            </Button>
            <span>
              Нет профиля? <a href="/registration">Зарегистрируйтесь</a>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
