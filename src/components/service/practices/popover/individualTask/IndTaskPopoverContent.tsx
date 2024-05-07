import React from 'react';
import {CompressedIndividualTask, FullIndividualTask} from "../../individual-tasks/IndividualTasks";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import printJS from "print-js";
import {utils, writeFileXLSX} from "xlsx";
import {WrapperButton} from "../WrapperButton";
import {Doc} from "../../../../../assets/svg/Doc";
import {Load} from "../../../../../assets/svg/Load";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";

interface Props {
    recordCompressed?: CompressedIndividualTask
    recordFull?: FullIndividualTask
    tableDataCompressed?: CompressedIndividualTask[]
    setTableDataCompressed?: (arg: CompressedIndividualTask[]) => void
    tableDataFull?: FullIndividualTask[]
    setTableDataFull?: (arg: FullIndividualTask[]) => void
}

export const IndTaskPopoverContent = ({
                                          recordCompressed,
                                          recordFull,
                                          setTableDataCompressed,
                                          tableDataCompressed,
                                          setTableDataFull,
                                          tableDataFull
                                      }: Props) => {
    const nav = useNavigate()

    function translateColumnIntoRussia() {
        if (recordCompressed) {
            return {
                "Шифр и наименование специальности": recordCompressed.specialityName,
                "Дата заполнения": dayjs(recordCompressed.dateFilling).format('DD.MM.YYYY'),
                "Тип практики": recordCompressed.practiceType,
            }
        }
        if (recordFull) {
            return {
                "Шифр и наименование специальности": recordFull.specialityName,
                "Тип договора": recordFull.practiceType,
                "Индивидуальные задания": recordFull.tasks.join('\n')
            }
        }

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
                    "Тип договора",
                    "Индивидуальные задания",
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
            //nav(`/services/practices/registerContracts/previewContracts/${recordCompressed.key}`)
        }
        if (recordFull) {
            //nav(`/services/practices/registerContracts/previewContracts/${recordFull?.key}`)
        }
    }

    function deleteData() {
        if (setTableDataCompressed && tableDataCompressed) {
            const newArr = tableDataCompressed.filter(elem => {
                return elem.key !== recordCompressed?.key
            })
            setTableDataCompressed(newArr)
            //пишем запрос на удаление
        }

        if (setTableDataFull && tableDataFull) {
            const newArr = tableDataFull.filter(elem => {
                return elem.key !== recordFull?.key
            })
            setTableDataFull(newArr)
            //пишем запрос на удаление
        }

    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <WrapperButton color={'#E9EFF8'} onClick={navPreview}>
                <Doc/>
                <span>Режим просмотра</span>
            </WrapperButton>

            <WrapperButton color={'#D7E2F2'} onClick={downLoad}>
                <Load/>
                <span>Скачать</span>
            </WrapperButton>

            <WrapperButton color={'#D7E2F2'} onClick={printTable}>
                <PrintSvg/>
                <span>Печать</span>
            </WrapperButton>

            <WrapperButton color={'#FBE5E5'} onClick={deleteData}>
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить</span>
            </WrapperButton>
        </div>
    );
};

