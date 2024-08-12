import {
  Button, Col, Form, Input, Modal, Popconfirm, Radio, Result, Row,
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
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { optionsCourseValidAdd } from '../../../../utils/optionsCourseAdd';
import { GetColumnSearchProps } from '../../../../models/representation';
import { FilterDropdownProps } from 'antd/es/table/interface';


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

export const CreateRepresentation = () => {
  const tableRef = useRef(null);
  const originData: any = [
      {id:'czxczxc',key:'czxczxc',name:'jim',academicYear:'2024',address:'Kazan',period: [dayjs('2024-07-01'), dayjs('2024-07-15')],selectCourse:'1',type:null,dateFilling:'2024-07-30',selectKind:'Производственная'},
      {id:'bbq',key:'bbq',name:'jon',academicYear:'2030',address:'Moscw',period:null,selectCourse:'1',type:null,dateFilling:'2024-07-29',selectKind:'Производственная'},
      {id:'ccx',key:'ccx',name:'jen',academicYear:'2030',address:'Moscw',period:null,selectCourse:'1',type:null,dateFilling:'2024-07-28',selectKind:'Производственная'},
      
  ];
  const nav = useNavigate()
  const [tableData, setTableData] = useState<any>(originData)
  const [filter, setFilter] = useState<any>({type: '', spec: '', course: 'Все', level: '', form: '',dateFilling: 'По дате (сначала новые)',selectKind:'Все', name:'Все'})
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: Item) => record.key === editingKey
  const [isModalOpenOne, setIsModalOpenOne] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<any>(null);
  const [selectedPractice, setSelectedPractice] = useState<any>(null)

  useEffect(() => {
  // if (isSuccessPractiseAll) {
    setTableData(filterDataFull())
          console.log('update')
          // @ts-ignore
         
  // }
  }, [filter])

  const getColumnSearchProps = (dataIndex: any): GetColumnSearchProps  => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Искать
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columnsRepresentation = [
  
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Шифр и иаименование документа',
      name: 'Шифр и иаименование документа',
      className: 'text-xs !p-2',
      ...getColumnSearchProps('name'),
    },
        {
      key: 'academicYear',
      dataIndex: 'academicYear',
      title: 'Учебный год',
      className: 'text-xs !p-2',
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
      className: 'text-xs !p-2',
      editable: true,
    },
    {
      key: 'course',
      dataIndex: 'selectCourse',
      title: 'Курс',
      className: 'text-xs !p-2',
      editable: true,  
    },

    // {
    //   title: '',
    //   key: 'action',
    //   render: (_:any, record:any) => (
    //     <Space size="middle">
    //       <Button onClick={()=>hanldeSelectedPractise(record.id)}>Выбрать </Button>
    //     </Space>
    //   ),
    // },
  
  
  
  ]

  const columns = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '№',
      className: 'text-xs !p-2',
      render: (text:any, record:any, index:any) => <div>{index + 1}</div>,
    },
  {
    key: 'student',
    dataIndex: 'student',
    title: 'ФИО обучающегося',
    name: 'ФИО обучающегося',
    className: 'text-xs !p-2',
  },
   
    {
    key: 'groupNumbers',
    dataIndex: 'groupNumbers',
    title: 'Номер группы',
    className: 'text-xs !p-2'
    },
    {
    key: 'place',
    dataIndex: 'place',
    title: 'Место прохождения практики',
    className: 'text-xs !p-2',
    editable: true,
    },
    {
    key: 'FIO',
    dataIndex: 'FIO',
    title: 'ФИО руководителя от кафедры',
    className: 'text-xs !p-2'
    },
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
              {/* <Popconfirm title="Вы действительно хотите удалить?" onConfirm={deleteRow}>
                  <a><DeleteRedSvg/></a>
              </Popconfirm> */}
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
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: any,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  function filterDataFull() {




  function filterCourse(elem: any) {
    if (filter.course === 'Все') {
      return elem
    } else {
              console.log('elem',elem)
      // @ts-ignore
      return elem.selectCourse === filter.course
    }
  }
      function filterKind(elem: any) {
    if (filter.selectKind === 'Все') {
      return elem
    } else {
              console.log('elem',elem)
      // @ts-ignore
      return elem.selectKind === filter.selectKind
    }
  }
      function filterName(elem: any) {
    if (filter.name === 'Все') {
      return elem
    } else {
              console.log('elem',elem)
      // @ts-ignore
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

        .filter((elem: any) => filterCourse(elem))
                  .filter((elem: any) => filterKind(elem))
                  .filter((elem: any) => filterName(elem))

        .sort((a:any, b:any) => sortDateFilling(a, b))
    : []
}

  // const downloadFile = () => {
  //     if(dataBlob){
  //     const link = document.createElement('a');
  //     link.href = dataBlob;
  //     link.setAttribute('download', 'downloaded-file.docx');
  //     document.body.appendChild(link);
  //     link.click();

  //     window.URL.revokeObjectURL(dataBlob); 
  //     }
  // }

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

  const edit = (record: Partial<Item> & { key: React.Key }) => {
      form.setFieldsValue({ name: '', age: '', address: '', ...record });
      setEditingKey(record.key);
      // setCurrentRowValues(record);
  };
  
  const cancel = () => {
      setEditingKey('');
  };

  const deleteRow = ()=>{

  }
  const formatDateRange = (dateRange:any) => {
      console.log('dateRange',dateRange)
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

  const hanldeSelectedPractise = (id: any)=>{
    console.log('id',id)
    setSelectedPractice(id)
    setIsModalOpenOne(false)
  }

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const showModalOne = () => {
    setIsModalOpenOne(true);
  };

  const handleOkOne = () => {
    setIsModalOpenOne(false);
  };

  const handleCancelOne = () => {
    setIsModalOpenOne(false);
  };
  const handleRowClick = (record:any) => {
		hanldeSelectedPractise(record.id)
  };

 

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
                              nav('/services/practices/representation')
                          }}
                      />
                  <Typography.Text className=" text-[28px] mb-14">
                      Добавление представления в приказ
                  </Typography.Text>
             
              </Col>
          </Row>
          
          {/* <Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
              <Col span={4}>
                  <Typography.Text>Подразделение</Typography.Text>
              </Col>
              <Col span={8}>
                  <Select
                      popupMatchSelectWidth={false}
                      defaultValue=""
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
          <Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
              <Col span={4}>
                  <Typography.Text>Шифр и наименование специальности</Typography.Text>
              </Col>
              <Col span={8}>
                  <Select
                      popupMatchSelectWidth={false}
                      defaultValue=""
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
              <Col span={2}>
                  <Typography.Text>Семестр</Typography.Text>
              </Col>
              <Col span={7}>
                  <Select
                      popupMatchSelectWidth={false}
                      defaultValue=""
                      className="w-full"
                      options={optionsCourseValidAdd(filter.course)}
                      disabled={!filter.course || filter.course === 'Все'}
                      onChange={value => {
                          setFilter({
                              ...filter,
                              selectKind: value
                          })
                      }}
                  />
              </Col>
          </Row> */}

          
          <Row className="mt-4 flex items-center">
              <Col span={12} flex="50%">
                  <div >
                      <Space>
                          {/* <Button disabled={isLoadingBlob} onClick={downloadFile}>
                              Скачать 
                          </Button>
                          <Button disabled={isLoadingBlob} onClick={print}>
                              Печать
                          </Button> */}
                          <Button type="primary" onClick={showModalOne}>
                            Выберите практику
                          </Button>
                          {/* <Button type="primary" onClick={showModal}>
                            Сформировать представление
                          </Button> */}
                      </Space>
                  </div>
              </Col>
              {/* <Col span={8} offset={4}>
                  <div className={'flex gap-2 items-center'}>
                      <span className={'mr-2'}>Сортировка</span>
                      <Select
                          popupMatchSelectWidth={false}
                          defaultValue="По дате (сначала новые)"
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
              </Col> */}
          </Row>

          {selectedPractice ? <Col span={12} flex="50%" className='mt-4 mobileFirst'>
                    <Radio.Group defaultValue="compressedView" buttonStyle="solid">
                        <Radio.Button
                           
                            value="compressedView"
                            className="!rounded-l-full">
                            Невыездная практика
                        </Radio.Button>
                        <Radio.Button
             
                            value="tableView"
                            className="!rounded-r-full">
                            Выездная практика
                        </Radio.Button>
                    </Radio.Group>
          </Col> : ''}

          <Modal width={'100%'} title="Выберите практику" open={isModalOpenOne} onOk={handleOkOne} onCancel={handleCancelOne}>
            <Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Шифр и наимеование документа</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        showSearch
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        popupMatchSelectWidth={false}
                        defaultValue=""
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
            <Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Подразделение</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
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
            <Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Учебный год</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
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
            <Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Номер группы</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
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
            <Row gutter={[8, 16]} className="mt-4 mb-12 w-full flex items-center">
                <Col span={4}>
                    <Typography.Text>Уровень образования</Typography.Text>
                </Col>
                <Col span={8}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue=""
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
             <Table
                  onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                  })}
                  ref={tableRef}
                  components={{
                  body: {
                      cell: EditableCell,
                  },
                  }}
                  bordered
                  dataSource={tableData ? tableData : []}
                  // @ts-ignore
                  columns={columnsRepresentation}
                  rowClassName="editable-row"
                  pagination={false}
                    rowKey="id"
                      />
          </Modal>

          {selectedPractice ? <>
          <Row className="mt-4">
              <Col flex={'auto'}>
                   <Form form={form} component={false}>
                      <Table
                          ref={tableRef}
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
          </> : <Result
    title="Выберите практику чтобы добавить представление"
   
  />}
      </section>
  )
}

export default CreateRepresentation
