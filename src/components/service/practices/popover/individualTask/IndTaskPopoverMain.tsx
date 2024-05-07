import React from 'react';
import {CompressedIndividualTask, FullIndividualTask} from "../../individual-tasks/IndividualTasks";
import dayjs from "dayjs";
import {utils, writeFileXLSX} from "xlsx";
import printJS from "print-js";
import {WrapperButton} from "../WrapperButton";
import {Load} from "../../../../../assets/svg/Load";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";

interface Props {
    recordCompressed?: CompressedIndividualTask[]
    recordFull?: FullIndividualTask[]
}


export const IndTaskPopoverMain = ({recordCompressed, recordFull}: Props) => {
    function translateColumnsIntoRussia() {
        const newData: any = []
        if (recordCompressed) {
            for (let elem of recordCompressed) {
                const newObj = {
                    "Шифр и наименование специальности": elem.specialityName,
                    "Дата заполнения": dayjs(elem.dateFilling).format('DD.MM.YYYY'),
                    "Тип практики": elem.practiceType,
                }
                newData.push(newObj)
            }
        }
        if (recordFull) {
            for (let elem of recordFull) {
                const newObj = {
                    "Шифр и наименование специальности": elem.specialityName,
                    "Тип практики": elem.practiceType,
                    "Индивидуальные задания": elem.tasks.join('\n'),
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
                return [
                    "Шифр и наименование специальности",
                    "Дата заполнения",
                    "Тип практики",
                ]
            }
            if (recordFull) {
                return [
                    "Шифр и наименование специальности",
                    "Тип практики",
                    "Индивидуальные задания",
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

    return (
        <div className={'flex flex-col gap-2 '}>
            <WrapperButton color={'#D7E2F2'} onClick={downLoad}>
                <Load/>
                <span>Скачать</span>
            </WrapperButton>

            <WrapperButton color={'#D7E2F2'} onClick={printTable}>
                <PrintSvg/>
                <span>Печать</span>
            </WrapperButton>
        </div>
    );
};

