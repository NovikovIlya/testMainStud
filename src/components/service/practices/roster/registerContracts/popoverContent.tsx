import React from 'react';
import {Load} from "../../../../../assets/svg/Load";
import {Doc} from "../../../../../assets/svg/Doc";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";
import {ColumnsTableCompressedView, ColumnsTableFull} from "./RegisterContracts";
import {utils, writeFileXLSX} from "xlsx";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

interface Props {
    recordCompressed?: ColumnsTableCompressedView
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

    function downLoad() {
        function translateColumnIntoRussia() {
            if (recordCompressed) {
                return {
                    "Наименование организации": recordCompressed.contractFacility,
                    "Дата заполнения": recordCompressed.dateFiling,
                    "Тип договора": recordCompressed.contractType,
                    "Дата заключения договора": dayjs(recordCompressed.dateConclusionContract).format('DD.MM.YYYY'),
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
                    "Ссылки": recordFull.links,
                }
            }

        }

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
                <span>Скачать выбранное</span>
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

