import React, { useContext, useEffect, useRef, useState } from "react";
import type { FormInstance, InputRef } from "antd";
import { 
  Button, 
  Checkbox, 
  Form, 
  Input, 
  Select, 
  Table, 
  Tooltip 
} from "antd";
import { t } from "i18next";
import { useAppDispatch } from "../../../../../store";
import { setIsEditTableScheduleTeacher } from "../../../../../store/reducers/authSlice";
import type { EditableCellProps, EditableRowProps } from "../../../../../models/tables";
import { StopOutlined } from "@ant-design/icons";
import i18n from "../../../../../18n";

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
  const form = useContext(EditableContext)!;
  const cellRef = useRef<HTMLTableCellElement>(null);
  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (editing) {
      selectRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (editing) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        console.log('selectRef',selectRef.current)
        if (cellRef.current &&!cellRef.current.contains(target) && selectRef.current === null ) {
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
    form.setFieldsValue({ [dataIndex]: record[dataIndex] || "" });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  const getOptionalLabel = (val:any)=>{
    if(i18n.language === 'ru') {
      if(val==='б'){
        return  'б'
      }
      if(val==='н') {
        return 'н'
      }
    }
    if(i18n.language === 'en') {
      if(val==='б'){
        return  'i'
      }
      if(val==='н') {
        return 'a'
      }
    }
  }
  const options=[
    { value: null, label: "" },
    { value: "б", label: t('b') },
    { value: "н", label: t('n')},
  ]
  const optionsMap = new Map(options.map(opt => [opt.value, opt.label]));

  let childNode = children;
  console.log('children',children)
  if (editable) {
    childNode = record.isBlocked === false ? (
      editing ? (
        <Form.Item
          style={{ margin: 0, width: "auto" }}
          name={dataIndex}
          rules={[{ required: false }]}
        >
          <Select
            open
            ref={selectRef}
            allowClear
            className="w-[50px]"
            onBlur={save}
            onChange={save}
            options={[
              { value: null, label: "" },
              { value: "б", label: t('b') },
              { value: "н", label: t('n')},
            ]}
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap truncate h-8 text-center"
          style={{ 
            width: "auto", 
            minHeight: "22px", 
            cursor: "pointer" 
          }}
          onClick={toggleEdit}
        >
          {/* @ts-ignore */}
          {optionsMap.get(children?.[1]) || children}
        </div>
      )
    ) : (
      <Tooltip title={"Ячейка заблокирована"}>
        <div
          className="editable-cell-value-wrap truncate h-8 backdrop-blur-sm text-center opacity-60"
          style={{
            width: "auto",
            minHeight: "22px",
            cursor: "pointer",
          }}
          onClick={toggleEdit}
        >
          {/* @ts-ignore */}
          {children?.[1] ? optionsMap.get(children?.[1]) || children : <StopOutlined className="opacity-30" />}
        </div>
      </Tooltip>
    );
  }

  return <td ref={cellRef} {...restProps}>{childNode}</td>;
};

const TableJournalPos = ({ collapsed, setCheckboxValue, dataSource, setDataSource }: any) => {
  // @ts-ignore
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .editable-cell-value-wrap {
        padding: 5px 12px;
        cursor: pointer;
      }
      .editable-row:hover .editable-cell-value-wrap {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
 

  const groupByDate = (data: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    data.forEach((student) => {
      student.attendance.forEach((att: any) => {
        if (!grouped[att.date]) grouped[att.date] = [];
        if (!grouped[att.date].find(x => x.time === att.time && x.timeIntervalId === att.timeIntervalId)) {
          grouped[att.date].push({
            time: att.time,
            timeIntervalId: att.timeIntervalId,
            weekDay: att.weekDay,
            columnNumber: att.columnNumber,
            isBlocked: att.isBlocked,
          });
        }
      });
    });
    return grouped;
  };

  const generateColumns = (groupedByDate: { [key: string]: any[] }) => {
    const weekDayNames = ["", t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday'), t('sunday')];

    
    const baseColumns = [
      {
        title: "N",
        dataIndex: "N",
        width: "60px",
        fixed: "left",
        customCell: () => ({
          style: {
            backgroundColor: "rgba(31, 92, 184, 0.2)",
            color: "rgba(0, 0, 0, 1)",
          },
        }),
        render: (_:any, __:any, index:any) => index + 1,
      },
      {
        title: t('fioStudent'),
        dataIndex: "studentName",
        width: "200px",
        fixed: "left",
        customCell: () => ({
          style: {
            backgroundColor: "rgba(31, 92, 184, 0.2)",
            color: "rgba(0, 0, 0, 1)",
          },
        }),
      },
    ];

    const dateColumns = Object.entries(groupedByDate).map(([date, times]) => {
      const weekDay = times[0]?.weekDay;
      return {
        title: (
          <div className="flex flex-col items-center">
            <div className="text-[12px]">{date}</div>
            <div className="text-[10px] text-gray-600">({weekDayNames[weekDay]})</div>
          </div>
        ),
        children: times.map((timeInfo: any) => ({
          title: (
            <div className="flex justify-center items-center flex-col">
              <div className="text-[10px] text-center mb-2">{timeInfo.time}</div>
              {timeInfo.isBlocked === false && (
                <Tooltip title="Подтвердить?">
                  <Checkbox 
                    onChange={(e) => handleCheckboxChange(e, { date, ...timeInfo })}
                  />
                </Tooltip>
              )}
            </div>
          ),
          dataIndex: `status_${date}_${timeInfo.timeIntervalId}`,
          width: "80px",
          editable: true,
          render: (status: string | null, record: any) => ({
            children: status || "",
            props: {
              columnNumber: timeInfo.columnNumber,
              isBlocked: timeInfo.isBlocked,
            },
          }),
        })),
      };
    });

    return [...baseColumns, ...dateColumns];
  };

  const transformDataForTable = (data: any[]) => {
    return data.map((student) => {
      const row: any = {
        key: student.studentId,
        studentName: student.studentName,
      };
      student.attendance.forEach((att: any) => {
        const key = `status_${att.date}_${att.timeIntervalId}`;
        row[key] = att.status || "";
        row[`${key}_columnNumber`] = att.columnNumber;
      });
      return row;
    });
  };

  const handleCheckboxChange = (e: any, dateInfo: any) => {
    const { checked } = e.target;
    setCheckboxValue((prev: any) => {
      if (checked) {
        const existingIndex = prev.findIndex((item:any) => 
          item.date === dateInfo.date && 
          item.time === dateInfo.time && 
          item.timeIntervalId === dateInfo.timeIntervalId
        );
        return existingIndex === -1 ? [...prev, { ...dateInfo, checked }] : prev;
      } else {
        return prev.filter((item:any) => 
          !(item.date === dateInfo.date && 
            item.time === dateInfo.time && 
            item.timeIntervalId === dateInfo.timeIntervalId)
        );
      }
    });
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => item.studentId === row.key);
    if (index > -1) {
      const student = newData[index];
      let hasChanges = false;
      const newAttendance = student.attendance.map((att: any) => {
        const statusKey = `status_${att.date}_${att.timeIntervalId}`;
        if (row[statusKey] !== undefined && att.status !== row[statusKey]) {
          hasChanges = true;
          return { ...att, status: row[statusKey] };
        }
        return att;
      });
      if (hasChanges) {
        const updatedStudent = { ...student, attendance: newAttendance };
        newData[index] = updatedStudent;
        setDataSource([...newData]);
      }
    }
  };

  const groupedDates = groupByDate(dataSource);
  const columns = generateColumns(groupedDates);
  const transformedData = transformDataForTable(dataSource);

  const modifiedColumns = columns.map(col => {
    // @ts-ignore
    if (col?.children) {
      return {
        ...col,
        // @ts-ignore
        children: col.children.map((childCol:any) => {
          if (childCol.editable) {
            return {
              ...childCol,
              onCell: (record: any) => {
                const parts = childCol.dataIndex.split("_");
                const date = parts[1];
                const timeIntervalId = parts[2];
                const att = dataSource.find((s:any) => s.studentId === record.key)?.attendance.find((a:any) => 
                  a.date === date && a.timeIntervalId === timeIntervalId
                ) || {};
                
                return {
                  record: {
                    ...record,
                    columnNumber: att.columnNumber,
                    isBlocked: att.isBlocked,
                  },
                  editable: childCol.editable,
                  dataIndex: childCol.dataIndex,
                  title: childCol.title,
                  handleSave,
                };
              },
            };
          }
          return childCol;
        }),
      };
    }
    return col;
  });

  const width = `calc(100vw - ${collapsed ? '240px' : '350px'})`;

  return (
    <div style={{ width }} className="mt-4">
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={transformedData}
        // @ts-ignore
        columns={modifiedColumns}
        pagination={false}
        className=" "
        scroll={{ x: 'max-content', y: '50vh' }}
      />
    </div>
  );
};

export default TableJournalPos;