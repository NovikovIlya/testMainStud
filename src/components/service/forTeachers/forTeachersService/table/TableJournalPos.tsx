

import React, { useContext, useEffect, useRef, useState } from "react"
import type { FormInstance, InputRef } from "antd"
import { Button, Checkbox, Form, Input, Select, Table, Tooltip } from "antd"
import { t } from "i18next"
import { useAppDispatch } from "../../../../../store"
import { setIsEditTableScheduleTeacher } from "../../../../../store/reducers/authSlice"
import type { EditableCellProps, EditableRowProps } from "../../../../../models/tables"

const EditableContext = React.createContext<FormInstance<any> | null>(null)

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
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
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!
  const selectRef = useRef<any>(null);

 
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] || "" })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode = children
  
  

  if (editable) {
    // @ts-ignore
    childNode = record.columnNumber!==4 ? editing ? (
      <Form.Item style={{ margin: 0, width: "auto" }} name={dataIndex} rules={[{ required: false }]}>
        {/* <Input  className="w-[35px]" ref={inputRef} onPressEnter={save} onBlur={save} /> */}
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
        className="editable-cell-value-wrap truncate"
        style={{ width: "auto", minHeight: "22px", cursor: "pointer" }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    ) : <Tooltip title={'ыы'}><div
    className="editable-cell-value-wrap truncate "
    style={{ width: "auto", minHeight: "22px", cursor: "pointer" }}
    onClick={toggleEdit}
  >
    {children}
  </div></Tooltip>
  }

  return <td {...restProps}>{childNode}</td>
}

const TableBrs = ({collapsed,setCheckboxValue, dataSource, setDataSource }: any) => {
  

  // Добавляем стили для редактируемых ячеек
  useEffect(() => {
    const style = document.createElement("style")
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
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Функция для группировки по датам
  const groupByDate = (data: any[]) => {
    const grouped: { [key: string]: any[] } = {}
    data.forEach((student) => {
      student.attendance.forEach((att: any) => {
        if (!grouped[att.date]) {
          grouped[att.date] = []
        }
        if (!grouped[att.date].find((x: any) => x.time === att.time && x.timeIntervalId === att.timeIntervalId)) {
          grouped[att.date].push({
            time: att.time,
            timeIntervalId: att.timeIntervalId,
            weekDay: att.weekDay,
            columnNumber:att.columnNumber,
          })
        }
      })
    })
    return grouped
  }

  // Создаем колонки на основе сгруппированных данных
  const generateColumns = (groupedByDate: { [key: string]: any[] }) => {
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
        render: (_: any, __: any, index: number) => index + 1,
      },
      {
        title: "ФИО",
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
    ]

    // Добавляем колонки для каждой даты
    const weekDayNames = ["", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    const dateColumns = Object.entries(groupedByDate).map(([date, times]) => {
      // Берем день недели из первого элемента массива times
      const weekDay = times[0]?.weekDay
      console.log('times',times)
      return {
        title: (
          <div className="flex flex-col items-center">
            <div className="text-[12px]">{date}</div>
            <div className="text-[10px] text-gray-600">({weekDayNames[weekDay]})</div>
          </div>
        ),
        children: times.map((timeInfo: any) => ({
          title: (
            <div className=" flex justify-center items-center flex-col">
              <div className="text-[10px] text-center mb-2">{timeInfo.time}</div>
              {timeInfo.columnNumber!==4 ?<Tooltip title="Подтвердить?">
                <Checkbox onChange={(e) => handleCheckboxChange(e, { date, ...timeInfo })} />
              </Tooltip> : ''}
            </div>
          ),
          dataIndex: `status_${date}_${timeInfo.timeIntervalId}`,
          width: "80px",
          editable: true,
          // render: (status: string | null) => status || "",
          render: (status: string | null, record: any) => {
            // Добавляем columnNumber в record для каждой ячейки
            return {
              children: status || "",
              props: {
                columnNumber: timeInfo.columnNumber,
              },
            }
          },
        })),
      }
    })

    return [...baseColumns, ...dateColumns]
  }

  // Преобразуем данные для таблицы
  const transformDataForTable = (data: any[]) => {
    return data.map((student) => {
      const row: any = {
        key: student.studentId,
        studentName: student.studentName,
      }

      student.attendance.forEach((att: any) => {
        const key = `status_${att.date}_${att.timeIntervalId}`
        row[key] = att.status || ""

        // Добавляем columnNumber для каждой ячейки
        row[`${key}_columnNumber`] = att.columnNumber
      })

      return row
    })
  }


  const handleCheckboxChange = (e: any, dateInfo: any) => {
    const { checked } = e.target;
    console.log("Checkbox changed:", checked, dateInfo);

    setCheckboxValue((prev: any) => {
      if (checked) {
        // Если чекбокс выбран, добавляем его в массив
        const existingIndex = prev.findIndex((item: any) => {
          return item.date === dateInfo.date && item.time === dateInfo.time && item.timeIntervalId === dateInfo.timeIntervalId;
        });

        if (existingIndex === -1) {
          return [...prev, { ...dateInfo, checked: checked }];
        }
        return prev; // Уже есть в массиве, ничего не делаем
      } else {
        // Если чекбокс снят, удаляем его из массива
        return prev.filter((item: any) => {
          return !(item.date === dateInfo.date && item.time === dateInfo.time && item.timeIntervalId === dateInfo.timeIntervalId);
        });
      }
    });
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => item.studentId === row.key)

    if (index > -1) {
      const student = newData[index]
      let hasChanges = false

      // Создаем новый массив attendance с обновленными значениями
      const newAttendance = student.attendance.map((att: any) => {
        const statusKey = `status_${att.date}_${att.timeIntervalId}`

        if (row[statusKey] !== undefined && att.status !== row[statusKey]) {
          hasChanges = true
          // Создаем новый объект attendance с обновленным status
          return {
            ...att,
            status: row[statusKey],
          }
        }

        return att
      })

      if (hasChanges) {
        // Создаем новый объект студента с обновленным массивом attendance
        const updatedStudent = {
          ...student,
          attendance: newAttendance,
        }

        // Обновляем массив данных с новым объектом студента
        newData[index] = updatedStudent
        setDataSource([...newData])
       
      }
    }
  }

  const groupedDates = groupByDate(dataSource)
  const columns = generateColumns(groupedDates)
  const transformedData = transformDataForTable(dataSource)

  // Модифицируем компонент Table, чтобы сделать ячейки редактируемыми
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  // Модифицируем columns для поддержки редактирования
  // const modifiedColumns = columns.map((col) => {
  //   // @ts-ignore
  //   if (col?.children) {
  //     return {
  //       ...col,
  //        // @ts-ignore
  //       children: col?.children.map((childCol) => {
  //         if (childCol.editable) {
  //           return {
  //             ...childCol,
  //             onCell: (record: any) => ({
  //               record,
  //               editable: childCol.editable,
  //               dataIndex: childCol.dataIndex,
  //               title: childCol.title,
  //               handleSave,
  //             }),
  //           }
  //         }
  //         return childCol
  //       }),
  //     }
  //   }
  //   return col
  // })

  const modifiedColumns = columns.map((col) => {
    // @ts-ignore
    if (col?.children) {
      return {
        ...col,
        // @ts-ignore
        children: col?.children.map((childCol) => {
          if (childCol.editable) {
            return {
              ...childCol,
              onCell: (record: any) => {
                // Получаем columnNumber для текущей ячейки
                const dataIndex = childCol.dataIndex
                const parts = dataIndex.split("_")
                const date = parts[1]
                const timeIntervalId = parts[2]

                // Находим соответствующую запись в attendance
                const attendance = dataSource.find((s:any) => s.studentId === record.key)?.attendance || []
                const att = attendance.find((a:any) => a.date === date && a.timeIntervalId === timeIntervalId)

                return {
                  record: {
                    ...record,
                    columnNumber: att?.columnNumber, // Добавляем columnNumber в record
                  },
                  editable: childCol.editable,
                  dataIndex: childCol.dataIndex,
                  title: childCol.title,
                  handleSave,
                }
              },
            }
          }
          return childCol
        }),
      }
    }
    return col
  })
  console.log('collapsed',collapsed)
  const width = `calc(100vw - ${collapsed ? '240px' : '370px'})`;
  // В return заменяем columns на modifiedColumns
  return (
    <div style={{ width }} className={`mt-4 `}>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={transformedData}
        // @ts-ignore
        columns={modifiedColumns}
        pagination={false}
        className=" "
        scroll={{ x: 'max-content', y: '50vh' }}
      />
      {/* <Button className="mt-4 mb-4 rounded-xl" type="primary">
        {t("Save")}
      </Button> */}
    </div>
  )
}

export default TableBrs

