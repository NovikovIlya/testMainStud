import React from 'react';
import {CompressedIndividualTask, FullIndividualTask} from "../../individual-tasks/IndividualTasks";
import dayjs from "dayjs";
import {utils, writeFileXLSX} from "xlsx";
import printJS from "print-js";
import {ColorBg, WrapperButton} from "../WrapperButton";
import {Load} from "../../../../../assets/svg/Load";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";
import {ListIdDeleteTasks} from "../../../../../models/Practice";
import {useDeleteSeveralContractMutation} from "../../../../../store/api/practiceApi/contracts";
import {useDeleteSeveralTasksMutation} from "../../../../../store/api/practiceApi/individualTask";

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

    const [severalDelete] = useDeleteSeveralTasksMutation()

    function translateColumnsIntoRussia({isPrint}: { isPrint?: boolean }) {
        const newData: any = []
        if (recordCompressed) {
            const recordCompressedWithoutUndefinedElem = recordCompressed.filter(elem => elem !== undefined)

            for (let elem of recordCompressedWithoutUndefinedElem) {
                const newObj = {
                    "Шифр и наименование специальности": elem.specialityName,
                    "Дата заполнения": dayjs(elem.dateFilling).format('DD.MM.YYYY'),
                    "Тип практики": elem.practiceType,
                }
                newData.push(newObj)
            }
        }
        if (recordFull) {
            const recordFullWithoutUndefinedElem = recordFull.filter(elem => elem !== undefined)

            for (let elem of recordFullWithoutUndefinedElem) {
                const newObj = {
                    "Шифр и наименование специальности": elem.specialityName,
                    "Тип практики": elem.practiceType,
                    "Индивидуальные задания": isPrint ?
                        elem.tasks.map((elem, index) => `${index + 1}.${elem} `).join('</br>')
                        :
                        elem.tasks.map((elem, index) => `${index + 1}.${elem} `).join('\n'),
                }
                newData.push(newObj)
            }
        }

        return newData
    }

    function downLoad() {
        const ws = utils.json_to_sheet(translateColumnsIntoRussia({isPrint: false}));
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
            printable: translateColumnsIntoRussia({isPrint: true}),
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }

    function deleteData() {
        if (setRecordCompressed && recordCompressed && recordCompressedAll) {
            const recordCompressedWithoutUndefinedElem = recordCompressed.filter(elem => elem !== undefined)

            const listId = recordCompressedWithoutUndefinedElem.map(elem => elem.id)
            const listIdDelete: ListIdDeleteTasks = {
                listIdDelete: listId
            }
            severalDelete(listIdDelete)
            setRecordCompressed(recordCompressedAll.filter(elem => {
                return !listId.includes(elem.id)
            }))
        }
        if (setRecordFull && recordFull && recordFullAll) {
            const recordFullWithoutUndefinedElem = recordFull.filter(elem => elem !== undefined)

            const listId = recordFullWithoutUndefinedElem.map(elem => elem.id)
            const listIdDelete: ListIdDeleteTasks = {
                listIdDelete: listId
            }
            severalDelete(listIdDelete)
            setRecordFull(recordFullAll.filter(elem => {
                return !listId.includes(elem.id)
            }))
        }
    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <WrapperButton
                color={ColorBg.BLUEF2}
                onClick={downLoad}
                disabled={translateColumnsIntoRussia({}).length === 0}
            >
                <Load/>
                <span>Скачать выбранное</span>
            </WrapperButton>

            <WrapperButton
                color={ColorBg.BLUEF2}
                onClick={printTable}
                disabled={translateColumnsIntoRussia({}).length === 0}
            >
                <PrintSvg/>
                <span>Печать выбранного</span>
            </WrapperButton>
            <WrapperButton
                color={ColorBg.REDE5}
                onClick={deleteData}
                disabled={translateColumnsIntoRussia({}).length === 0}
            >
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить выбранное</span>
            </WrapperButton>
        </div>
    );
};

