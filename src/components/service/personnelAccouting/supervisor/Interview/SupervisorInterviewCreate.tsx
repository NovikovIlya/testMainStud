import React, {useState} from 'react';
import {Button, Form, Select, DatePicker, TimePicker, Modal, ConfigProvider} from "antd"
import {useGetSupervisorVacancyQuery,
        useRequestCreateInterviewMutation,
        useLazyGetResponcesByVacancyQuery,
        useLazyGetVacancyGroupedResponcesQuery
} from "../../../../../store/api/serviceApi";

export const SupervisorInterviewCreate = () => {

    const [requestCreateInterview] = useRequestCreateInterviewMutation()

    const { data: vacancies = [] } = useGetSupervisorVacancyQuery()

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    const [isUnsuccessModalOpen, setIsUnsuccessModalOpen] = useState(false)

    const [getGroupedResponds] = useLazyGetVacancyGroupedResponcesQuery()
    const [getResponds] = useLazyGetResponcesByVacancyQuery()

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
                    }
                }}
            >
                <Modal
                    bodyStyle={{ padding: 53 }}
                    centered
                    open={isSuccessModalOpen}
                    onCancel={() => {
                        setIsSuccessModalOpen(false)
                    }}
                    title={null}
                    footer={null}
                    width={407}
                >
                    <p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
                        Собеседование успешно назначено.
                    </p>
                    <div className="mt-[40px] flex gap-[12px]">
                        <Button
                            className="ml-auto mr-auto"
                            type="primary"
                            onClick={() => {
                                setIsSuccessModalOpen(false)
                            }}
                        >
                            ОК
                        </Button>
                    </div>
                </Modal>
                <Modal
                    bodyStyle={{ padding: 53 }}
                    centered
                    open={isUnsuccessModalOpen}
                    onCancel={() => {
                        setIsUnsuccessModalOpen(false)
                    }}
                    title={null}
                    footer={null}
                    width={407}
                >
                    <p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
                        Произошла ошибка или нет ответа от сервера.
                    </p>
                    <div className="mt-[40px] flex gap-[12px]">
                        <Button
                            className="ml-auto mr-auto"
                            type="primary"
                            onClick={() => {
                                setIsUnsuccessModalOpen(false)
                            }}
                        >
                            ОК
                        </Button>
                    </div>
                </Modal>
            </ConfigProvider>
            <div className="w-[40%] pl-[54px] pr-[54px] pt-[120px] bg-content-gray">
                <h1 className="mb-[50px] font-content-font font-normal text-[28px]/[28px] text-black">
                    Назначить собеседование
                </h1>
                <Form
                    layout="vertical"
                    requiredMark={false}
                    onFinish={values => {
                        requestCreateInterview({
                            date: values.date,
                            format: values.format,
                            respondId: 1
                        })
                            .unwrap()
                            .then(() => {
                                setIsSuccessModalOpen(true);
                            })
                            .catch(() => {
                                setIsUnsuccessModalOpen(true);
                            });
                    }}
                >
                    <Form.Item
                        name={'seeker_name'}
                        label={
                            <label className="text-black opacity-[80%] text-[18px]/[18px] font-content-font font-normal">
                                Соискатель
                            </label>
                        }
                        rules={[{required: true, message: 'не выбран соискатель'}]}
                    >
                        <Select
                            placeholder="Иванов Иван Иванович"
                            options={[
                                {value: '1', label: 'Илья Митрофанов'},
                                {value: '2', label: 'Воронов Евгений Петрович'},
                                {value: '3', label: 'Воронов Евгений Петрович'}
                            ]}
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        name={'post'}
                        label={
                            <label className="text-black opacity-[80%] text-[18px]/[18px] font-content-font font-normal">
                                Должность
                            </label>
                        }
                        rules={[{required: true, message: 'не указана должность'}]}
                    >
                        <Select
                            placeholder="Специалист по связям с общественностью"
                            options={[
                                {value: '1', label: 'Повар'},
                                {value: '2', label: 'Специалист по связям с общественностью'},
                                {value: '3', label: 'Специалист по связям с общественностью'}
                            ]}
                        ></Select>
                    </Form.Item>
                    <div className="flex flex-row w-full gap-[20px]">
                        <Form.Item
                            className="w-6/12"
                            name={'date'}
                            label={
                                <label className="opacity-[80%] text-black text-[18px]/[18px] font-content-font font-normal">
                                    Дата
                                </label>
                            }
                            rules={[{required: true, message: 'Не указаны дата и время'}]}
                        >
                            <DatePicker
                              format={'DD.MM.YYYY, h:mm'}
                              showTime={{
                                minuteStep: 15,
                                disabledHours: () => {
                                  return [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23]
                                },
                                hideDisabledOptions: true
                              }}
                              className="w-full"
                              onChange={(e, dateString) => {
                                console.log(e)
                                console.log(dateString)
                              }}
                                placeholder="Выбрать">

                            </DatePicker>
                        </Form.Item>
                        <Form.Item
                            className="w-6/12"
                            name={'format'}
                            label={
                                <label className="opacity-[80%] text-black text-[18px]/[18px] font-content-font font-normal">
                                    Формат
                                </label>
                            }
                            rules={[{required: true, message: 'Не указан формат'}]}
                        >
                            <Select
                                placeholder="-"
                                options={[
                                    {value: 'ONLINE', label: 'Оффлайн'},
                                    {value: 'OFFLINE', label: 'Онлайн'},
                                ]}
                            ></Select>
                        </Form.Item>
                    </div>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="rounded-[30px] w-[121px]"
                      htmlType="submit">
                      Создать
                    </Button>
                  </Form.Item>
                </Form>
            </div>
        </>
    );
};