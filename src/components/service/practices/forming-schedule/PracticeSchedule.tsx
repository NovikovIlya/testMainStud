import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    List,
    Popconfirm,
    Radio,
    Row,
    Select,
    Space, Table, Tabs,
    Typography
} from 'antd'
import type {CheckboxProps, GetProp, TableProps} from 'antd'
import {useEffect, useState} from 'react'
import {CompressedView} from "./CompressedView";
import {TableView} from "./TableView";
import {useNavigate} from "react-router-dom";
import { useCreateDocumentQuery, useGetDocQuery } from '../../../../store/api/practiceApi/formingSchedule';
import dayjs from 'dayjs'

import i18next from 'i18next'
import { ArrowLeftSvg } from '../../../../assets/svg';
import printJS from 'print-js';
import { EditableCell, Item } from './EditableCell';

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number]

interface FilterType {
    value: string
    label: string
}

const filterSpecialization: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: '31.08.01 Акушерство и гинекология',
        label: '31.08.01 Акушерство и гинекология'
    },
    {
        value: '31.08.01 Педиатрия',
        label: '31.08.01 Педиатрия'
    }
]
const filterCourse: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
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
const filterType: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: 'Производственная',
        label: 'Производственная'
    },
    {
        value: 'Технологическая',
        label: 'Технологическая'
    }
]
const filterEducationLevel: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: 'Ординатура',
        label: 'Ординатура'
    },
    {
        value: 'Интернатура',
        label: 'Интернатура'
    }
]
const filterEducationForm: FilterType[] = [
    {
        value: '',
        label: 'Все'
    },
    {
        value: 'Очная',
        label: 'Очная'
    },
    {
        value: 'Заочная',
        label: 'Заочная'
    },
    {
        value: 'Очно - заочная',
        label: 'Очно - заочная'
    }
]

interface DataType {
    key: string
    specialization: string
    fillingDate: string
    type: string
    course: string
    academicYear: string
    group: string
    educationLevel: string
    educationForm: string
    sybtypePractice: string
    periodPractice: string
}

// const data: DataType[] = [
//     {
//         key: '1',
//         specialization: 'Лечебно-профилактическое учреждение по договору',
//         fillingDate: '00.00.00, 00:00',
//         type: 'Бессрочный',
//         course: '1',
//         academicYear: '2',
//         group: '09-033',
//         educationLevel: 'Ординатура',
//         educationForm: 'Очная',
//         sybtypePractice: 'Акушерство',
//         periodPractice: '2020-2021'
//     },
//     {
//         key: '2',
//         specialization: 'Лечебно-профилактическое учреждение по договору',
//         fillingDate: '00.00.00, 00:00',
//         type: 'С пролонгацией',
//         course: '2',
//         academicYear: '2',
//         group: '09-033',
//         educationLevel: 'Ординатура',
//         educationForm: 'Заочная',
//         sybtypePractice: 'Акушерство',
//         periodPractice: '2020-2021'
//     }
// ]

// const plainOptions = data.map(item => item.key)


export const PracticeSchedule = () => {
    const nav = useNavigate()
    const [year,setYear] = useState('2023/2024')
    const {data:dataCreate} = useCreateDocumentQuery('2023/2024')
    const {data:dataBlob,isLoading:isLoadingBlob} = useGetDocQuery(year,{skip:!year})
    // const [stateSchedule, setStateSchedule] = useState({
    //     compressed: true,
    //     table: false,
    // })
    // const [dataTable, setDataTable] = useState<any>(data)
    const [filters, setFilters] = useState<{
        type: string
        spec: string
        course: string
        level: string
        form: string
    }>({type: '', spec: '', course: '', level: '', form: ''})
    const originData: any = [
        {key:1,name:'1',age:'20',address:'Kazan',period:null,course:null,type:null},
        {key:2,name:'2',age:'30',address:'Moscw',period:null,course:null,type:null}
      ];
      const [form] = Form.useForm();
      const [data, setData] = useState(originData);
      const [editingKey, setEditingKey] = useState('');
      const isEditing = (record: Item) => record.key === editingKey
      const [currentRowValues, setCurrentRowValues] = useState({});
    // useEffect(() => {
    //     setDataTable(
    //         data.filter(
    //             x =>
    //                 x.type.includes(filters.type) &&
    //                 x.specialization.includes(filters.spec) &&
    //                 x.course.includes(filters.course) &&
    //                 x.educationLevel.includes(filters.level) &&
    //                 x.educationForm.includes(filters.form)
    //         )
    //     )
    // }, [filters])

    const filter = (value: string, index: string) => {
        setFilters(prev => ({...prev, [index]: value}))
    }

    // function isCompressedView() {
    //     setStateSchedule({
    //         ...stateSchedule,
    //         compressed: true,
    //         table: false
    //     })
    // }

    // function isTableView() {
    //     setStateSchedule({
    //         ...stateSchedule,
    //         compressed: false,
    //         table: true,
    //     })
    // }
    const downloadFile = () => {
        if(dataBlob){
        const link = document.createElement('a');
        link.href = dataBlob;
        link.setAttribute('download', 'downloaded-file.docx');
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(dataBlob); 
        }
      }

    function translateColumnsIntoRussia({isPrint}: { isPrint?: boolean }) {
        const newData: any = []
      
            // const recordCompressedWithoutUndefinedElem = dataCreate.filter((elem:any) => elem !== undefined)
            const dataMock = [{specialityName:'test',practiceKind:'тест',dateFilling:'2021.09.10'}]
            for (let elem of dataMock) {
                const newObj = {
                    "Шифр и наименование специальности": elem.specialityName,
                    "Дата заполнения": dayjs(elem.dateFilling).format('YYYY.MM.DD'),
                    "Вид практики": elem.practiceKind,
                }

                newData.push(newObj)
            }
        
        

        return newData
    }
    const print = ()=>{
        function properties() {
				return [
					'Шифр и наименование специальности',
                    "Дата заполнения",
					"Вид практики",
					
				]
		}
        printJS({
            printable: translateColumnsIntoRussia({isPrint: true}),
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }
    console.log('data',data)
    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
        setCurrentRowValues(record);
    };
    
    const cancel = () => {
        setEditingKey('');
    };
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setCurrentRowValues({ ...currentRowValues, [name]: value });
    // };
    console.log('currentRowValues',currentRowValues)
    const save = async (key: React.Key) => {
        try {
          const row = (await form.validateFields()) as Item;
    
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
    };
    console.log('editingKey',editingKey)
    console.log('ss',data[Number(editingKey) - 1])
    const columns = [
		{
			key: 'Name',
			dataIndex: 'Name',
			title: 'Шифр и иаименование документа',
			name: 'Шифр и иаименование документа',
			className: 'text-xs !p-2',
           
			
		},
        {
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-2',
         
		},
        {
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			className: 'text-xs !p-2',
            editable: true,
		},
        {
			key: 'groupNumbers',
			dataIndex: 'groupNumbers',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
        {
			key: 'level',
			dataIndex: 'level',
			title: 'Уровень орбазования',
			className: 'text-xs !p-2'
		},
        {
			key: 'forms',
			dataIndex: 'forms',
			title: 'Форма обучения',
			className: 'text-xs !p-2'
		},
        {
			key: 'kind',
			dataIndex: 'kind',
			title: 'Вид практики',
			className: 'text-xs !p-2',
            editable: true,
		},
        {
			key: 'type',
			dataIndex: 'type',
			title: 'Тип практики',
			className: 'text-xs !p-2',
            editable: true,
		},
		{
            title: 'Дата заполнения',
            dataIndex: 'dateFilling',
            width: '20%',
            // @ts-ignore
            render: (text:any) => dayjs(text).format('DD.MM.YYYY')
        },

		{
			key: 'period',
			dataIndex: 'period',
			title: 'Период практики',
			className: 'text-xs !p-2',
            editable: true,
            render: (text, record) => {
                const editable = isEditing(record);
                console.log('text', text);
                return (
                  <>{text && text[0]?.$D} {text && text[0]?.$M}</>
                );
            },},
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                    Save
                  </Typography.Link>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
              );
            },
          },
		
	
	]
    const mergedColumns: TableProps['columns'] = columns.map((col) => {
        // @ts-ignore
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: Item) => ({
            record,
            inputType:col.dataIndex === 'period' ? 'date' :
             col.dataIndex === 'course' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });

    console.log('dataCreate',dataCreate)

    return (
        <section className="container">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Button
                            size="large"
                            className="mt-1"
                            icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                            type="text"
                            onClick={() => {
                                nav('/services/practices/formingSchedule')
                            }}
                        />
                    <Typography.Text className=" text-[28px] mb-14">
                        График проведения практик на "year" учебный год ""
                    </Typography.Text>
               
                </Col>
            </Row>
            <Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Наименование специальности</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterSpecialization}
                        onChange={value => filter(value, 'spec')}
                    />
                </Col>
                
            </Row>
            <Row gutter={[16, 0]} className="mt-4 flex items-center">
                <Col span={1}>
                    <Typography.Text className="whitespace-nowrap">Курс</Typography.Text>
                </Col>
                <Col span={2}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterCourse}
                        onChange={value => filter(value, 'course')}
                    />
                </Col>
                <Col span={2}>
                    <Typography.Text>Вид практики</Typography.Text>
                </Col>
                <Col span={7}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
                        className="w-full"
                        options={filterType}
                        onChange={value => filter(value, 'type')}
                    />
                </Col>
            </Row>
            {/* {
                stateSchedule.table
                &&
                <>
                    <Row gutter={[16, 16]} className="mt-4 flex items-center">
                        <Col span={4}>
                            <Typography.Text>Уровень образования</Typography.Text>
                        </Col>
                        <Col span={8}>
                            <Select
                                popupMatchSelectWidth={false}
                                defaultValue=""
                                className="w-full"
                                options={filterEducationLevel}
                                onChange={value => filter(value, 'level')}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mt-4 flex items-center">
                        <Col span={4}>
                            <Typography.Text>Форма обучения</Typography.Text>
                        </Col>
                        <Col span={8}>
                            <Select
                                popupMatchSelectWidth={false}
                                defaultValue=""
                                className="w-full"
                                options={filterEducationForm}
                                onChange={value => filter(value, 'form')}
                            />
                        </Col>
                    </Row>
                </>
            } */}
            <Row className="mt-4 flex items-center">
                <Col span={12} flex="50%">
                    <div >
                        <Button disabled={isLoadingBlob} onClick={downloadFile}>
                            Скачать XML
                        </Button>
                        <Button disabled={isLoadingBlob} onClick={print}>
                            Печать
                        </Button>
                    </div>
                </Col>
                <Col span={8} offset={4}>
                    <div className={'flex gap-2 items-center'}>
                        <span className={'mr-2'}>Сортировка</span>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="1"
                            className="w-full"
                            options={[{value: '1', label: 'Все'}]}/>
                    </div>

                </Col>
            </Row>

            <Row className="mt-4">
                <Col flex={'auto'}>
                    {/* {stateSchedule.compressed && <CompressedView/>}
                    {stateSchedule.table && <TableView/>} */}
                     <Form form={form} component={false}>
                        <Table
                            components={{
                            body: {
                                cell: EditableCell,
                            },
                            }}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                            onChange: cancel,
                            }}
                        />
                        </Form>
                </Col>
            </Row>
        </section>
    )
}

export default PracticeSchedule
