import { FC, useState } from "react";
import { Button, Form, Input, Radio, RadioChangeEvent, Typography } from "antd";
import { Link } from "react-router-dom";

import styles from "./Login.module.scss";
import { ILoginRequest } from "../../api/auth/types";
import { useAppDispatch } from "../../store";
import { loginUser } from "../../store/auth/actionCreators";
import { GosSvg } from "./GosSvg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Title } = Typography;

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChangeRadio = (e: RadioChangeEvent) => setValue(e.target.value);

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
      <Form
        name="login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Title className={styles.title}>Авторизация</Title>
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
            <Input size="large" placeholder="Email" />
          </Form.Item>
        )}

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            className={styles.password}
            size="large"
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <p className={styles.forgot}>Не помню пароль</p>
        <Form.Item>
          <div className={styles.buttons}>
            <Button
              className={styles.login}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Войти
            </Button>

            <Button
              className={styles.gos}
              onClick={(e) => {
                e.preventDefault();
              }}
              size="large"
              type="primary"
              ghost
              htmlType="submit"
            >
              Войти через
              <GosSvg />
            </Button>
            <span className={styles.reg}>
              Нет профиля?{" "}
              <Link className={styles.link} to="/registration">
                Зарегистрируйтесь
              </Link>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
