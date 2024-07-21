import {
    Button,
    Checkbox,
    List,
    Space,
    Typography
} from 'antd'
import type {CheckboxProps, GetProp} from 'antd'
import {useEffect, useState} from 'react'

import {EditSvg} from '../../../../assets/svg/EditSvg'
import {PointsSvg} from '../../../../assets/svg/PointsSvg'

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number]

interface DataType {
    key: string
    specialization: string
    fillingDate: string
    type: string
    course: string
    academicYear: string
    group: string
    educationLevel: string
    educationForm: string
    sybtypePractice: string
    periodPractice: string
}

const data: DataType[] = [
    {
        key: '1',
        specialization: 'Лечебно-профилактическое учреждение по договору',
        fillingDate: '00.00.00, 00:00',
        type: 'Бессрочный',
        course: '1',
        academicYear: '2',
        group: '09-033',
        educationLevel: 'Ординатура',
        educationForm: 'Очная',
        sybtypePractice: 'Акушерство',
        periodPractice: '2020-2021'
    },
    {
        key: '2',
        specialization: 'Лечебно-профилактическое учреждение по договору',
        fillingDate: '00.00.00, 00:00',
        type: 'С пролонгацией',
        course: '2',
        academicYear: '2',
        group: '09-033',
        educationLevel: 'Ординатура',
        educationForm: 'Заочная',
        sybtypePractice: 'Акушерство',
        periodPractice: '2020-2021'
    }
]
const plainOptions = data.map(item => item.key)

export const CompressedView = () => {
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([])
    const checkAll = plainOptions.length === checkedList.length
    const indeterminate =
        checkedList.length > 0 && checkedList.length < plainOptions.length
    const [dataTable, setDataTable] = useState<DataType[]>(data)
    const [filters, setFilters] = useState<{
        type: string
        spec: string
        course: string
        level: string
        form: string
    }>({type: '', spec: '', course: '', level: '', form: ''})

    useEffect(() => {
        setDataTable(
            data.filter(
                x =>
                    x.type.includes(filters.type) &&
                    x.specialization.includes(filters.spec) &&
                    x.course.includes(filters.course) &&
                    x.educationLevel.includes(filters.level) &&
                    x.educationForm.includes(filters.form)
            )
        )
    }, [filters])


    const onCheckboxClick: CheckboxProps['onChange'] = e => {
        const item = e.target.value
        setCheckedList(prev =>
            checkedList.includes(item)
                ? prev.filter(x => x !== item)
                : [...prev, ...e.target.value]
        )
    }

    const onCheckAllClick: CheckboxProps['onChange'] = e => {
        setCheckedList(e.target.checked ? plainOptions : [])
    }


    return (
        <List
            size="large"
            header={
                <div className="w-full justify-between flex items-center px-[24px]">
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllClick}
                        checked={checkAll}
                    />
                    <Space size={40} className="max-w-xs min-w-[300px]">
                        <Typography.Text>
                            Шифр и наименование специальности
                        </Typography.Text>
                        <Button
                            type="text"
                            icon={<EditSvg/>}
                            className="opacity-0"
                        />
                    </Space>
                    <Typography.Text>Дата заполнения</Typography.Text>
                    <Typography.Text>Вид практики</Typography.Text>
                    <Typography.Text>Курс</Typography.Text>
                    <Space size={40}>
                        <Button type="text" icon={<PointsSvg/>}/>
                    </Space>
                </div>
            }
            dataSource={dataTable}
            renderItem={item => (
                <List.Item className="bg-white mb-3">
                    <Checkbox
                        checked={checkedList.includes(item.key)}
                        value={item.key}
                        onChange={onCheckboxClick}
                    />
                    <Space size={40} className="max-w-xs min-w-[300px]">
                        <Typography.Text>{item.specialization}</Typography.Text>
                        <Button
                            type="text"
                            icon={<EditSvg/>}
                            //onClick={() => setIsCreate(true)}
                        />
                    </Space>
                    <Typography.Text>{item.fillingDate}</Typography.Text>
                    <Typography.Text className={'text-center min-w-[100px]'}>{item.type}</Typography.Text>
                    <Typography.Text>{item.course}</Typography.Text>
                    <Space size={40}>
                        <Button
                            type="text"
                            className="opacity-50"
                            icon={<PointsSvg/>}
                        />
                    </Space>
                </List.Item>
            )}
        />
    );
};

