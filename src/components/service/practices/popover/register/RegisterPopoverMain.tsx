import React from 'react';
import {Load} from "../../../../../assets/svg/Load";
import dayjs from "dayjs";
import {utils, writeFileXLSX} from "xlsx";
import {ColumnsTableCompressedView, ColumnsTableFull} from "../../roster/registerContracts/RegisterContracts";
import printJS from "print-js";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {ColorBg, WrapperButton} from "../WrapperButton";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";

interface Props {
    recordCompressedAll?: ColumnsTableCompressedView[]
    recordCompressed?: ColumnsTableCompressedView[]
    setRecordCompressed?: (arg: ColumnsTableCompressedView[]) => void

    recordFullAll?: ColumnsTableFull[]
    recordFull?: ColumnsTableFull[]
    setRecordFull?: (arg: ColumnsTableFull[]) => void
}

export const RegisterPopoverMain = ({
                                        recordCompressed,
                                        recordFull,
                                        setRecordCompressed,
                                        recordCompressedAll,
                                        recordFullAll,
                                        setRecordFull,
                                    }: Props) => {

    function translateColumnsIntoRussia() {
        const newData: any = []
        if (recordCompressed) {
            for (let elem of recordCompressed) {
                const newObj = {
                    "Наименование организации": elem.contractFacility,
                    "Дата заполнения": elem.dateFiling,
                    "Тип договора": elem.contractType,
                    "Дата заключения договора": dayjs(elem.dateConclusionContract).format('DD.MM.YYYY'),
                }
                newData.push(newObj)
            }
        }
        if (recordFull) {
            for (let elem of recordFull) {
                const newObj = {
                    "Наименование организации": elem.contractFacility,
                    "Шифр и наименование специальности": elem.specialtyName,
                    "Номер договора": elem.contractNumber,
                    "Дата заключения договора": dayjs(elem.conclusionDate).format('DD.MM.YYYY'),
                    "Тип договора": elem.contractType,
                    "Срок действия договора": elem.endDate,
                    "Юридический адрес организации": elem.legalFacility,
                    "Фактический адрес организации": elem.actualFacility,
                    "Количество мест": elem.placesAmount,
                }
                newData.push(newObj)
            }
        }

        return newData

    }

    function downLoad() {
        const ws = utils.json_to_sheet(translateColumnsIntoRussia());
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "File.xlsx");
    }

    function printTable() {
        function properties() {
            if (recordCompressed) {
                return ["Наименование организации", "Дата заполнения", "Тип договора", "Дата заключения договора"]
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
            printable: translateColumnsIntoRussia(),
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }

    function deleteData() {
        if (setRecordCompressed && recordCompressed && recordCompressedAll) {
            const listId = recordCompressed.map(elem => elem.id)
            setRecordCompressed(recordCompressedAll.filter(elem => {
                return !listId.includes(elem.id)
            }))
        }
        if (setRecordFull && recordFull && recordFullAll) {
            const listId = recordFull.map(elem => elem.id)
            setRecordFull(recordFullAll.filter(elem => {
                return !listId.includes(elem.id)
            }))
        }
    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <WrapperButton color={ColorBg.BLUEF2} onClick={downLoad}>
                <Load/>
                <span>Скачать выбранное</span>
            </WrapperButton>
            <WrapperButton color={ColorBg.BLUEF2} onClick={printTable}>
                <PrintSvg/>
                <span>Печать выбранного</span>
            </WrapperButton>
            <WrapperButton color={ColorBg.REDE5} onClick={deleteData}>
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить выбранное</span>
            </WrapperButton>
        </div>
    );
};

