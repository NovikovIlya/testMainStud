import {
    Button, Col, Form, Popconfirm, Row,
    Select,
    Space, Table, Typography
} from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateDocumentQuery, useGetDocQuery } from '../../../../store/api/practiceApi/formingSchedule';
import dayjs from 'dayjs';

import { ArrowLeftSvg } from '../../../../assets/svg';
import printJS from 'print-js';
import { EditableCell, Item } from './EditableCell';
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg';
import { EditSvg } from '../../../../assets/svg/EditSvg';
import { CheckOutlined, CloseOutlined, PlusOutlined, PrinterOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

interface FilterType {
    value: string
    label: string
}

const filterSpecialization: FilterType[] = [
    {
        value: 'Все',
        label: 'Все'
    },
    {
        value: '1',
        label: '1'
    }
]
const filterLevel: FilterType[] = [
    {
        value: 'Все',
        label: 'Все'
    },
    {
        value: 'Ординатура',
        label: 'Ординатура'
    },
    {
        value: '1',
        label: '1'
    }
]
const filterForm: FilterType[] = [
    {
        value: 'Все',
        label: 'Все'
    },
    {
        value: 'Очная',
        label: 'Очная'
    },
    {
        value: 'Заочная',
        label: 'Заочная'
    }
]
const filterCourse: FilterType[] = [
    {
        value: 'Все',
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
    },
    {
        value: '7',
        label: '7'
    }
]
const filterType: FilterType[] = [
    {
        value: 'Все',
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

const optionsSortDate: any = [
    {value: 'По дате (сначала новые)', label: 'По дате (сначала новые)'},
    {value: 'По дате (сначала старые)', label: 'По дате (сначала старые)'},
]

const optionMock = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
]
const optionMockType = [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
]
const optionMockKind = [
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
]

export const PracticeSchedule = () => {
    const originData: any = [
        {id:'czxczxc',key:'czxczxc',name:'1',academicYear:'2024',address:'Kazan',period: [dayjs('2024-07-01'), dayjs('2024-07-15')],selectCourse:'1',type:null,dateFilling:'2024-07-30',selectKind:'Производственная',form:'Очная',level: 'Ординатура'},
        {id:'bbq',key:'bbq',name:'2',academicYear:'2030',address:'Moscw',period:null,selectCourse:'1',type:null,dateFilling:'2024-07-29',selectKind:'Производственная',form:'Очная',level: 'Ординатура'},
        {id:'ccx',key:'ccx',name:'3',academicYear:'2030',address:'Moscw',period:null,selectCourse:'1',type:null,dateFilling:'2024-07-28',selectKind:'Производственная',form:'Заочная',level: 'Ординатура'}
    ];
    const nav = useNavigate()
    const [year,setYear] = useState('2023/2024')
    const {data:dataCreate} = useCreateDocumentQuery('2023/2024')
    const {data:dataBlob,isLoading:isLoadingBlob} = useGetDocQuery(year,{skip:!year})
    const [tableData, setTableData] = useState<any>(originData)
    const [filter, setFilter] = useState<any>({type: '', spec: '', course: 'Все', level: 'Все', form: 'Все',dateFilling: 'По дате (сначала новые)',selectKind:'Все', name:'Все'})

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record: Item) => record.key === editingKey
    const [currentRowValues, setCurrentRowValues] = useState({});
    const columns = [
		{
			key: 'name',
			dataIndex: 'name',
			title: 'Шифр и наименование документа',
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
			dataIndex: 'selectCourse',
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
			title: 'Уровень образования',
			className: 'text-xs !p-2'
		},
        {
			key: 'form',
			dataIndex: 'form',
			title: 'Форма обучения',
			className: 'text-xs !p-2'
		},
        {
			key: 'kind',
			dataIndex: 'selectKind',
			title: 'Вид практики',
			className: 'text-xs !p-2',
            editable: true,
		},
        {
			key: 'type',
			dataIndex: 'selectType',
			title: 'Тип практики',
			className: 'text-xs !p-2',
            editable: true,
		},
		{
            key: 'id',
            title: 'Дата заполнения',
            dataIndex: 'dateFilling',
            width: '20%',
            // sorter: (a:any, b:any) => +new Date(b.dateFilling) - +new Date(a.dateFilling),
            // @ts-ignore
            render: (text:any) => dayjs(text).format('DD.MM.YYYY')
        },

		{
			key: 'period',
			dataIndex: 'period',
			title: 'Период практики',
			className: 'text-xs !p-2',
            editable: true,
            render: (text:any, record:any) => {
                return (
                  <>{formatDateRange((Array.isArray(text) ? text : ['','']))}</>
                );
            },},
        {
            title: '',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
              const editable = isEditing(record);
              return editable ? (
                <div className='flex justify-around items-center w-[60px]'>
                  <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                    <CheckOutlined style={{color:'#75a4d3'}}/>
                  </Typography.Link>
                  <Popconfirm title="Вы действительно хотите отменить действие?" onConfirm={cancel}>
                     <CloseOutlined style={{color:'#75a4d3'}}/>
                  </Popconfirm>
                </div>
              ) : (
                <div className='flex justify-around items-center  w-[60px]'>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  <EditSvg/>
                </Typography.Link>
                <Popconfirm title="Вы действительно хотите удалить?" onConfirm={() => handleDelete(record.key)}>
                    <a><DeleteRedSvg/></a>
                </Popconfirm>
                </div>
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
            inputType:  col.dataIndex === 'selectCourse' ? 'select' :
            col.dataIndex === 'selectType' ? 'select' :
            col.dataIndex === 'selectKind' ? 'select' :
            col.dataIndex === 'period' ? 'date' :
             col.dataIndex === 'course' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
            options: col.dataIndex === 'selectCourse' ? optionMock 
            : col.dataIndex === 'selectType' ? optionMockType 
            : col.dataIndex === 'selectKind' ? optionMockKind : undefined,
          }),
        };
    });

    useEffect(() => {
		// if (isSuccessPractiseAll) {
			setTableData(filterDataFull())
           
            // @ts-ignore
           
		// }
	}, [filter])
    
    function filterDataFull() {
		function filterCourse(elem: any) {
			if (filter.course === 'Все') {
				return elem
			} else {
				return elem.selectCourse === filter.course
			}
		}
        function filterLevel(elem: any) {
			if (filter.level === 'Все') {
				return elem
			} else {
				return elem.level === filter.level
			}
		}
        function filterForm(elem: any) {
			if (filter.form === 'Все') {
				return elem
			} else {
				return elem.form === filter.form
			}
		}
        function filterKind(elem: any) {
			if (filter.selectKind === 'Все') {
				return elem
			} else {
				return elem.selectKind === filter.selectKind
			}
		}
        function filterName(elem: any) {
			if (filter.name === 'Все') {
				return elem
			} else {
				return elem.name === filter.name
			}
		}

		function sortDateFilling(a:any, b:any) {
            if (filter.dateFilling === 'По дате (сначала новые)') {
                return +new Date(b.dateFilling) - +new Date(a.dateFilling)
            }
            if (filter.dateFilling === 'По дате (сначала старые)') {
                return +new Date(a.dateFilling) - +new Date(b.dateFilling)
            }
            return 0
        }
       
		return originData
			? originData
					// .filter((elem: any) => filterDepartment(elem))
					.filter((elem: any) => filterCourse(elem))
                    .filter((elem: any) => filterKind(elem))
                    .filter((elem: any) => filterName(elem))
                    .filter((elem: any) => filterLevel(elem))
                    .filter((elem: any) => filterForm(elem))
					// .filter((elem: any) => filterSemester(elem))
					// .filter((elem: any) => filterNameSpecialty(elem))
					// .filter((elem :any) => filterSubdivision(elem))
					.sort((a:any, b:any) => sortDateFilling(a, b))
			: []
	}

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
           
            for (let elem of tableData) {
                const startPractice = `${dayjs(elem.period?.[0]).format('DD.MM.YYYY')}`
                const endPractice = `${dayjs(elem.period?.[1]).format('DD.MM.YYYY')}`
                const newObj = {
                    "Шифр и наименование специальности": elem.name,
                    "Учебный год": elem.academicYear,
                    "Курс": elem.selectCourse,
                    "Номер группы": elem.groupNumbers,
                    "Уровень образования": elem.level,
                    "Форма обучения": elem.forms,
                    "Тип практики": elem.selectType,
                    "Дата заполнения": dayjs(elem.dateFilling).format('YYYY.MM.DD'),
                    "Вид практики": elem.selectKind,
                    "Период практики": `${startPractice} - ${endPractice}`,
                }

                newData.push(newObj)
            }
        
        

        return newData
    }

    const print = ()=>{
        function properties() {
				return [
                    "Шифр и наименование специальности",
                    "Учебный год",
                    "Курс",
                    "Номер группы",
                    "Уровень образования",
                    "Форма обучения",
                    "Тип практики",
                    "Дата заполнения",
                    "Вид практики",
                    "Период практики",
					
				]
		}
        printJS({
            printable: translateColumnsIntoRussia({isPrint: true}),
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
        setCurrentRowValues(record);
    };
    
    const cancel = () => {
        setEditingKey('');
    };

    const formatDateRange = (dateRange:any) => {
        if (dateRange !== null && Array.isArray(dateRange) && dateRange.length === 2) {
            const startDate = dayjs(dateRange[0]);
            const endDate = dayjs(dateRange[1]);
    
            if (startDate.isValid() && endDate.isValid()) {
                return `${startDate.format('DD.MM.YYYY')} - ${endDate.format('DD.MM.YYYY')}`;
            } else {
                return 'Неверный формат даты';
            }
        }
        return ''; // Возвращает пустую строку, если dateRange не является массивом или если длина массива не равна 2
    };

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
            setTableData(newData);
            setEditingKey('');
            console.log('1',newData[index])
          } else {
            // если новая запись
            newData.push(row);
            setData(newData);
            setTableData(newData)
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (key: React.Key) => {
        const newData = tableData.filter((item:any) => item.key !== key);
        setTableData(newData);
    };

    function getAcademicYear() {
        const today = dayjs();
        const year = today.year();
        const month = today.month() + 1; 
    
        if (month >= 8) {
            return `${year}/${year + 1}`; 
        } else {
            return `${year - 1}/${year}`;
        }
    }


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
                        График проведения практик на {getAcademicYear()} учебный год "Подразделение" КФУ
                    </Typography.Text>
               
                </Col>
            </Row>
            <Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Шифр и наименование специальности</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue="Все"
                        className="w-full"
                        options={filterSpecialization}
                        onChange={value => {
                            setFilter({
                                ...filter,
                                name: value
                            })
                        }}
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
                        defaultValue="Все"
                        className="w-full"
                        options={filterCourse}
                        onChange={value => {
                            setFilter({
                                ...filter,
                                course: value
                            })
                        }}
                    />
                </Col>
                <Col span={3}>
                    <Typography.Text>Вид практики</Typography.Text>
                </Col>
                <Col span={6}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue="Все"
                        className="w-full"
                        options={filterType}
                        onChange={value => {
                            setFilter({
                                ...filter,
                                selectKind: value
                            })
                        }}
                    />
                </Col>
            </Row>
            <Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Уровень образования</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue="Все"
                        className="w-full"
                        options={filterLevel}
                        onChange={value => {
                            setFilter({
                                ...filter,
                                level: value
                            })
                        }}
                    />
                </Col> 
            </Row>
            <Row gutter={[8, 16]} className="mt-4 pb-4 mb-4 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Форма обучения</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue="Все"
                        className="w-full"
                        options={filterForm}
                        onChange={value => {
                            setFilter({
                                ...filter,
                                form: value
                            })
                        }}
                    />
                </Col> 
            </Row>
            <Row className="mt-4 flex items-center">
                <Col span={12} flex="50%">
                    <div >
                        <Space>
                            <Button disabled={isLoadingBlob} onClick={downloadFile}>
                                <VerticalAlignBottomOutlined /> Скачать 
                            </Button>
                            <Button disabled={isLoadingBlob} onClick={print}>
                                 <PrinterOutlined /> Печать
                            </Button>
                        </Space>
                    </div>
                </Col>
                <Col span={8} offset={4}>
                    <div className={'flex gap-2 items-center'}>
                        <span className={'mr-2'}>Сортировка</span>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue=""
                            className="w-full"
                            options={optionsSortDate}
                            onChange={value => {
                                setFilter({
                                    ...filter,
                                    dateFilling: value
                                })
                            }}
                            />
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
                            dataSource={tableData ? tableData : []}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={false}
                           	rowKey="id"
                        />
                        </Form>
                </Col>
            </Row>
        
        </section>
    )
}

export default PracticeSchedule
