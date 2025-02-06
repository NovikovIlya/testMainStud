import { Form, GetRef, TableProps } from "antd";

export interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
  }

  export interface EditableRowProps {
    index: number;
  }


  export interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
    inputType?: string;
  }

  export interface DataType {
    key: React.Key;
    name: string;
    age: string;
    address: string;
  }

  export type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

  export type FormInstance<T> = GetRef<typeof Form<T>>;