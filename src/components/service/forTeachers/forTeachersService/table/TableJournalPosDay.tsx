import React, { useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, GetRef, InputRef, TableProps } from 'antd';
import { Button, Checkbox, Form, Input, Popconfirm, Select, Table, Tooltip } from 'antd';
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

// const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef<InputRef>(null);
//   const form = useContext(EditableContext)!;
//   const selectRef = useRef<any>(null);
  
//   useEffect(() => {
//     if (editing) {
//       inputRef.current?.focus();
//     }
//   }, [editing]);

//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({ [dataIndex]: record[dataIndex] });
//   };

//   const save = async () => {
//     try {
//       const values = await form.validateFields();
    
//       toggleEdit();
//       // @ts-ignore
//       handleSave({ ...record, ...values });
//     } catch (errInfo) {
//       console.log('Save failed:', errInfo);
//     }
//   };

//   let childNode = children;

//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{ margin: 0 ,width:'auto'}}
//         name={dataIndex}
        
//       >
//         {/* <Input  ref={inputRef} onPressEnter={save} onBlur={save} /> */}
//         <Select
//         allowClear
//         open
//     className="w-[50px]"
//     ref={selectRef}
//     onBlur={save}
//     onChange={save}
//     options={[
//       { value: null, label: '' },
//       { value: 'б', label: 'б' },
//       { value: 'н', label: 'н' }
//     ]}
//   />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap h-8"
//         style={{ paddingInlineEnd: 24 ,width:'auto'}}
//         onClick={toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   }

//   return <td {...restProps}>{childNode}</td>;
// };
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  // @ts-ignore
  fixDay,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;
  const cellRef = useRef<HTMLTableCellElement>(null);
  const selectRef = useRef<any>(null);
  console.log('record',record)
  useEffect(() => {
    if (editing) {
      selectRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (editing) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        console.log('selectRef',selectRef)

        if ( cellRef.current && !cellRef.current.contains(target) && selectRef.current === null) {
          toggleEdit();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [editing, cellRef]);

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
  const options=[
    { value: null, label: "" },
    { value: "б", label: t('b') },
    { value: "н", label: t('n')},
  ]
  const optionsMap = new Map(options.map(opt => [opt.value, opt.label]));
  let childNode = children;

  if (editable) {
    childNode = fixDay===null ? editing  ? (
      <Form.Item
        style={{ margin: 0, width: 'auto' }}
        name={dataIndex}
      >
        
        <Select
          allowClear
          open
          className="w-[50px]"
          ref={selectRef}
          onBlur={save}
          onChange={save}
          options={[
            { value: null, label: '' },
            { value: 'б', label: 'б' },
            { value: 'н', label: 'н' }
          ]}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap h-8"
        style={{ paddingInlineEnd: 24, width: 'auto' }}
        onClick={toggleEdit}
      >
          {/* @ts-ignore */}
          {optionsMap.get(children?.[1]) || children}
      </div>
    ) :  <div
    className="editable-cell-value-wrap h-8 "
    style={{ paddingInlineEnd: 24, width: 'auto' }}
    onClick={toggleEdit}
  >
      {/* @ts-ignore */}
      {optionsMap.get(children?.[1]) || children}
  </div>
  }

  return <td ref={cellRef} {...restProps}>{childNode}</td>;
};


const TableJournalPosDay = ({fixDay,dataSource, setLocalData}:any) => {
  const dispatch = useAppDispatch()

  function handleCheckboxChange(e:any,text:any)  {
    console.log(e.target.checked,text)
  }
  const defaultColumns: any = [
    {
        title: 'N',
        dataIndex: 'N',
        width: '10%',
        fixed: 'left',
        render: (text:any, record:any, index:any) => index + 1,
    },
    {
      title: t('fioStudent'),
      dataIndex: 'studentName',
      width: '20%',
      fixed: 'left',
    },
   
    {
      title: t('ychet'),
      dataIndex: 'visitType',
      editable: true,
      width: '15%',
      render: (text:any, record:any, index:any) => {
        return (
          <div>
            {text===null?'':text}
          </div>
        );
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
      setLocalData(newData);

      // Отправка действия, если есть изменения
      // if (hasChanges) {
      //   dispatch(setIsEditTableScheduleTeacher(true));
      // }
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
        fixDay
      }),
    };
  }) 
   

  return (
    <div className={`${fixDay!==null ?'opacity-40':''} mt-4`}>
      <Table<DataType>
        
        rowKey={(record) => record.key}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource?.map((item:any, index:any) => ({
          ...item,
          key: item?.studentId,
        }))}
        columns={columns as ColumnTypes}
        locale={{ emptyText: t('noData') }}
        pagination={false}
      
      />
    
    </div>
  );
};

export default TableJournalPosDay;