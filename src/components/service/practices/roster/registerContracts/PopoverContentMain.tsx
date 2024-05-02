import React from 'react';
import {Load} from "../../../../../assets/svg/Load";
import dayjs from "dayjs";
import {utils, writeFileXLSX} from "xlsx";
import {ColumnsTableCompressedView, ColumnsTableFull} from "./RegisterContracts";
import printJS from "print-js";
import {PrinterSvg} from "../../../../../assets/svg/PrinterSvg";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";

interface Props {
    recordCompressed?: ColumnsTableCompressedView[]
    recordFull?: ColumnsTableFull[]
}

export const PopoverContentMain = ({recordCompressed, recordFull}: Props) => {

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
                    "Наименование организации": elem.nameOrg,
                    "Наименование специальности": elem.nameSpecialty,
                    "Номер договора": elem.contractNumber,
                    "Дата заключения договора": dayjs(elem.dateConclusionContract).format('DD.MM.YYYY'),
                    "Тип договора": elem.contractType,
                    "Срок действия договора": elem.contractPeriod,
                    "Шифр и наименование специальности": elem.cipherNameSpecialty,
                    "Юридический адрес организации": elem.legalAddress,
                    "Фактический адрес организации": elem.actualAddress,
                    "Количество мест": elem.numberSeats,
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
        })
    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <div className={'flex gap-2 w-[178px] bg-[#D7E2F2] p-[10px] rounded-[5px] cursor-pointer items-center'}
                onClick={downLoad}
            >
                <Load/>
                <span>Скачать</span>
            </div>
            <div className={'flex gap-2 w-[178px] bg-[#D7E2F2] p-[10px] rounded-[5px] cursor-pointer items-center'}
                 onClick={printTable}
            >
                <PrintSvg/>
                <span>Печать</span>
            </div>

        </div>
    );
};

