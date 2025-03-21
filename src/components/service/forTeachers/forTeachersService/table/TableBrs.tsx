import React, { useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Tooltip } from 'antd';
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
    childNode = !record.isBlocked ? editing ? (
      <Form.Item
        style={{ margin: 0 ,width:'auto'}}
        name={dataIndex}
        // rules={[{ required: true, message: `${title} является обязательным.` }]}
      >
        <Input  type='number' min={0} max={9} ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 ,width:'auto'}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    ) :  <Tooltip title="Ведомость для этого студента сформирована — нельзя проставить оценку"><div
    className="editable-cell-value-wrap"
    style={{ paddingInlineEnd: 24 ,width:'auto'}}
    onClick={toggleEdit}
  >
    {children}
  </div></Tooltip>;
  }

  return <td {...restProps}>{childNode}</td>;
};

type Props = {
  dataSource: Student[];
  semester:any,
  setDataSource: any;
  yearForm:any
};

const TableBrs = ({yearForm,dataSource, setDataSource,semester}: Props) => {
  const dispatch = useAppDispatch()

  

  const defaultColumns: any = yearForm === 2024 ? 
  [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
      
    },
    {
      title: t('fioStudent'),
      dataIndex: 'studName',
      width: '20%',
    },
    {
      title: t('september'),
      dataIndex: 'firstMonth',
      editable: true,
      width: '15%',
    },
    {
      title: t('october'),
      dataIndex: 'secondMonth',
      editable: true,
      width: '15%',
    },  
    {
      title: t('november'),
      dataIndex: 'thirdMonth',
      editable: true,
      width: '15%',
    },
    {
      title: t('december'),
      dataIndex: 'fourthMonth',
      editable: true,
      width: '15%',
    },
    {
      title: t('sum'),
      dataIndex: 'sum',
      editable: true,
      width: '10%',
    },
   
  ] : [
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
    title: t('september'),
    dataIndex: 'firstMonth',
    editable: true,
    width: '15%',
  },
  {
    title: t('october'),
    dataIndex: 'secondMonth',
    editable: true,
    width: '15%',
  },  
  {
    title: t('november'),
    dataIndex: 'thirdMonth',
    editable: true,
    width: '15%',
  },
  {
    title: t('december'),
    dataIndex: 'fourthMonth',
    editable: true,
    width: '15%',
  },
  {
    title: t('sum'),
    dataIndex: 'sum',
    editable: true,
    width: '10%',
  },
  ]

  const defaultColumnsTwo: any = yearForm === 2024 ? [
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
      title: t('march'),
      dataIndex: 'firstMonth',
      editable: true,
      width: '15%',
    },
    {
      title: t('april'),
      dataIndex: 'secondMonth',
      editable: true,
      width: '15%',
    },
    {
      title: t('may'),
      dataIndex: 'thirdMonth',
      editable: true,
      width: '15%',
    },
    {
      title: t('june'),
      dataIndex: 'fourthMonth',
      editable: true,
      width: '15%',
    },
    {
      title: t('sum'),
      dataIndex: 'sum',
      editable: true,
      width: '10%',
    },
   
  ] : [
    
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
    title: t('february'),
    dataIndex: 'firstMonth',
    editable: true,
    width: '15%',
  },
  {
    title: t('march'),
    dataIndex: 'secondMonth',
    editable: true,
    width: '15%',
  },
  {
    title: t('april'),
    dataIndex: 'thirdMonth',
    editable: true,
    width: '15%',
  },
  {
    title: t('may'),
    dataIndex: 'fourthMonth',
    editable: true,
    width: '15%',
  },
  
  {
    title: t('sum'),
    dataIndex: 'sum',
    editable: true,
    width: '10%',
  },
  ]
  

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
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        isBlocked: record.isBlocked, 
        handleSave,
      }),
    };
  })  :
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
  }) 

  return (
    <div className='mt-4 styleCustom'>
      <Table
        rowKey={(record) => record.key}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        className=''
        pagination={false}
      
      />
      {/* <Button className='top-[-50px] rounded-xl' type='primary'>{t('Save')}</Button> */}
    </div>
  );
};

export default TableBrs;