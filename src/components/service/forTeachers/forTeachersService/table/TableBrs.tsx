import React, { useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { t } from 'i18next';
import { useAppDispatch } from '../../../../../store';
import { setIsEditTableScheduleTeacher } from '../../../../../store/reducers/authSlice';
import { ColumnTypes, DataType, EditableCellProps, EditableRowProps } from '../../../../../models/tables';
import { dataBrs, Student } from '../../../../../models/forTeacher';

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
        rules={[{ required: true, message: `${title} является обязательным.` }]}
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

type Props = {
  dataSource: Student[];
  semester:any,
  setDataSource: any;
};

const TableBrs = ({dataSource, setDataSource,semester}: Props) => {
  const dispatch = useAppDispatch()
  console.log('dataSource',dataSource)

  const defaultColumns: any = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
      
    },
    {
      title: 'ФИО',
      dataIndex: 'studName',
      width: '20%',
    },
    {
      title: 'Сентябрь',
      dataIndex: 'firstMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Октябрь',
      dataIndex: 'secondMonth',
      editable: true,
      width: '15%',
    },  
    {
      title: 'Ноябрь',
      dataIndex: 'thirdMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Декабрь',
      dataIndex: 'fourthMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Сумма баллов',
      dataIndex: 'sum',
      editable: true,
      width: '10%',
    },
   
  ];

  const defaultColumnsTwo: any = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
      
    },
    {
      title: 'ФИО',
      dataIndex: 'studName',
      width: '20%',
    },
    {
      title: 'Февраль',
      dataIndex: 'firstMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Март',
      dataIndex: 'secondMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Апрель',
      dataIndex: 'thirdMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Май',
      dataIndex: 'fourthMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Сумма баллов',
      dataIndex: 'sum',
      editable: true,
      width: '10%',
    },
   
  ];
  const defaultColumnsThree: any = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
        
    },
    {
      title: 'ФИО',
      dataIndex: 'studName',
      width: '20%',
    },
    {
      title: 'Июнь',
      dataIndex: 'firstMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Июль',
      dataIndex: 'secondMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Август',
      dataIndex: 'thirdMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Май',
      dataIndex: 'fourthMonth',
      editable: true,
      width: '15%',
    },
    {
      title: 'Сумма баллов',
      dataIndex: 'sum',
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
        // @ts-ignore
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

  const columns =  semester === 1 ? 
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
  })  :
  semester === 2 ?
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
  }) : defaultColumnsThree;

  return (
    <div className='mt-4'>
      <Table
        rowKey={(record) => record.key}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        className=''
      
      />
      <Button className='top-[-50px] rounded-xl' type='primary'>{t('Save')}</Button>
    </div>
  );
};

export default TableBrs;