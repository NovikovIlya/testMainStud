import React, {useEffect, useState} from 'react';
import {TablePractical} from "../../practical/ViewPractical";
import {ColorBg, WrapperButton} from "../WrapperButton";
import {Load} from "../../../../../assets/svg/Load";
import {PrintSvg} from "../../../../../assets/svg/PrintSvg";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";
import dayjs from "dayjs";
import {utils, writeFileXLSX} from "xlsx";
import printJS from "print-js";
import {ListIdDeleteContracts} from "../../../../../models/Practice";

interface Props {
    recordFullAll?: TablePractical[]
    recordFull?: TablePractical[]
    setRecordFull?: (arg: TablePractical[]) => void
    setSelectedFieldFull?: (arg: TablePractical[]) => void
}

export const PracticalPopoverMain = ({
                                         recordFull,
                                         recordFullAll,
                                         setRecordFull,
                                         setSelectedFieldFull
                                     }: Props) => {

    function translateColumnsIntoRussia({isPrint}: {isPrint: boolean}) {
        const newData: any = []
        if (recordFull) {
            const recordFullWithoutUndefinedElem = recordFull.filter(elem => elem !== undefined)
            for (let elem of recordFullWithoutUndefinedElem) {

                const stringIndTask = isPrint
                    ?
                    elem.individualTasks.map((elem, index) => `${index + 1}.${elem} `).join('</br>')
                    :
                    elem.individualTasks.map((elem, index) => `${index + 1}.${elem} `).join('\n')

                const stringCompetencies = isPrint
                    ?
                    elem.competencies.map((elem, index) => `${index + 1}.${elem} `).join('</br>')
                    :
                    elem.competencies.map((elem, index) => `${index + 1}.${elem} `).join('\n')

                const startPractice = `${dayjs(elem.practicePeriod[0]).format('DD.MM.YYYY')}`
                const endPractice = `${dayjs(elem.practicePeriod[1]).format('DD.MM.YYYY')}`
                const stringPeriodPractice = `${startPractice} - ${endPractice}`

                const newObj = {
                    "Шифр и наименование специальности": elem.specialtyName,
                    "Тип практики": elem.practiceType,
                    "Кафедра": elem.department,
                    "Номер группы": elem.groupNumber,
                    "Семестр": elem.semester,
                    "Учебный год": elem.academicYear,
                    "Курс": elem.courseStudy,
                    "Период практики": stringPeriodPractice,
                    "Кол-во часов по практике": elem.totalHours,
                    "Индивидуальные задания": stringIndTask,
                    "Код и наименование компетенции": stringCompetencies,
                    "Заведующий опорной кафедрой": elem.departmentDirector,
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
            printable: translateColumnsIntoRussia({isPrint: true}),
            properties: properties(),
            type: 'json',
            style: 'body {font-size: 10px}'
        })
    }

    function deleteData() {
        if (setRecordFull && recordFull && recordFullAll) {
            const recordFullWithoutUndefinedElem = recordFull.filter(elem => elem !== undefined)

            const listId = recordFullWithoutUndefinedElem.map(elem => elem.id)
            setRecordFull(recordFullAll.filter(elem => {
                return !listId.includes(elem.id)
            }))
            // if (setSelectedFieldFull) {
            //     setSelectedFieldFull([])
            // }
            console.log(recordFull)
            // const objIdList: ListIdDeleteContracts = {
            //     listIdDelete: listId
            // }
            //deleteSeveralContracts(objIdList)
        }
    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <WrapperButton
                color={ColorBg.BLUEF2}
                onClick={downLoad}
                disabled={recordFull!.length === 0}
            >
                <Load/>
                <span>Скачать выбранное</span>
            </WrapperButton>
            <WrapperButton
                color={ColorBg.BLUEF2}
                onClick={printTable}
                disabled={recordFull!.length === 0}
            >
                <PrintSvg/>
                <span>Печать выбранного</span>
            </WrapperButton>
            <WrapperButton
                color={ColorBg.REDE5}
                onClick={deleteData}
                disabled={recordFull!.length === 0}
            >
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить выбранное</span>
            </WrapperButton>
        </div>
    );
};

