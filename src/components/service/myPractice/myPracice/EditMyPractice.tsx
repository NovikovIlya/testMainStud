import {
    Button,
    Card,
    Col,
    Collapse,
    Descriptions,
    Form, InputNumber,
    List,
    Row,
    Select,
    Space,
    Spin} from 'antd';
import { ArrowLeftSvg } from '../../../../assets/svg';
import { validateMessages } from "../../../../utils/validateMessage";
import { FilterType } from "../../../../models/Practice";
import { useLocation, useNavigate } from "react-router-dom";



import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg';



const optionsCourse: FilterType[] = [
    {
        value: '1',
        label: '1'
    },
    {
        value: '2',
        label: '2'
    },
    {
        value: '3',
        label: '3'
    },
    {
        value: '4',
        label: '4'
    },
    {
        value: '5',
        label: '5'
    },
    {
        value: '6',
        label: '6'
    }
]


export const EditMyPractice = () => {
    const [form] = Form.useForm<any>()
    const path = useLocation()
    const id = path.pathname.split('/').at(-1)!
    const nav = useNavigate()
    const isLoadingSendForm = false

    const items: any = [
        {
          key: '1',
          label: 'Где будет проходить практика',
          children: 'Zhou Maomao',
          
        },
        {
          key: '2',
          label: 'Место прохождение практики',
          children: 'Казань',
        },
        {
          key: '3',
          label: 'Шифр',
          children: '12 Химия',
        },
        {
          key: '4',
          label: 'Профиль',
          children: 'empty',
        },
        {
          key: '5',
          label: 'Уровень образования',
          children: 'Бакалавриат',
        },
        {
            key: '6',
            label: 'Курс',
            children: '4',
          },
          {
            key: '7',
            label: 'Группа',
            children: '07-001',
          },
          {
            key: '8',
            label: 'Учреждение',
            children: 'Высшая школа ииф',
          },
      ];
    
    const deleteCompetence = ()=>{

    }
    const { Panel } = Collapse;

    return (
        <Spin spinning={isLoadingSendForm}>
            <section className="container animate-fade-in">
                <Space size={10} align="center">
                    <Button
                        size="large"
                        className="mt-1 mr-6 rounded-full border border-black"
                        icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                        type="text"
                        onClick={() => {
                            nav('/services/practices/practical.ts/')
                        }}
                    />
                    <span className=" text-[28px] font-normal">
                        Учебная практика на кафедре общей физики с .. по ..
                    </span>
                </Space>
                <Row gutter={16} className='mt-14 mb-10' >
                    <Col span={6}>
                    <Card title="Ваш пакет документов должен содержать:" bordered={false}>
                        <ul className='ml-6'>
                            <li>Отчет по практике</li>
                            <li>Путевка практиканта</li>
                            <li>Дневник практиканта</li>
                        </ul>
                    </Card>
                    </Col>
                    <Col span={6}>
                    <Card title="Обратите внимание" bordered={false}>
                        Отчет должен заполняться самостоятельно.<br></br> В модуле “Практики студентов” формируется только титульный лист отчета. 
                        
                    </Card>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span={12}>
                        <Collapse accordion >
                            <Panel header="Основная информация" key="1">
                            <Row>
                                <Descriptions  >
                                    {items.map((item:any) => (
                                        <Descriptions.Item span={2} label={item.label} key={item.key}>
                                            {item.children}
                                        </Descriptions.Item>
                                        
                                    ))}
                                </Descriptions>
                            </Row>
                               
                            </Panel>
                            
                        </Collapse>
                    </Col>
                </Row>

                <Form<any>
                    validateMessages={validateMessages}
                    form={form}
                   
                    layout={'vertical'}>
                   
          

                    <Row gutter={[16, 16]} className={'mt-4'}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <List
                                header={<div>Код и наименование компетенции:</div>}
                                style={{
                                    overflow: 'auto',
                                    maxHeight: 300,	
                                }}
                                bordered
                                // @ts-ignore
                                dataSource={[]}
                                renderItem={(item: any, index: number) => (
                                    <List.Item
                                    style={{
                                        display: 'flex',
                                    }}
                                    // @ts-ignore
                                    actions={[<div  onClick={() => deleteCompetence(item)} className='cursor-pointer'><DeleteRedSvg /></div>]}
                                    >
                                        <div className='flex items-center'>
                                            <div className=' p-3'>{index + 1}</div> 
                                            <div className='ml-2'>{item.value}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className={`mt-4 `}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <List
                            className='newAntd'
                            header={<div>Индивидуальные задания:</div>}
                            style={{
                                overflow: 'auto',
                                maxHeight: 300,	
                            }}
                            bordered
                            dataSource={[]}
                            renderItem={(item:any,index:number) => (
                                <List.Item>
                                {index+ 1}. {item}
                                </List.Item>
                            )}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className="my-8">
                        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                            <Space className="w-full">
                                <Button
                                    className="!rounded-full"
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Сохранить
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </section>
        </Spin>
    )
}

