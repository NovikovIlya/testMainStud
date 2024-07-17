import React from 'react';
import {TablePractical} from "../../practical/ViewPractical";
import {ColorBg, WrapperButton} from "../WrapperButton";
import {Load} from "../../../../../assets/svg/Load";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";
import dayjs from "dayjs";
import {utils, writeFileXLSX} from "xlsx";
import printJS from "print-js";
import { useDeletePractiseMutation } from '../../../../../store/api/practiceApi/practical';

interface Props {
    recordFullAll?: TablePractical[]
    recordFull?: TablePractical
    setRecordFull?: (arg: TablePractical[]) => void
}

export const PracticalPopoverContent = ({recordFull, recordFullAll, setRecordFull}: Props) => {
    const [deletePractise] = useDeletePractiseMutation()
    function translateColumnsIntoRussia({isPrint}: { isPrint: boolean }) {
        if (recordFull) {

            const stringIndTask = isPrint
                ?
                recordFull.individualTasks.map((elem, index) => `${index + 1}.${elem} `).join('</br>')
                :
                recordFull.individualTasks.map((elem, index) => `${index + 1}.${elem} `).join('\n')

            const stringCompetencies = isPrint
                ?
                recordFull.competencies.map((elem, index) => `${index + 1}.${elem} `).join('</br>')
                :
                recordFull.competencies.map((elem, index) => `${index + 1}.${elem} `).join('\n')

            const startPractice = `${dayjs(recordFull.practicePeriod[0]).format('DD.MM.YYYY')}`
            const endPractice = `${dayjs(recordFull.practicePeriod[1]).format('DD.MM.YYYY')}`
            const stringPeriodPractice = `${startPractice} - ${endPractice}`

            return {
                "Шифр и наименование специальности": recordFull.specialtyName,
                "Тип практики": recordFull.practiceType,
                "Кафедра": recordFull.department,
                "Номер группы": recordFull.groupNumber,
                "Семестр": recordFull.semester,
                "Учебный год": recordFull.academicYear,
                "Курс": recordFull.courseStudy,
                "Период практики": stringPeriodPractice,
                "Кол-во часов по практике": recordFull.totalHours,
                "Индивидуальные задания": stringIndTask,
                "Код и наименование компетенции": stringCompetencies,
                "Заведующий опорной кафедрой": recordFull.departmentDirector,
            }
        }
    }


    function downLoad() {
        const ws = utils.json_to_sheet([translateColumnsIntoRussia({isPrint: false})]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "File.xlsx");
    }

    function printTable() {
        function properties() {
            if (recordFull) {
                return [
                    "Шифр и наименование специальности",
                    "Тип практики",
                    "Кафедра",
                    "Номер группы",
                    "Семестр",
                    "Учебный год",
                    "Курс",
                    "Период практики",
                    "Кол-во часов по практике",
                    "Индивидуальные задания",
                    "Код и наименование компетенции",
                    "Заведующий опорной кафедрой",
                ]
            }
        }

        printJS({
            printable: [translateColumnsIntoRussia({isPrint: true})],
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }

    function deleteData() {
        if (setRecordFull && recordFull && recordFullAll) {
            const newArr = recordFullAll.filter(elem => {
                return elem.id !== recordFull.id
            })
            setRecordFull(newArr)
            // if (setSelectedFieldFull) {
            //     setSelectedFieldFull([])
            // }
            console.log(recordFull)
            // const objIdList: ListIdDeleteContracts = {
            //     listIdDelete: listId
            // }
            //deleteSeveralContracts(objIdList)
        }
        // @ts-ignore
        deletePractise(recordFull?.id)
    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <WrapperButton
                color={ColorBg.BLUEF2}
                onClick={downLoad}
            >
                <Load/>
                <span>Скачать выбранное</span>
            </WrapperButton>
            <WrapperButton
                color={ColorBg.BLUEF2}
                onClick={printTable}
            >
                <PrintSvg/>
                <span>Печать выбранного</span>
            </WrapperButton>
            <WrapperButton
                color={ColorBg.REDE5}
                onClick={deleteData}
            >
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить выбранное</span>
            </WrapperButton>
        </div>
    );
};

