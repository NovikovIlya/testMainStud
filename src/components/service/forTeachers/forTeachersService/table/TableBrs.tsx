import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { t } from 'i18next';
import { useAppDispatch } from '../../../../../store';
import { setIsEditTableScheduleTeacher } from '../../../../../store/reducers/authSlice';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
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

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
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

  const save = async () => {
    try {
      const values = await form.validateFields();
    
      toggleEdit();
      // @ts-ignore
      handleSave({ ...record, ...values },children,record[dataIndex]);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 ,width:'auto'}}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input  ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 ,width:'auto'}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const TableBrs = ({dataSource, setDataSource}:any) => {
  const dispatch = useAppDispatch()
  const semesctr = 0

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Сентябрь',
      dataIndex: 'september',
      editable: true,
      width: '15%',
    },
    {
      title: 'Октябрь',
      dataIndex: 'october',
      editable: true,
      width: '15%',
    },  {
      title: 'Ноябрь',
      dataIndex: 'november',
      editable: true,
      width: '15%',
    },
    {
      title: 'Декабрь',
      dataIndex: 'december',
      editable: true,
      width: '15%',
    },
    {
      title: 'Сумма баллов',
      dataIndex: 'address',
      editable: true,
      width: '10%',
    },
   
  ];

  const defaultColumnsTwo: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Февраль',
      dataIndex: 'age',
      editable: true,
      width: '15%',
    },
    {
      title: 'Март',
      dataIndex: 'address',
      editable: true,
      width: '15%',
    },
    {
      title: 'Апрель',
      dataIndex: 'address',
      editable: true,
      width: '15%',
    },
    {
      title: 'Май',
      dataIndex: 'address',
      editable: true,
      width: '15%',
    },
    {
      title: 'Сумма баллов',
      dataIndex: 'address',
      editable: true,
      width: '10%',
    },
   
  ];


  const handleSave = (row: any,children:any,oldValue:any) => {
    console.log('children',children)
    console.log('row',row)
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    console.log('index',index)
    const item = newData[index];
    console.log('item',item)
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    console.log('0000',children[1],'----',oldValue)
    if(children[1]!==oldValue){
      dispatch(setIsEditTableScheduleTeacher(true))
    }
   
  };
  // const handleSave = (row: any) => {
  //   const newData = [...dataSource];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  
  //   // Обновляем только измененные поля
  //   const updatedRow = {
  //     ...item,
  //     ...row,
  //   };
  
  //   newData.splice(index, 1, updatedRow);
  //   setDataSource(newData);
  
  //   // Проверка на изменение значения
  //   if (item.address !== row.address) {
  //     dispatch(setIsEditTableScheduleTeacher(true));
  //   }
  // };
  

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = semesctr === 0 ? 
    defaultColumns.map((col) => {
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
  }) 
    :
    defaultColumnsTwo.map((col) => {
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
  console.log('dataSource',dataSource)
  return (
    <div className='mt-4'>
      <Table<DataType>
        rowKey={(record) => record.key}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        className=''
      
      />
      <Button className='top-[-50px] rounded-xl' type='primary'>{t('Save')}</Button>
    </div>
  );
};

export default TableBrs;