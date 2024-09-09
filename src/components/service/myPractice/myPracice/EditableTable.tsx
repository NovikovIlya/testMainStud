import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.css';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Calendar, DatePicker, Form, Input, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

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

//   const save = async () => {
//     try {
//       const values = await form.validateFields();

//       toggleEdit();
//       handleSave({ ...record, ...values });
//     } catch (errInfo) {
//       console.log('Save failed:', errInfo);
//     }
//   };

const save = (date: any) => {
    console.log(date)
    if (date ) {
      toggleEdit();
      handleSave({ ...record, [dataIndex]: date });
    } else {
      console.error('Invalid date:', date);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <DatePicker.RangePicker
        //  onChange={save}
         format={'DD.MM.YYYY'}
         placeholder={['Начало', 'Конец']}
         className="w-full"
         size={'large'}
         allowClear
         onChange={save}
   
         />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
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

type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const EditableTable = ({setIsDisabled}:any) => {

  const [dataSource, setDataSource] = useState<any>([
    {
      key: '0',
      name: 'Edward King 0',
      age:  null,
      address: 'London, Park Lane no. 0',
     
    }
   
  ]);


  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        key: 'number',
        dataIndex: 'number',
        title: '№',
        className: 'text-xs !p-2',
        render: (text: any, record: any, index: any) => <div>{index + 1}</div>
    },
    {
      title: 'Индивидуальные задания',
      dataIndex: 'name',
      width: '30%',
    
    },
    {
      title: 'Период выполнения',
      dataIndex: 'age',
      editable: true,
      render: (_: any, record: any) => <div className={'flex items-center gap-3 h-8'}>
      <span>{record?.age ? dayjs(record?.age?.[0]).format('DD.MM.YYYY') : null}</span>{record?.age ? '-' : null}
      <span>{record?.age ?dayjs(record?.age?.[1]).format('DD.MM.YYYY'): null}</span>
     </div>
    },
  ];


  const areAllCellsFilled = () => {
    return dataSource.every((item:any) => 
      item.name && item.age && item.age.length === 2 && item.address
    );
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);



  };

  if (areAllCellsFilled()) {
    setIsDisabled(false); // Включаем кнопку или действие
  } else {
    setIsDisabled(true); // Отключаем кнопку или действие
    }

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

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
    </div>
  );
};

export default EditableTable;