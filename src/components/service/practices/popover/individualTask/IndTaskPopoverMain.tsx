import React from 'react';
import {CompressedIndividualTask, FullIndividualTask} from "../../individual-tasks/IndividualTasks";
import dayjs from "dayjs";
import {utils, writeFileXLSX} from "xlsx";
import printJS from "print-js";
import {ColorBg, WrapperButton} from "../WrapperButton";
import {Load} from "../../../../../assets/svg/Load";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";

interface Props {
    recordCompressedAll?: CompressedIndividualTask[]
    recordCompressed?: CompressedIndividualTask[]
    setRecordCompressed?: (arg: CompressedIndividualTask[]) => void

    recordFullAll?: FullIndividualTask[]
    recordFull?: FullIndividualTask[]
    setRecordFull?: (arg: FullIndividualTask[]) => void
}


export const IndTaskPopoverMain = ({
                                       recordCompressed,
                                       recordFull,
                                       setRecordCompressed,
                                       recordCompressedAll,
                                       recordFullAll,
                                       setRecordFull
                                   }: Props) => {
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

