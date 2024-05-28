import React from 'react';
import {CompressedIndividualTask, FullIndividualTask} from "../../individual-tasks/IndividualTasks";
import dayjs from "dayjs";
import printJS from "print-js";
import {utils, writeFileXLSX} from "xlsx";
import {ColorBg, WrapperButton} from "../WrapperButton";
import {Load} from "../../../../../assets/svg/Load";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";
import {useDeleteTaskMutation} from "../../../../../store/api/practiceApi/individualTask";

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
    const [deleteTask] = useDeleteTaskMutation()

    function translateColumnIntoRussia({isPrint}: { isPrint: boolean }) {
        if (recordCompressed) {
            return {
                "Шифр и наименование специальности": recordCompressed.specialityName,
                "Дата заполнения": dayjs(recordCompressed.dateFilling).format('DD.MM.YYYY'),
                "Тип практики": recordCompressed.practiceType,
            }
        }
        if (recordFull) {
            const numberedList = recordFull.tasks.map((elem, index) => {
                return `${index + 1}.${elem} `
            })
            if (isPrint) {
                return {
                    "Шифр и наименование специальности": recordFull.specialityName,
                    "Тип договора": recordFull.practiceType,
                    "Индивидуальные задания": numberedList.join('</br>')
                }
            } else {
                return {
                    "Шифр и наименование специальности": recordFull.specialityName,
                    "Тип договора": recordFull.practiceType,
                    "Индивидуальные задания": numberedList.join('\n')
                }
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
            printable: [translateColumnIntoRussia({isPrint: true})],
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }

    function downLoad() {
        const ws = utils.json_to_sheet([translateColumnIntoRussia({isPrint: false})]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "File.xlsx");

    }

    function deleteData() {
        if (setTableDataCompressed && tableDataCompressed) {
            const newArr = tableDataCompressed.filter(elem => {
                return elem.key !== recordCompressed?.key
            })
            deleteTask(recordCompressed!.id)
            setTableDataCompressed(newArr)
        }

        if (setTableDataFull && tableDataFull) {
            const newArr = tableDataFull.filter(elem => {
                return elem.key !== recordFull?.key
            })
            deleteTask(recordFull!.id)
            setTableDataFull(newArr)
        }

    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <WrapperButton color={ColorBg.BLUEF2} onClick={downLoad}>
                <Load/>
                <span>Скачать</span>
            </WrapperButton>

            <WrapperButton color={ColorBg.BLUEF2} onClick={printTable}>
                <PrintSvg/>
                <span>Печать</span>
            </WrapperButton>

            <WrapperButton color={ColorBg.REDE5} onClick={deleteData}>
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить</span>
            </WrapperButton>
        </div>
    );
};

