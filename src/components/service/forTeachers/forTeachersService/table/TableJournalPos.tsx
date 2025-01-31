import React, { useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { t } from 'i18next';
import { useAppDispatch } from '../../../../../store';
import { setIsEditTableScheduleTeacher } from '../../../../../store/reducers/authSlice';
import { ColumnTypes, DataType, EditableCellProps, EditableRowProps } from '../../../../../models/tables';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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
      handleSave({ ...record, ...values });
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


const TableBrs = ({dataSource, setDataSource}:any) => {
  const dispatch = useAppDispatch()
  const semesctr = 0

  const defaultColumns: any = [
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
      title: 'ПН',
      
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 150,
          
        }
      ],
    },
    {
      title: 'Октябрь',
      dataIndex: 'october',
      editable: true,
      width: '15%',
    },  
    {
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


  const handleSave = (row: any) => {
    const newData = [...dataSource];
    // находим индекс строки
    const index = newData.findIndex((item) => row.key === item.key);

    if (index > -1) {
      const item = newData[index];

      // Сравнение старых и новых значений
      const hasChanges = Object
        .keys(row)
        .some(key => item[key] !== row[key]);

      // Обновление строки новыми значениями
      newData.splice(index, 1, {
        ...item,
        ...row,
      });

      setDataSource(newData);

      // Отправка действия, если есть изменения
      if (hasChanges) {
        dispatch(setIsEditTableScheduleTeacher(true));
      }
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = semesctr === 0 ? 
    defaultColumns.map((col:any) => {
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
    defaultColumnsTwo.map((col:any) => {
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