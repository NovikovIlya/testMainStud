import { DatePicker, Form, Input, InputNumber, Select } from "antd";






// @ts-ignore
export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({editing,dataIndex,title,inputType,record,index,children,rules,...restProps}) => {
    // @ts-ignore
    const inputNode =  inputType === 'select'? <Select onChange={dispatch(sendPlace(value))} options={restProps.options} /> : inputType === 'date' ? <DatePicker.RangePicker/>  : inputType === 'number' ? <InputNumber min={0} /> : <Input />;
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={rules}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };