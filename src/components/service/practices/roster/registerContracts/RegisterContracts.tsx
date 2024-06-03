import {
    Button,
    Col,
    DatePicker,
    Input,
    InputNumber,
    Popover,
    Radio,
    Row,
    Select,
    Table,
    TableProps,
    Typography
} from 'antd'
import React, {ChangeEvent, useEffect, useState} from 'react'
import './RegisterContracts.scss'
import {
    TitleHeadCell
} from "../../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell";
import {EditSvg} from "../../../../../assets/svg/EditSvg";
import {PointsSvg} from "../../../../../assets/svg/PointsSvg";
import dayjs from "dayjs";
import clsx from "clsx";
import {RegisterPopoverContent} from "../../popover/register/RegisterPopoverContent";
import {RegisterPopoverMain} from "../../popover/register/RegisterPopoverMain";
import {useNavigate} from "react-router-dom";
import {
    useGetContractFacilitiesQuery,
    useGetContractsAllQuery,
    useGetContractsShortQuery,
    useGetSpecialtyNamesQuery
} from "../../../../../store/api/practiceApi/roster";
import {ContractFacilities, ContractsAll, ContractShort, NameSpecialty} from "../../../../../models/Practice";
import {copyFileDocument} from "../../../../../utils/downloadDocument/copyFileDocument";
import {agreementFileDocument} from "../../../../../utils/downloadDocument/agreementFileDocument";


export interface ColumnsTableCompressedView {
    id: string
    key: string
    contractFacility: string
    fillingDate: string
    contractType: string
    conclusionDate: string
}

interface Links {
    documentCopyId: string
    documentAgreementId: string
}

export interface ColumnsTableFull {
    id: string
    key: string
    contractFacility: string
    specialtyName: string
    contractNumber: string
    conclusionDate: string
    contractType: string
    endDate: string
    legalFacility: string
    actualFacility: string
    placesAmount: string
    prolongation: string | null
    links: Links
}

export interface OptionsNameSpecialty {
    value: string
    label: string
}


export const RegisterContracts = () => {
    const tokenAccess = localStorage.getItem('access')!.replaceAll('"', '')

    const {data: dataAll, isSuccess: isSuccessAll} = useGetContractsAllQuery()
    const {data: dataShort, isSuccess: isSuccessShort} = useGetContractsShortQuery()
    const nav = useNavigate()
    const [filter, setFilter] = useState({
        contractType: 'Все',
        nameOrg: 'Все',
        dateConclusionContract: 'Все',
        sortDateConclusionContract: 'По дате (сначала новые)',
        nameSpecialty: 'Все',
        numberSeats: 'Все',

    })
    const [
        tableDataCompressed,
        setTableDataCompressed
    ] = useState<ColumnsTableCompressedView[]>()
    const [
        tableDataFull,
        setTableDataFull
    ] = useState<ColumnsTableFull[]>()
    const [tableView, setTableView] = useState({
        compressed: true,
        table: false
    })
    const [
        selectedFieldsCompressed,
        setSelectedFieldsCompressed
    ] = useState<ColumnsTableCompressedView[]>()

    const [
        selectedFieldsFull,
        setSelectedFieldFull
    ] = useState<ColumnsTableFull[]>()

    function prolonAge(prolon: string) {
        if (prolon === '1') {
            return 'год'
        } else if (prolon === '2' || prolon === '3' || prolon === '4') {
            return 'года'
        } else if (prolon === '11' || prolon === '12') {
            return 'лет'
        } else if (prolon.length > 1 && prolon.at(-1) === '1') {
            return 'лет'
        } else if (prolon.at(-1) === '2' || prolon.at(-1) === '3' || prolon.at(-1) === '4') {
            return 'года'
        } else {
            return 'лет'
        }
    }

    function changeListDataAll(elem: ContractsAll) {
        const newElem: ColumnsTableFull = {
            id: elem.id,
            key: elem.id,
            contractFacility: elem.contractFacility,
            specialtyName: elem.specialtyName,
            contractNumber: elem.contractNumber,
            conclusionDate: elem.conclusionDate,
            contractType: elem.contractType,
            endDate: elem.endDate,
            legalFacility: elem.legalFacility,
            actualFacility: elem.actualFacility,
            placesAmount: elem.placesAmount,
            prolongation: elem.prolongation,
            links: {
                documentCopyId: elem.documentCopyId,
                documentAgreementId: elem.documentAgreementId
            },
        }
        return newElem
    }

    function changeListDataShort(elem: ContractShort) {
        const newElem: ColumnsTableCompressedView = {
            id: elem.id,
            key: elem.id,
            contractFacility: elem.contractFacility,
            fillingDate: elem.fillingDate,
            contractType: elem.contractType,
            conclusionDate: elem.conclusionDate
        }
        return newElem
    }

    function changeListNameSpecialty(list: NameSpecialty[]) {
        function changeElemNameSpecialty(elem: NameSpecialty) {
            const newElem: OptionsNameSpecialty = {
                value: elem.value,
                label: elem.label,
            }
            return newElem
        }
        const finalList: OptionsNameSpecialty[] = [{value: 'Все', label: 'Все'}]
        const newList: OptionsNameSpecialty[] = list.map(elem => changeElemNameSpecialty(elem))
        return finalList.concat(newList)
    }

    function changeListContractFacilities(list: ContractFacilities[]) {
        const finalList: ContractFacilities[] = [{value: 'Все', label: 'Все'}]
        return finalList.concat(list)
    }

    const columnsCompressedView: TableProps<ColumnsTableCompressedView>['columns'] = [
        {
            title: <TitleHeadCell title={'Наименование организации'}/>,
            dataIndex: 'contractFacility',
            align: "left",
            width: 150,
            render: (text, record) =>
                <div className={'flex items-center'}>
                    <span className={'underline flex w-[200px]'}>
                        {text}
                    </span>
                    <Button
                        type="text"
                        icon={<EditSvg/>}
                        onClick={() => {
                            nav(`/services/practices/registerContracts/editContract/${record.key}`)
                        }}
                    />
                </div>
        },
        {
            title: <TitleHeadCell title={'Дата заполнения'}/>,
            dataIndex: 'fillingDate',
            align: "center",
            width: 150,
            render: (value, record, index) => dayjs(value).format('DD.MM.YYYY')
        },
        {
            title: <TitleHeadCell title={'Тип договора'}/>,
            dataIndex: 'contractType',
            align: "center",
            width: 150

        },
        {
            title: <TitleHeadCell title={'Дата заключения договора'}/>,
            dataIndex: 'conclusionDate',
            align: "center",
            width: 150,
            render: (text) => dayjs(text).format('DD.MM.YYYY')
        },
        {
            title:
                <Popover trigger={'click'}
                         content={<RegisterPopoverMain
                             recordCompressed={selectedFieldsCompressed}
                             recordCompressedAll={tableDataCompressed}
                             setRecordCompressed={setTableDataCompressed}
                         />}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            width: 200,
            align: 'center',
            render: (record) =>
                <Popover content={<RegisterPopoverContent recordCompressed={record}
                                                          tableDataCompressed={tableDataCompressed}
                                                          setTableDataCompressed={setTableDataCompressed}/>}
                         trigger={'click'}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>
        }
    ]
    const columnsFullView: TableProps<ColumnsTableFull>['columns'] = [
        {
            title: <span className={'text-xs'}>Наименование организации</span>,
            dataIndex: 'contractFacility',
            align: "left",
            className: 'text-xs',
            width: 200,
            render: (text, record) =>
                <div className={'flex items-center'}>
                    <span className={'underline flex w-[150px]'}>
                        {text}
                    </span>
                    <Button
                        type="text"
                        icon={<EditSvg/>}
                        onClick={() => nav(`/services/practices/registerContracts/editContract/${record.key}`)}
                    />
                </div>
        },
        {
            title: <span className={'text-xs'}>Шифр и наименование специальности</span>,
            dataIndex: 'specialtyName',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Номер договора</span>,
            dataIndex: 'contractNumber',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Дата заключения договора</span>,
            dataIndex: 'conclusionDate',
            align: "center",
            className: 'text-xs',
            render: (text) => dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: <span className={'text-xs'}>Тип договора</span>,
            dataIndex: 'contractType',
            align: "center",
            className: 'text-xs',
            render: (value, record, index) =>
                <div className={'flex flex-col gap-2'}>
                    <span>{value}</span>
                    {record.prolongation && value !== 'Бессрочный'
                        &&
                        <span>
                            на {record.prolongation} {prolonAge(record.prolongation)}
                        </span>}
                </div>
        },
        {
            title: <span className={'text-xs'}>Срок действия договора</span>,
            dataIndex: 'endDate',
            align: "center",
            className: 'text-xs',
            render: (value, record, index) => dayjs(value).format('DD.MM.YYYY')
        },
        {
            title: <span className={'text-xs'}>Юридический адрес организации</span>,
            dataIndex: 'legalFacility',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Фактический адрес организации</span>,
            dataIndex: 'actualFacility',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Количество мест</span>,
            dataIndex: 'placesAmount',
            align: "center",
            className: 'text-xs'
        },
        {
            title: <span className={'text-xs'}>Ссылки</span>,
            dataIndex: 'links',
            align: "center",
            width: 100,
            className: 'text-xs',
            render: (value, record, index) =>
                <div className={'flex flex-col gap-2'}>
                    <a onClick={() => copyFileDocument(tokenAccess, record.links.documentCopyId)}>
                        Cкан договора
                    </a>
                    <a onClick={() => agreementFileDocument(tokenAccess, record.links.documentAgreementId)} >
                        Доп. соглашение к договору
                    </a>
                </div>
        },
        {
            title:
                <Popover trigger={'click'}
                         content={<RegisterPopoverMain
                             recordFull={selectedFieldsFull}
                             recordFullAll={tableDataFull}
                             setRecordFull={setTableDataFull}
                         />}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            align: 'center',
            render: (record) =>
                <Popover trigger={'click'}
                         content={<RegisterPopoverContent recordFull={record}
                                                          tableDataFull={tableDataFull}
                                                          setTableDataFull={setTableDataFull}/>}>
                    <Button
                        type="text"
                        className="opacity-50"
                        icon={<PointsSvg/>}
                    />
                </Popover>,
            fixed: "right",
            width: 50

        }
    ]


    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery()
    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(changeListNameSpecialty(dataNameSpecialty))
        }
    }, [dataNameSpecialty]);

    const [contractFacilities, setContractFacilities] = useState<ContractFacilities[]>()
    const {data: dataContractFacilities, isSuccess: isSuccessContractFacilities} = useGetContractFacilitiesQuery()
    useEffect(() => {
        if (isSuccessContractFacilities) {
            setContractFacilities(changeListContractFacilities(dataContractFacilities))
        }
    }, [dataContractFacilities]);

    const optionsTypeContract = [
        {value: 'Все', label: 'Все'},
        {value: 'Бессрочный', label: 'Бессрочный'},
        {value: 'С пролонгацией', label: 'С пролонгацией'}
    ]
    const optionsSort = [
        {value: 'По дате (сначала новые)', label: 'По дате (сначала новые)'},
        {value: 'По дате (сначала старые)', label: 'По дате (сначала старые)'},
    ]


    function isCompressedTable() {
        setTableView({
            compressed: true,
            table: false
        })
    }

    function isFullTable() {
        setTableView({
            compressed: false,
            table: true
        })
    }

    function setFilterDate(date: dayjs.Dayjs) {
        if (date) {
            setFilter({
                ...filter,
                dateConclusionContract: date.format('YYYY-MM-DD')
            })
        } else {
            setFilter({
                ...filter,
                dateConclusionContract: 'Все'
            })
        }
    }

    function setFilterNumberSeats(value: number | string | null) {
        if (value) {
            setFilter({
                ...filter,
                numberSeats: String(value)
            })
        } else {
            setFilter({
                ...filter,
                numberSeats: 'Все'
            })
        }
    }

    function filterDataCompressed() {
        function filterNameOrg(elem: ColumnsTableCompressedView) {
            if (filter.nameOrg === 'Все') {
                return elem
            } else {
                return elem.contractFacility === filter.nameOrg
            }
        }

        function filterContractType(elem: ColumnsTableCompressedView) {
            if (filter.contractType === 'Все') {
                return elem
            } else {
                return elem.contractType === filter.contractType
            }
        }

        function filterDateConclusionContract(elem: ColumnsTableCompressedView) {
            if (filter.dateConclusionContract === 'Все') {
                return elem
            } else {
                return elem.conclusionDate === filter.dateConclusionContract
            }
        }

        function sortDateConclusionContract(a: ColumnsTableCompressedView, b: ColumnsTableCompressedView) {
            if (filter.sortDateConclusionContract === 'По дате (сначала новые)') {
                return +new Date(b.conclusionDate) - +new Date(a.conclusionDate)
            }
            if (filter.sortDateConclusionContract === 'По дате (сначала старые)') {
                return +new Date(a.conclusionDate) - +new Date(b.conclusionDate)
            }
            return 0
        }

        if (isSuccessShort) {
            const filterDataShort: ColumnsTableCompressedView[] = dataShort.map(elem => changeListDataShort(elem))
            return filterDataShort
                .filter(elem => filterNameOrg(elem))
                .filter(elem => filterContractType(elem))
                .filter(elem => filterDateConclusionContract(elem))
                .sort((a, b) => sortDateConclusionContract(a, b))
        }
    }

    function filterDataFull() {
        function filterNameOrg(elem: ColumnsTableFull) {
            if (filter.nameOrg === 'Все') {
                return elem
            } else {
                return elem.contractFacility === filter.nameOrg
            }
        }

        function filterContractType(elem: ColumnsTableFull) {
            if (filter.contractType === 'Все') {
                return elem
            } else {
                return elem.contractType === filter.contractType
            }
        }

        function filterDateConclusionContract(elem: ColumnsTableFull) {
            if (filter.dateConclusionContract === 'Все') {
                return elem
            } else {
                return elem.conclusionDate === filter.dateConclusionContract
            }
        }

        function filterDataNameSpecialty(elem: ColumnsTableFull) {
            if (filter.nameSpecialty === 'Все') {
                return elem
            } else {
                return elem.specialtyName === filter.nameSpecialty
            }
        }

        function filterNumberSeats(elem: ColumnsTableFull) {
            if (filter.numberSeats === 'Все') {
                return elem
            } else {
                return elem.placesAmount === filter.numberSeats
            }
        }

        function sortDateConclusionContract(a: ColumnsTableFull, b: ColumnsTableFull) {
            if (filter.sortDateConclusionContract === 'По дате (сначала новые)') {
                return +new Date(b.conclusionDate) - +new Date(a.conclusionDate)
            }
            if (filter.sortDateConclusionContract === 'По дате (сначала старые)') {
                return +new Date(a.conclusionDate) - +new Date(b.conclusionDate)
            }
            return 0
        }

        if (isSuccessAll) {
            const filterDataAll: ColumnsTableFull[] = dataAll.map(elem => (changeListDataAll(elem)))
            return filterDataAll
                .filter(elem => filterNameOrg(elem))
                .filter(elem => filterContractType(elem))
                .filter(elem => filterDateConclusionContract(elem))
                .filter(elem => filterDataNameSpecialty(elem))
                .filter(elem => filterNumberSeats(elem))
                .sort((a, b) => sortDateConclusionContract(a, b))
        }
    }

    useEffect(() => {
        setTableDataCompressed(filterDataCompressed())
        setTableDataFull(filterDataFull())
    }, [filter])


    useEffect(() => {
        if (isSuccessAll) {
            const newDataAll: ColumnsTableFull[] = dataAll.map(elem => (changeListDataAll(elem)))
            setTableDataFull(newDataAll)
        }
    }, [dataAll]);

    useEffect(() => {
        if (isSuccessShort) {
            if (isSuccessShort) {
                const newDataShort: ColumnsTableCompressedView[] = dataShort.map(elem => (changeListDataShort(elem)))
                setTableDataCompressed(newDataShort)
            }
        }

    }, [dataShort]);




    return (
        <section className={'container'}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography.Text className="text-[28px] mb-14">
                        Реестр договоров
                    </Typography.Text>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className={'mt-12'}>
                <Col span={12} className={'flex items-center gap-0'}>
                    <Col span={8} className={clsx(
                        'flex items-center gap-2',
                        !tableView.table && 'hidden')}
                    >
                        <span className={'whitespace-nowrap'}>Количество мест</span>
                        <InputNumber
                            controls={false}
                            type={'number'}
                            onChange={value => setFilterNumberSeats(value)}
                        />
                    </Col>
                    <Col span={!tableView.table ? 24 : 16} className={'flex items-center gap-10 justify-between'}
                         style={{
                             paddingRight: 0,
                             paddingLeft: tableView.table ? 16 : 8
                         }}>
                        <span className={'whitespace-nowrap'}>Дата заключения договора</span>
                        <DatePicker className={'w-[90%]'}
                                    placeholder={'ДД.ММ.ГГГГ'}
                                    format={'DD.MM.YYYY'}
                                    onChange={date => setFilterDate(date)}
                        />
                    </Col>
                </Col>
                <Col span={3} offset={9}>
                    <Button type={"primary"}
                            onClick={() => {
                                nav('/services/practices/registerContracts/createContract')
                            }}
                            className={'rounded-full'}
                    >
                        Создать договор
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className={'mt-4'}>
                <Col span={12} className={'flex items-center gap-2'}>
                    <Col span={8}>
                        <span className={'whitespace-nowrap'}>Наименование организации</span>
                    </Col>
                    <Col span={16}>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="Все"
                            className="w-full"
                            options={contractFacilities}
                            onChange={(value, option) => {
                                setFilter({
                                    ...filter,
                                    nameOrg: value
                                })
                            }}
                        />
                    </Col>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className={clsx(
                'mt-4',
                !tableView.table && 'hidden'
            )}>
                <Col span={12} className={'flex items-center gap-2'}>
                    <Col span={8}>
                        <span className={'whitespace-nowrap'}>Наименование специальности</span>
                    </Col>
                    <Col span={16}>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="Все"
                            className="w-full"
                            options={nameSpecialty}
                            onChange={value => {
                                setFilter({
                                    ...filter,
                                    nameSpecialty: value,
                                })
                            }}
                        />
                    </Col>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className={'mt-4'}>
                <Col span={12} className={'flex items-center gap-2'}>
                    <Col span={8}>
                        <span className={'whitespace-nowrap'}>Тип договора</span>
                    </Col>
                    <Col span={16}>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="Все"
                            className="w-full"
                            options={optionsTypeContract}
                            onChange={value => {
                                setFilter({
                                    ...filter,
                                    contractType: value,
                                })
                            }}
                        />
                    </Col>
                </Col>
            </Row>
            <Row className="mt-12 flex items-center">
                <Col span={12} flex="50%">
                    <Radio.Group defaultValue="compressedView" buttonStyle="solid">
                        <Radio.Button
                            onClick={isCompressedTable}
                            value="compressedView"
                            className="!rounded-l-full">
                            Посмотреть в сжатом виде
                        </Radio.Button>
                        <Radio.Button
                            onClick={isFullTable}
                            value="tableView"
                            className="!rounded-r-full">
                            Посмотреть данные в таблице
                        </Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={8} offset={4}>
                    <div className={'flex gap-2 items-center'}>
                        <span className={'mr-2'}>Сортировка</span>
                        <Select
                            popupMatchSelectWidth={false}
                            defaultValue="По дате (сначала новые)"
                            className="w-full"
                            options={optionsSort}
                            onChange={value => {
                                setFilter({
                                    ...filter,
                                    sortDateConclusionContract: value
                                })
                            }}

                        />
                    </div>

                </Col>
            </Row>
            {
                tableView.compressed
                &&
                <div className={'registerContracts'}>
                    <Table
                        columns={columnsCompressedView}
                        pagination={false}
                        size={"middle"}
                        dataSource={tableDataCompressed}
                        rowSelection={{
                            type: "checkbox",
                            onSelect: (record, selected, selectedRows, nativeEvent) => {
                                setSelectedFieldsCompressed(selectedRows)
                            },
                            onSelectAll: (selected, selectedRows, changeRows) => {
                                setSelectedFieldsCompressed(selectedRows)
                            }
                        }}
                    />
                </div>
            }
            {
                tableView.table
                &&
                <Table columns={columnsFullView}
                       pagination={false}
                       dataSource={tableDataFull}
                       size={"middle"}
                       className={'mt-5'}
                       rowSelection={{
                           type: "checkbox",
                           onSelect: (record, selected, selectedRows, nativeEvent) => {
                               setSelectedFieldFull(selectedRows)
                           },
                           onSelectAll: (selected, selectedRows, changeRows) => {
                               setSelectedFieldFull(selectedRows)
                           }
                       }}
                />
            }
        </section>
    )
}
