import React from 'react';
import {Load} from "../../../../../assets/svg/Load";
import {Doc} from "../../../../../assets/svg/Doc";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";
import {ColumnsTableCompressedView, ColumnsTableFull} from "../../roster/registerContracts/RegisterContracts";
import {utils, writeFileXLSX} from "xlsx";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import printJS from "print-js";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {ColorBg, WrapperButton} from "../WrapperButton";
import {useDeleteContractMutation} from "../../../../../store/api/practiceApi/contracts";
import { Popconfirm } from 'antd';


interface Props {
    recordCompressed?: ColumnsTableCompressedView
    recordFull?: ColumnsTableFull
    tableDataCompressed?: ColumnsTableCompressedView[]
    setTableDataCompressed?: (arg: ColumnsTableCompressedView[]) => void
    tableDataFull?: ColumnsTableFull[]
    setTableDataFull?: (arg: ColumnsTableFull[]) => void
}

export const RegisterPopoverContent = ({
                                           recordCompressed,
                                           recordFull,
                                           setTableDataCompressed,
                                           tableDataCompressed,
                                           setTableDataFull,
                                           tableDataFull
                                       }: Props) => {
    const nav = useNavigate()
    const [deleteContract] = useDeleteContractMutation()

    function translateColumnIntoRussia() {
        if (recordCompressed) {
            return {
                "Наименование организации": recordCompressed.contractFacility,
                "Дата заполнения": recordCompressed.fillingDate,
                "Тип договора": recordCompressed.contractType,
                "Дата заключения договора": dayjs(recordCompressed.conclusionDate).format('DD.MM.YYYY'),
            }
        }
        if (recordFull) {
            return {
                "Наименование организации": recordFull.contractFacility,
                "Шифр и наименование специальности": recordFull.specialtyName,
                "Номер договора": recordFull.contractNumber,
                "Дата заключения договора": dayjs(recordFull.conclusionDate).format('DD.MM.YYYY'),
                "Тип договора": recordFull.contractType,
                "Срок действия договора": recordFull.endDate,
                "Юридический адрес организации": recordFull.legalFacility,
                "Фактический адрес организации": recordFull.actualFacility,
                "Количество мест": recordFull.placesAmount,
            }
        }
    }

    function printTable() {
        function properties() {
            if (recordCompressed) {
                return [
                    "Наименование организации",
                    "Дата заполнения",
                    "Тип договора",
                    "Дата заключения договора"
                ]
            }
            if (recordFull) {
                return [
                    "Наименование организации",
                    "Наименование специальности",
                    "Номер договора",
                    "Дата заключения договора",
                    "Тип договора",
                    "Срок действия договора",
                    "Шифр и наименование специальности",
                    "Юридический адрес организации",
                    "Фактический адрес организации",
                    "Количество мест",
                ]
            }
        }

        printJS({
            printable: [translateColumnIntoRussia()],
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }

    function downLoad() {
        const ws = utils.json_to_sheet([translateColumnIntoRussia()]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "File.xlsx");

    }

    function navPreview() {
        if (recordCompressed) {
            nav(`/services/practices/registerContracts/previewContracts/${recordCompressed.id}`)
        }
        if (recordFull) {
            nav(`/services/practices/registerContracts/previewContracts/${recordFull?.id}`)
        }
    }

    function deleteData() {
        if (setTableDataCompressed && tableDataCompressed) {
            const newArr = tableDataCompressed.filter(elem => {
                return elem.key !== recordCompressed?.key
            })
            setTableDataCompressed(newArr)
            if (recordCompressed) {
                deleteContract(recordCompressed.id)
            }
        }

        if (setTableDataFull && tableDataFull) {
            const newArr = tableDataFull.filter(elem => {
                return elem.key !== recordFull?.key
            })
            setTableDataFull(newArr)
            if (recordFull) {
                deleteContract(recordFull.id)
            }
        }

    }


    return (
        <div className={'flex flex-col gap-2 '}  onClick={(e) => { e.stopPropagation()}} >
            <WrapperButton color={ColorBg.BLUEF8} onClick={navPreview}>
                <Doc/>
                <span>Режим просмотра</span>
            </WrapperButton>

            <WrapperButton color={ColorBg.BLUEF2} onClick={downLoad}>
                <Load/>
                <span>Скачать</span>
            </WrapperButton>

            <WrapperButton color={ColorBg.BLUEF2} onClick={printTable}>
                <PrintSvg/>
                <span>Печать</span>
            </WrapperButton>

        	<Popconfirm
				title="Удаление"
				description="Вы уверены, что хотите удалить?"
				onConfirm={deleteData}
				okText="Да"
				cancelText="Нет"
			>
                <WrapperButton color={ColorBg.REDE5} >
                    <DeleteRedSvg/>
                    <span className={'text-[#E04545]'}>Удалить</span>
                </WrapperButton>
            </Popconfirm>
        </div>
    );
};

