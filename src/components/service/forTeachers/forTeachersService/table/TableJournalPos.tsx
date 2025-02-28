import React, { useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, GetRef, InputRef, TableProps } from 'antd';
import { Button, Checkbox, Form, Input, Popconfirm, Table, Tooltip } from 'antd';
import { t } from 'i18next';
import { useAppDispatch } from '../../../../../store';
import { setIsEditTableScheduleTeacher } from '../../../../../store/reducers/authSlice';
import { ColumnTypes, DataType, EditableCellProps, EditableRowProps } from '../../../../../models/tables';
import { truncateString } from '../../../../../utils/truncateString';


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
        <Input className='w-[35px]' ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap truncate "
        style={{  width:'auto'}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};


const TableBrs = ({dataSource, setDataSource}:any) => {
  const tableStyle = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#eaeaea transparent',
    scrollbarGutter: 'stable',
  };
  const dispatch = useAppDispatch()
  const semesctr = 0
  function handleCheckboxChange(e:any,text:any)  {
    console.log(e.target.checked,text)
  }
  const defaultColumns: any = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '100px',
        fixed: 'left',
        customCell: () => ({
          style: {
            backgroundColor: 'rgba(31, 92, 184, 0.2)',
            color: 'rgba(0, 0, 0, 1)',
          },
        }),
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      width: '100px',
      fixed: 'left',
      customCell: () => ({
        style: {
          backgroundColor: 'rgba(31, 92, 184, 0.2)',
          color: 'rgba(0, 0, 0, 1)',
        },
      }),
    },
    {
      title: 'ПН',
       
      children: [
        {
          title: (
            <div className='w-20 flex justify-center items-center flex-col'>
               <div className='text-xs'>10:30 - 12:00</div>
               <Tooltip title="Подтвердить?"><Checkbox onChange={(e)=>handleCheckboxChange(e,'10:30 - 12:00')} /></Tooltip>
            </div>
          ),
          dataIndex: 'age2',
          editable: true,
          key: 'age',
          width: '10%',

         
          
        },
        {
          title: '12:00 - 13:40',
          dataIndex: 'age3',
          editable: true,
          key: 'age',
          width: '10%',
        }
        
      ],
    },
    {
      title: 'Октябрь',
      dataIndex: 'october',
      editable: true,
      width: '10%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },  
    {
      title: 'Ноябрь',
      dataIndex: 'november',
      editable: true,
      width: '10%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },
    {
      title: 'Декабрь',
      dataIndex: 'december',
      editable: true,
      width: '10%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },
    {
      title: 'Сумма баллов',
      dataIndex: 'address',
      editable: true,
      width: '10%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },
   
  ];

  const defaultColumnsTwo: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
        fixed: 'left',
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      width: '20%',
      fixed: 'left',
    },
    {
      title: 'Февраль',
      dataIndex: 'age',
      editable: true,
      width: '15%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },
    {
      title: 'Март',
      dataIndex: 'address',
      editable: true,
      width: '15%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },
    {
      title: 'Апрель',
      dataIndex: 'address',
      editable: true,
      width: '15%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },
    {
      title: 'Май',
      dataIndex: 'address',
      editable: true,
      width: '15%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
    },
    {
      title: 'Сумма баллов',
      dataIndex: 'address',
      editable: true,
      width: '10%',
      render:(text:any)=>{
        return(
         <div> {truncateString(2,text)}</div>
        )
      }
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
    <div  className='mt-4 custom-table-container' >
      <Table<DataType> 
        rowKey={(record) => record.key}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
        
        scroll={{ x: 'max-content' }}
      />
      <Button className='mt-4 mb-4 rounded-xl' type='primary'>{t('Save')}</Button>
    </div>
  );
};

export default TableBrs;