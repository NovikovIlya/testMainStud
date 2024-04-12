import React from 'react';
import {Button, Col, Form, Input, Radio, Row, Select, Upload} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {UploadFileSvg} from "../../../../../assets/svg/UploadFileSvg";
import {useDispatch} from "react-redux";
import {keysTabsBusinessTrip, setCondition} from "../../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {INewOrganization, NewOrganization} from "./NewOrganization";
import {validateMessages} from "../../../../../utils/validateMessage";
import {RcFile} from "antd/es/upload";
import {setPlaceAndDateItemTabs} from "../../../../../store/reducers/FormReducers/ItemTabs";


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
    {value: 'Приказ'},
    {value: 'Приглашение'},
    {value: 'Служебная записка'},
    {value: 'План-график'},
    {value: 'Иной документ'},
];

interface IFormPlacesAndDate {
    goal: string
    event: string
    typeDocument: string
    file?: RcFile | Blob
    isRussia: string
    organisations: Array<INewOrganization>
}


export const PlacesAndDated = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    function sendDataFormPlaceAndDate(values: IFormPlacesAndDate) {
        //1) собираем только организации
        const onlyOrganisations = values.organisations

        for (let org of onlyOrganisations) {
            //2) вычисляем, сколько дней человек будет в командировке в данной организации
            if (org.dateStartEnd) {
                const sumDayOrg = org.dateStartEnd[1]!.diff(org.dateStartEnd[0], 'day') + 1

                //3) добавляем количество дней в объект данной организации
                org.sumDay = sumDayOrg
            }

        }
        console.log(values)
        //dispatch(setCondition(keysTabsBusinessTrip.travelConditions))
        dispatch(setPlaceAndDateItemTabs(true))
    }


    return (
        <Form layout={'vertical'}
              validateMessages={validateMessages}
              form={form}
              onFinish={values => {sendDataFormPlaceAndDate(values)}}
              onFinishFailed={errorInfo => console.log(errorInfo)}
              onFieldsChange={(changedFields, allFields) => {
                  for (let field of allFields) {
                      console.log(field.name, field.validated)
                  }
              }}

        >
            <Row gutter={[16, 0]} className={`w-[80%]`}>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Цель'}/>}
                               rules={[{
                                   required: true
                               }]}
                               name={'goal'}>
                        <Select options={optionsGoals} placeholder={'Выбрать'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Мероприятие'}/>}
                               rules={[{
                                   required: true,
                                   max: 100
                               }]}
                               name={'event'}>
                        <Input className={'text-base'} placeholder={'Ввести'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Тип документа-основания'}/>}
                               name={'typeDocument'}
                               rules={[{
                                   required: true
                               }]}>
                        <Select options={optionsTypeDocuments} placeholder={'Выбрать'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Прикрепить документ'}/>}
                               name={'file'}
                    >
                        <Upload.Dragger multiple={true}>
                            <div className={`flex flex-col gap-2`}>
                                <span className={'text-lg'}>Перетащите файлы или выберите на компьютере</span>
                                <div className={`flex items-center justify-center gap-2`}>
                                    <UploadFileSvg/>
                                    <span className={`text-lg mb-0.5 text-[#3073D7]`}>
                                        Выбрать файл
                                    </span>
                                </div>
                            </div>
                        </Upload.Dragger>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Командировка в России'}/>}
                               rules={[{
                                   required: true
                               }]}
                               name={'isRussia'}>
                        <Radio.Group>
                            <Radio value={'Да'}>Да</Radio>
                            <Radio value={'Нет'}>Нет</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <NewOrganization
                setFieldValue={form.setFieldValue}
                nameOrg={'Test'}
                legalAddress={'Test2'}
            />
            <Row gutter={[16, 0]} className={`w-[87%]`}>
                <Col span={13}>
                    <Button
                        className={`mt-5 rounded-[40px] h-[40px]`}
                        type={'primary'}
                        htmlType={'submit'}
                        // onClick={() => {dispatch(setCondition(keysTabsBusinessTrip.travelConditions))}}
                    >
                        <span className={`text-lg`}>
                            Далее
                        </span>
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

