import React, {ReactNode} from 'react';
import {Button, ConfigProvider, Table, TableProps} from "antd";
import {EditSvg} from "../../../../assets/svg/EditSvg";
import {PointsSvg} from "../../../../assets/svg/PointsSvg";

interface TablePracticeSchedule {
    key: string
    cipherNameSpecialty: string
    academicYear: string
    course: number
    numberGroup: string
    levelEducation: string
    formEducation: string
    kindPractice: string
    typePractice: string
    practicePeriod: string

}

const columnsTableSchedule: TableProps<TablePracticeSchedule>['columns'] = [
    {
        title: 'Шифр и наименование специальности',
        dataIndex: 'cipherNameSpecialty',
        align: "left",
        width: 300,
        render:
            (text, record) =>
                <div className={'flex items-center'}>
                    <span className={'font-bold underline flex w-[100px]'}>
                        {text}
                    </span>
                    <Button
                        type="text"
                        icon={<EditSvg/>}
                        onClick={() => console.log(record.key)}
                    />
                </div>
    },
    {
        title: 'Учебный год',
        dataIndex: 'academicYear',
        align: "left",
        width: 200
    },
    {
        title: 'Курс',
        dataIndex: 'course',
        align: "left",
        width: 200
    },
    {
        title: 'Номер группы',
        dataIndex: 'numberGroup',
        align: "left",
        width: 200
    },
    {
        title: 'Уровень образования',
        dataIndex: 'levelEducation',
        align: "left",
        width: 200
    },
    {
        title: 'Форма обучения',
        dataIndex: 'formEducation',
        align: "left",
        width: 200
    },
    {
        title: 'Вид практики',
        dataIndex: 'kindPractice',
        align: "left",
        width: 200
    },
    {
        title: 'Тип практики',
        dataIndex: 'typePractice',
        align: "left",
        width: 200
    },
    {
        title: 'Период практики',
        dataIndex: 'practicePeriod',
        align: "left",
        width: 200
    },
    {
        title:
            <Button
                type="text"
                className="opacity-50"
                icon={<PointsSvg/>}
            />,
        width: 200,
        align: 'left',
        render: (record) =>
            <Button
                type="text"
                className="opacity-50"
                icon={<PointsSvg/>}
                onClick={() => console.log(record.key)}
            />,
    }
]

export const TableView = () => {

    const dataTable: TablePracticeSchedule[] = [
        {
            key: '1',
            cipherNameSpecialty: '31.08.01 Акушерство и гинекология',
            academicYear: '2022/2023',
            course: 1,
            numberGroup: '-',
            levelEducation: 'Ординатура',
            formEducation: 'Очная',
            kindPractice: 'Производственная',
            typePractice: 'Производственная (клиническая) практика: акушерство и гинекология',
            practicePeriod: '30.03.2023 - 10.04.2023',
        },
        {
            key: '2',
            cipherNameSpecialty: '31.08.01 Акушерство и гинекология',
            academicYear: '2022/2023',
            course: 1,
            numberGroup: '-',
            levelEducation: 'Ординатура',
            formEducation: 'Очная',
            kindPractice: 'Производственная',
            typePractice: 'Производственная (клиническая) практика: акушерство и гинекология',
            practicePeriod: '30.03.2023 - 10.04.2023',
        }
    ]

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {}
                }
            }}
        >
            <Table
                rowSelection={{type: "checkbox",}}
                columns={columns}
                pagination={false}
                size={'middle'}
                dataSource={dataTable}
            />
        </ConfigProvider>

    );
};

