import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.css';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Calendar, DatePicker, Form, Input, Popconfirm, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import uuid from 'react-uuid'
import { CloseOutlined } from '@ant-design/icons';
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  period: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({title, editable, children, dataIndex, record, handleSave, ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;


  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

const save = async (date:any) => {

  try {
    


    const values = await form.validateFields();

    toggleEdit();
    handleSave({ ...record, ...values });
  } catch (errInfo) {
    console.log('Save failed:', errInfo);
  }
};
const saveDate = async (date:any) => {


    if (Array.isArray(date) ) {
      toggleEdit();
      handleSave({ ...record, [dataIndex]: date });
      
    } else{
      toggleEdit();
    }


    

};
const saveDateThree= async () => {
  
  
   
      toggleEdit();
      
      
    


    
 
};
  let childNode = children;

  if (editable) {
    childNode = editing 
    // @ts-ignore
    ? dataIndex==='period'? (<div className='flex items-center gap-2 w-[120px] lg:w-[300px]'><Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      className='h-10'
    >
      <DatePicker.RangePicker
      //  onChange={save}
       format={'DD.MM.YYYY'}
       placeholder={['Начало', 'Конец']}
       className="w-full"
       size={'large'}
       
       onChange={saveDate}
      
        
       
       /></Form.Item>
       <Form.Item
       className='h-[40px]'
       style={{ margin: 0 }}
       name={dataIndex+'1'}
    
     >
        <Button className='h-[40px]'  onClick={saveDate} >
      Отмена
      </Button>
    </Form.Item></div>):(
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        className='w-[120px] lg:w-[300px]'
      >
        <Input  ref={inputRef} onPressEnter={save} onBlur={save}  />
      </Form.Item>
    ) 
    :(  <div
        className="editable-cell-value-wrap h-10 w-[120px] lg:w-[300px] flex items-center"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}

      >
        {children}
      </div>
    ) 
  }


  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  name: string;
  period: string;
  address: string;
}

type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const EditableTableTwo = ({setShow,dataSource,setDataSource,setIsDisabled}:any) => {

  console.log('dataSource',dataSource)
  const handleDelete = (key: React.Key) => {
    console.log('key',key)
    const newData = dataSource.filter((item:any) => item.key !== key).map((item:any,index:number)=>{
     return{
      ...item,
      number:index+1
     }
    });
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData: any = {
      key: uuid(),
      description: ``,
      period: '',
      number: dataSource?.length+1,
    };
    setDataSource([...dataSource, newData]);
    setShow(false)
  };

 

 

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        key: 'number',
        dataIndex: 'number',
        title: '№',
        className: 'text-xs !p-2',
        render: (_, __, index) => index + 1 
    },
    {
      title: 'Содержание выполненной работы',
      dataIndex: 'description',
      width: '30%',
      editable: true,
    
    },
    {
      title: 'Период выполнения',
      dataIndex: 'period',
      editable: true,
      render: (_: any, record: any) => <div className={'flex items-center gap-3 h-8'}>
      <span>{record?.period ? dayjs(record?.period?.[0]).format('DD.MM.YYYY') : null}</span>{record?.period ? '-' : null}
      <span>{record?.period ?dayjs(record?.period?.[1]).format('DD.MM.YYYY'): null}</span>
  </div>
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Вы действительно хотите удалить?" onConfirm={() => handleDelete(record.key)}>
            <a><DeleteRedSvg /></a>
          </Popconfirm>
        ) : null,
    },
  ];



  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log('newData',newData)
    setDataSource(newData);
    setShow(false)
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const areAllCellsFilled = () => {
    return dataSource?.every((item:any) => 
      item.description && item.period 
    );
  };

  if (areAllCellsFilled() && dataSource?.length>0) {

    setIsDisabled(false);
  } else {
    setIsDisabled(true); 
    }

  return (
    <div>

      <Table
        components={components}
        rowClassName={() => 'editable-row animate-fade-in'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
        
      />
      <div className='flex items-center  flex-col mt-4 animate-pulse '>
        <div className='rounded-full mb-1 flex  w-[40px] h-[40px] justify-center  bg-[#3073d7] text-white text-center items-center text-xl cursor-pointer' onClick={handleAdd}>+</div>
        <div className='text-center mt1'>Добавить <br></br> работу</div>
      </div>
    </div>
  );
};

export default EditableTableTwo;