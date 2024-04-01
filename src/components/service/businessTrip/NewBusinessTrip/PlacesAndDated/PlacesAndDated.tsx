import React, {ReactNode, useState} from 'react';
import {AutoComplete, Button, Col, ConfigProvider, DatePicker, Form, Input, Radio, Row, Upload} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {UploadFileSvg} from "../../../../../assets/svg/UploadFileSvg";
import dayjs from "dayjs";
import {PlusSvg} from "../../../../../assets/svg/PlusSvg";
import {useDispatch} from "react-redux";
import {keysTabsBusinessTrip, setCondition} from "../../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {NewOrganization} from "./NewOrganization";


const optionsGoals = [
    {value: 'Административный визит'},
    {value: 'Выполнение научно-исследовательской работы'},
    {value: 'Повышение квалификации, переподготовка'},
    {value: 'Профориентационная работа'},
    {value: 'Сбор учебно-методического материала'},
    {value: 'Сопровождение учащихся на различные мероприятия'},
    {value: 'Стажировка (научная)'},
    {value: 'Стажировка (образовательная)'},
    {value: 'Участие в выставке (без экспоната)'},
    {value: 'Участие в выставке (с экспонатом)'},
    {value: 'Участие в конференции (без доклада)'},
    {value: 'Участие в конференции (с докладом)'},
    {value: 'Участие в мероприятиях по привлечению студентов'},
    {value: 'Участие в симпозиуме, семинаре и т.п. (без доклада)'},
    {value: 'Участие в симпозиуме, семинаре и т.п. (с докладом)'},
    {value: 'Чтение лекций, проведение семинаров, практических занятий, мастер-классов, проведение консультаций'},
];

const optionsTypeDocuments = [
    {value: 'Тип документа 1'},
    {value: 'Тип документа 2'},
    {value: 'Тип документа 3'},
];

interface IFormOrganization {
    id: number
    formOrg: ReactNode
}

export const PlacesAndDated = () => {
    const dispatch = useDispatch()

    //нужно отрефакторить код добавления формы, т.к после
    //добавления и сохранения их нужно будет откуда-то вытаскивать
    //Нужно обсудить данный вопрос с бэком
    const [listOrg, setListOrg] = useState<IFormOrganization[]>([
        {id: 1, formOrg: <NewOrganization/>},
    ])

    return (
        <Form layout={'vertical'}>
            <Row
                gutter={[16, 0]}
                className={`
                w-[80%]
                `}
            >
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Цель'}/>}>
                        <AutoComplete options={optionsGoals} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Мероприятие'}/>}>
                        <Input className={'text-base'} placeholder={'Ввести'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Тип документа-основания'}/>}>
                        <AutoComplete options={optionsTypeDocuments} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Прикрепить документ'}/>}>
                        <Upload.Dragger name={'file'} multiple={true}>
                            <div className={`
                            flex 
                            flex-col 
                            gap-2`}>
                                <span className={'text-lg'}>Перетащите файлы или выберите на компьютере</span>
                                <div className={`
                                flex 
                                items-center 
                                justify-center 
                                gap-2`}>
                                    <UploadFileSvg/>
                                    <span className={`
                                    text-lg 
                                    mb-0.5 
                                    text-[#3073D7]`}>Выбрать файл</span>
                                </div>
                            </div>
                        </Upload.Dragger>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Командировка в России'}/>}>
                        <Radio.Group>
                            <Radio value={'Да'}>Да</Radio>
                            <Radio value={'Нет'}>Нет</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>


            </Row>



            <Row gutter={[16, 0]} className={`w-[87%]`}>
                {/*Нужно отрефакторить*/}

                {
                    listOrg.map((elem) => (
                        <NewOrganization key={elem.id}/>
                    ))
                }



                <Col span={13}>
                    <div className={`
                        flex
                        gap-4
                    `}>
                        <Button
                            icon={<PlusSvg/>}
                            type={'primary'}
                            className={`
                                h-[32px]
                                rounded-full
                            `}
                            onClick={() => {
                                setListOrg([
                                    ...listOrg,
                                    {
                                        id: 2,
                                        formOrg: <NewOrganization/>
                                    }
                                ])
                            }}
                        >
                        </Button>
                        <span className={`
                            text-[#B3B3B3]
                            text-lg
                        `}>
                            Добавить организацию
                        </span>
                    </div>
                </Col>

                <Col span={13}>
                    <Button
                        className={`
                            mt-5
                            rounded-[40px]
                            h-[40px]
                            
                            `}
                        type={'primary'}
                        onClick={() => {
                            dispatch(setCondition(keysTabsBusinessTrip.travelConditions))
                        }}
                    >
                    <span className={`
                            text-lg
                        `}>
                        Далее
                    </span>
                    </Button>
                </Col>

            </Row>

        </Form>
    );
};

