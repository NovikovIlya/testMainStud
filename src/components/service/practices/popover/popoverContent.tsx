import React from 'react';
import {Load} from "../../../../assets/svg/Load";
import {Doc} from "../../../../assets/svg/Doc";
import {DeleteRedSvg} from "../../../../assets/svg/DeleteRedSvg";
import {ColumnsTableCompressedView, ColumnsTableFull} from "../roster/registerContracts/RegisterContracts";
import {utils, writeFileXLSX} from "xlsx";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import printJS from "print-js";
import {PrintSvg} from "../../../../assets/svg/PrintSvg";
import {CompressedIndividualTask} from "../individual-tasks/IndividualTasks";

type RecordCompressed = ColumnsTableCompressedView | CompressedIndividualTask
type TableDataCompressed = ColumnsTableCompressedView[] | CompressedIndividualTask[]


interface Props {
    recordCompressed?: RecordCompressed
    recordFull?: ColumnsTableFull
    tableDataCompressed?: ColumnsTableCompressedView[]
    setTableDataCompressed?: (arg: ColumnsTableCompressedView[]) => void
    tableDataFull?: ColumnsTableFull[]
    setTableDataFull?: (arg: ColumnsTableFull[]) => void
}

export const PopoverContent = ({
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
            if ("contractFacility" in recordCompressed) {
                return {
                    "Наименование организации": recordCompressed.contractFacility,
                    "Дата заполнения": recordCompressed.dateFiling,
                    "Тип договора": recordCompressed.contractType,
                    "Дата заключения договора": dayjs(recordCompressed.dateConclusionContract).format('DD.MM.YYYY'),
                }
            }
            if ("specialityName" in recordCompressed) {
                return {
                    "Шифр и наименование специальности": recordCompressed.specialityName,
                    "Тип практики": recordCompressed.practiceType,
                    "Дата заполнения": recordCompressed.dateFilling,
                }
            }

        }
        if (recordFull) {
            return {
                "Наименование организации": recordFull.nameOrg,
                "Наименование специальности": recordFull.nameSpecialty,
                "Номер договора": recordFull.contractNumber,
                "Дата заключения договора": dayjs(recordFull.dateConclusionContract).format('DD.MM.YYYY'),
                "Тип договора": recordFull.contractType,
                "Срок действия договора": recordFull.contractPeriod,
                "Шифр и наименование специальности": recordFull.cipherNameSpecialty,
                "Юридический адрес организации": recordFull.legalAddress,
                "Фактический адрес организации": recordFull.actualAddress,
                "Количество мест": recordFull.numberSeats,
            }
        }

    }
    function printTable() {
        function properties() {
            if (recordCompressed) {
                if ("contractFacility" in recordCompressed) {
                    return [
                        "Наименование организации",
                        "Дата заполнения",
                        "Тип договора",
                        "Дата заключения договора"
                    ]
                }
                if ("specialityName" in recordCompressed) {
                    return [
                        "Шифр и наименование специальности",
                        "Дата заполнения",
                        "Тип практики",
                    ]
                }

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
            nav(`/services/practices/registerContracts/previewContracts/${recordCompressed.key}`)
        }
        if (recordFull) {
            nav(`/services/practices/registerContracts/previewContracts/${recordFull?.key}`)
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
            <div className={'flex gap-2 w-[178px] bg-[#E9EFF8] p-[10px] rounded-[5px] cursor-pointer items-center'}
                 onClick={navPreview}
            >
                <Doc/>
                <span>Режим просмотра</span>
            </div>
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

            <div className={'flex gap-2 w-[178px] bg-[#FBE5E5] p-[10px] rounded-[5px] cursor-pointer items-center'}
                 onClick={deleteData}
            >
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить</span>
            </div>
        </div>
    );
};

