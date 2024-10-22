import React, { useContext, useEffect, useRef, useState } from 'react';
import { Table, Form, Select } from 'antd';
import type { TableProps } from 'antd';

const EditableContext = React.createContext<any>(null);

const optionMock = [
  { value: 'Высокий', label: 'Высокий' },
  { value: 'Средний', label: 'Средний' },
  { value: 'Низкий', label: 'Низкий' },
  { value: 'Ниже порогового уровня', label: 'Ниже порогового уровня' }
];

const optionMockTwo = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
];

interface Item {
  competenceId: number;
  competenceName: string;
  competenceLevel: string | null;
  competenceGrade: string | null;
}

const EditableRow: React.FC<any> = ({ index, ...props }) => {
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
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const form = useContext(EditableContext);

  const save = async (value: any) => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, [dataIndex]: value });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        initialValue={record[dataIndex]}
      >
        <Select
		
          options={dataIndex === 'competenceGrade' ? optionMockTwo : optionMock}
          className="w-32"
          size="large"
          allowClear
          onChange={save}
        />
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type ColumnTypes = Exclude<TableProps<Item>['columns'], undefined>;

interface StudentTableProps {
  dataSource: Item[];
  setDataSource: React.Dispatch<React.SetStateAction<Item[]>>;
  handleSave: (record: Item) => void;
}

const StudentTable: any = ({ dataSource, handleSave }:any) => {
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '№',
      className: 'text-xs !p-2',
      render: (text: any, record: any, index: number) => <div>{index + 1}</div>
    },
    {
      title: 'Компетенции',
      dataIndex: 'competenceName',
      width: '30%'
    },
    {
      title: 'Уровень сформированности компетенции',
      dataIndex: 'competenceLevel',
      editable: true,
    },
    {
      title: 'Оценка руководителя практики за компетенции',
      dataIndex: 'competenceGrade',
      editable: true
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div className="mt-5">
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
        rowKey={record => record.competenceId.toString()}
        locale={{
          emptyText: (
            <div>
              <h3>Идет загрузка...</h3>
            </div>
          )
        }}
      />
    </div>
  );
};

export default StudentTable;