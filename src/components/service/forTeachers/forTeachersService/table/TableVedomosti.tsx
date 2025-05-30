import React, { useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, InputRef } from 'antd';
import { Form, Input, Table } from 'antd';
import { useAppDispatch } from '../../../../../store';
import { setIsEditTableScheduleTeacher } from '../../../../../store/reducers/authSlice';
import { DataType, EditableCellProps, EditableRowProps } from '../../../../../models/tables';
import { truncateString } from '../../../../../utils/truncateString';
import TextArea from 'antd/es/input/TextArea';
import { t } from 'i18next';


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
  inputType,
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
        style={{ margin: 0 ,width:'auto',padding:0}}
        name={dataIndex}
        className='  '
        // rules={[{ required: true, message: `${title} является обязательным.` }]}
      >
        {/* <Input className='!oveflow-auto h-40'  type={inputType || 'text'}  ref={inputRef} onPressEnter={save} onBlur={save} /> */}
       { /* @ts-ignore  */ }
        {dataIndex === 'subjectComments' ? (
        <TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{ }}
          ref={inputRef}
          onBlur={save}
          className='w-[121px]'
          
      />
    ) : (
      <Input
        type={inputType || 'text'}
        ref={inputRef}
        onPressEnter={save}
        onBlur={save}
      />
    )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap min-h-[27px]"
        style={{ paddingInlineEnd: 24 ,width:'auto'}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};



const TableVedomosti = ({kindForm,dataSource, setDataSource,subj_type,is_session}: any) => {
  const dispatch = useAppDispatch()

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
      title: t('otmetka'),
      dataIndex: 'semesterMark',
      width: '10%',
    },
    {
      title: `${t('otm')} ${kindForm==='e' ? t('exam') : kindForm === 'q' ? t('Credit') : t('difcredit')}`,
      dataIndex: 'subjectMark',
      editable: true,
      width: '10%',
      inputType: 'number',
    },  
    {
      title: t('rateDisc'),
      dataIndex: 'subjectRate',
      width: '15%',
    },
    {
      title: t('itog'),
      dataIndex: 'subjectMarkvalue',
      width: '25%',
      render: (text: any) => {
        return (
          <div className='flex flex-wrap  items-center '>
            {text==='удовлетворительно' || text==='satisfactorily' ? <div className='rounded-xl bg-yellow-400 w-[10px] h-[10px]' ></div> : <div ></div>}
            {text==='не зачтено' || text==='not credited'? <div className='rounded-xl bg-yellow-500 w-[10px] h-[10px]' ></div> : <div ></div>}
            
            {text==='отлично'  ? <div className='rounded-xl bg-red-500 w-[10px] h-[10px]' ></div> : <div ></div>}
            {text==='excellent' ? <div className='rounded-xl bg-red-500 w-[10px] h-[10px]' ></div> : <div ></div>}

            {(text==='зачтено')? <div className='rounded-xl bg-green-500 w-[10px] h-[10px]' ></div> : <div ></div>}
            {(text==='credited')? <div className='rounded-xl bg-green-500 w-[10px] h-[10px]' ></div> : <div ></div>}

            {text==='не сдает' ||text=== "doesn't pass" ? <div className='rounded-xl bg-gray-300 w-[10px] h-[10px]' ></div> : <div ></div>}
            {text==='не удовлетворительно' || text==='unsatisfactory'? <div className='rounded-xl bg-yellow-500 w-[10px] h-[10px]' ></div> : <div ></div>}
            {text==='хорошо' || text==='good'? <div className='rounded-xl bg-green-500 w-[10px] h-[10px]' ></div> : <div ></div>}
            <div className='ml-2'>{text}</div>
          </div>
        );
      }
    },
    {
      title: 'Комментарии',
      dataIndex: 'subjectComments',
      editable: true,
      width: '10%',
      className: ' !truncate',
      render:(text:any)=>{
        return(
         <div className='oveflow-auto'> {truncateString(10,text)}</div>
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

  const columns =  
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
        inputType: col.inputType,
      }),
    };
  })  

  return (
    <div className='mt-4 styleCustom'>
      <Table
        rowKey={(record) => record.key}
        components={components}
        rowClassName={() => 'editable-row '}
        bordered
        dataSource={dataSource}
        columns={columns}
        className=''
        pagination={false}
        size='large'
      
      />
      {/* <Button className='top-[-50px] rounded-xl' type='primary'>{t('Save')}</Button> */}
    </div>
  );
};

export default TableVedomosti;