import React from 'react';
import {Load} from "../../../../../assets/svg/Load";
import {Doc} from "../../../../../assets/svg/Doc";
import {DeleteRedSvg} from "../../../../../assets/svg/DeleteRedSvg";
import {ColumnsTableCompressedView} from "./RegisterContracts";
import {utils, writeFileXLSX} from "xlsx";

interface Props {
    record: ColumnsTableCompressedView
}
export const PopoverContent = ({record}: Props) => {



    function downLoad() {
        const dataInRussia = {
            "Наименование организации": record.contractFacility,
            "Дата заполнения": record.dateFiling,
            "Тип договора": record.contractType,
            "Дата заключения договора": record.dateConclusionContract,
        }
        const ws = utils.json_to_sheet([dataInRussia]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "File.xlsx");
    }

    return (
        <div className={'flex flex-col gap-2 '}>
            <div className={'flex gap-2 w-[178px] bg-[#E9EFF8] p-[10px] rounded-[5px] cursor-pointer items-center'}>
                <Doc/>
                <span>Режим просмотра</span>
            </div>
            <div className={'flex gap-2 w-[178px] bg-[#D7E2F2] p-[10px] rounded-[5px] cursor-pointer items-center'}
                 onClick={downLoad}
            >
                <Load/>
                <span>Скачать выбранное</span>
            </div>
            <div className={'flex gap-2 w-[178px] bg-[#FBE5E5] p-[10px] rounded-[5px] cursor-pointer items-center'}>
                <DeleteRedSvg/>
                <span className={'text-[#E04545]'}>Удалить</span>
            </div>
        </div>
    );
};

