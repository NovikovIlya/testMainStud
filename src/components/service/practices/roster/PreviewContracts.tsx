import {Button, Col, Row, Space, Table, TableProps, Typography} from 'antd'
import React, {ReactNode, useEffect} from 'react'

import {ArrowLeftSvg} from '../../../../assets/svg'
import {DownloadSvg} from '../../../../assets/svg/DownloadSvg'
import {PrinterSvg} from '../../../../assets/svg/PrinterSvg'
import {useGetContractQuery} from '../../../../store/api/practiceApi/contracts'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {utils, writeFileXLSX} from "xlsx";
import dayjs from "dayjs";
import printJS from "print-js";

type PropsType = {
    setIsPreview: (value: boolean) => void
    setIsCreate: (value: boolean) => void
    setIsFinalReview: (value: boolean) => void
    preview: string
}

interface DataType {
    key: string
    name: string
    medic: ReactNode
}



export const PreviewContracts = () => {
    const path = useLocation()
    const id: string = path.pathname.split('/').at(-1)!
    const nav = useNavigate()
    const { data: contract, isSuccess } = useGetContractQuery(id)

    useEffect(() => {
        if (isSuccess) {
            console.log(contract)
        }
    }, [contract]);

    function prolonAge(prolon: string) {
        if (prolon === '1' && prolon) {
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

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Наименование организации договору',
            dataIndex: 'name',
            key: 'name',
            width: 400,
            render: (text: string) => <span>{text}</span>
        },
        {
            title: contract?.contractFacility,
            dataIndex: 'medic',
            key: 'medic'
        }
    ]

    const dataTest: DataType[] = [
    	{
    		key: '1',
    		name: 'Номер договора',
    		medic: contract?.contractNumber || ''
    	},
    	{
    		key: '2',
    		name: 'Дата заключения договора',
    		medic: dayjs(contract?.conclusionDate).format('DD.MM.YYYY') || ''
    	},
    	{
    		key: '3',
    		name: 'Тип договора',
    		medic: contract?.contractType || ''
    	},
    	{
    		key: '4',
    		name: 'Срок действия договора',
    		medic: contract?.endDate || ''
    	},
        {
            key: '5',
            name: 'Пролонгация',
            medic: contract?.prolongation ? `${contract?.prolongation} ${prolonAge(contract!.prolongation)}` : '-'
        },
    	{
    		key: '6',
    		name: 'Шифр и наименование специальности',
    		medic: contract?.specialtyName || ''
    	},
    	{
    		key: '7',
    		name: 'Юридический адрес организации',
    		medic: contract?.legalFacility || ''
    	},
    	{
    		key: '8',
    		name: 'Фактический адрес организации',
    		medic: contract?.actualFacility || ''
    	},
    	{
    		key: '9',
    		name: 'Количество мест',
    		medic: contract?.placesAmount || ''
    	},
    	{
    		key: '10',
    		name: 'Ссылка на скан договора',
            medic:
                <a href={`http://192.168.63.96:8081/contracts/copy-file/${contract?.documentCopyId}`}
                   target={'_blank'}>
                    Скан договора
                </a>,
    	},
    	{
    		key: '11',
    		name: 'Ссылка на дополнительное соглашение к договору',
    		medic:
                <a href={`http://192.168.63.96:8081/contracts/agreement-file/${contract?.documentAgreementId}`}
                   target={'_blank'}>
                    Доп.соглашение
                </a>
    	}
    ]
    function translateColumnIntoRussia() {

        const isProlongation = contract?.prolongation ? `${prolonAge(contract!.prolongation)}` : '-'

        return {
            "Наименование организации": contract?.contractFacility,
            "Шифр и наименование специальности": contract?.specialtyName,
            "Номер договора": contract?.contractNumber,
            "Дата заключения договора": contract?.conclusionDate,
            "Тип договора": contract?.contractType,
            "Срок действия договора": contract?.endDate,
            "Пролонгация": isProlongation,
            "Юридический адрес организации": contract?.legalFacility,
            "Фактический адрес организации": contract?.actualFacility,
            "Количество мест": contract?.placesAmount,
        }
    }
    function downLoad() {
        const ws = utils.json_to_sheet([translateColumnIntoRussia()]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "File.xlsx");
    }

    function printTable() {
        function properties() {
                return [
                    "Наименование организации",
                    "Шифр и наименование специальности",
                    "Номер договора",
                    "Дата заключения договора",
                    "Тип договора",
                    "Срок действия договора",
                    "Пролонгация",
                    "Юридический адрес организации",
                    "Фактический адрес организации",
                    "Количество мест",
                ]
        }
        printJS({
            printable: [translateColumnIntoRussia()],
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }
    return (
        <section className="container">
            <Space size={10}>
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
                    onClick={() => nav('/services/practices/registerContracts')}
                />
                <Typography.Text className="text-black text-3xl font-normal">
                    Название
                </Typography.Text>
            </Space>

            <Row gutter={[16, 16]} className="mt-12">
                <Col span={7}>
                    <Space>
                        <Button
                            type="text"
                            icon={<DownloadSvg/>}
                            className="flex items-center"
                            onClick={downLoad}
                        >
                            Скачать
                        </Button>
                        <Button
                            type="text"
                            icon={<PrinterSvg/>}
                            className="flex items-center"
                            onClick={printTable}
                        >
                            Печать
                        </Button>
                    </Space>
                </Col>
                <Col flex={'auto'}/>
                <Col span={9}>
                    <Space className="w-full flex-row-reverse">
                        <Button
                            className="!rounded-full"
                            onClick={() => nav('/services/practices/registerContracts')}
                        >
                            Посмотреть итоговый реестр
                        </Button>
                        <Button
                            type="primary"
                            className="!rounded-full"
                            onClick={() => nav('/services/practices/registerContracts/createContract')}
                        >
                            Создать договор
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={dataTest}
                bordered
                pagination={false}
                className="my-10"
            />
        </section>
    )
}
