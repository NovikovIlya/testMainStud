import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { EditableCellProps } from "../../../../models/representation";



export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({editing,dataIndex,title,inputType,record,index,children,...restProps}) => {
    // @ts-ignore
    const inputNode =  inputType === 'select'? <Select options={restProps.options} /> : inputType === 'date' ? <DatePicker.RangePicker/> 
    : inputType === 'number' ? <InputNumber /> : <Input />;
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Заполните "${title}"!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };