import { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import styles from "./Login.module.scss";
import CircleSVG from "../../assets/svg/CircleSVG";
import { ILoginRequest } from "../../api/auth/types";
import { useAppDispatch } from "../../store";
import { loginUser } from "../../store/auth/actionCreators";
import axios from "axios";

const { Title } = Typography;

export const Login: FC = () => {
  const dispatch = useAppDispatch();

  async function name() {
    const data = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "ayaz@gmail.com",
        password: "ayaz2002",
      }),
    });
    console.log("data", data);
  }

  const onFinish = (values: ILoginRequest) => {
    console.log("Received values of form: ", values);
    name();
    dispatch(loginUser({ ...values }));
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
