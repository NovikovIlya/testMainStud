import React from 'react';
import {SearchInputIconSvg} from "../../../../../assets/svg/SearchInputIconSvg";
import {TestResultItem} from "./TestResultItem";
import {useGetTestResultsQuery} from "../../../../../store/api/serviceApi";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export const TestResults = () => {

    const { data: test_result_data = [], isLoading : loading } = useGetTestResultsQuery({signed : false});

    console.log(test_result_data)

    if (loading) {
        return (
            <>
                <div className="w-full h-full flex items-center">
                    <div className="text-center ml-auto mr-auto">
                        <Spin
                            indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
                        ></Spin>
                        <p className="font-content-font font-normal text-black text-[18px]/[18px]">
                            Идёт загрузка...
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-full px-[53px] pt-[140px] flex flex-col">
                <h2 className="text-[28px] text-black font-normal">Результаты тестов</h2>
                <label className="relative mt-[52px] flex flex-row>">
                    <div className="absolute left-[16px] top-[7px] cursor-pointer">
                        <SearchInputIconSvg/>
                    </div>
                    <input type="text"
                           className="text-[16px] focus:outline-0 h-[32px] w-[500px] border-[#0000001A] border-[1px] pl-[46px] px-[17px] rounded-[5px]"
                           placeholder="Поиск по ФИО"
                    />
                </label>
                <div>
                    <div className=" flex flex-row mt-[42px]">
                        <div className="ml-[1.5%] w-[62%] flex flex-row">
                            <span className="w-[38%] text-[14px] text-[#626364] font-normal">Соискатель</span>
                            <span className="w-[54%] text-[14px] text-[#626364] font-normal">Должность</span>
                            <span className="w-[8%] text-[14px] text-[#626364] font-normal">Результат</span>
                        </div>
                        <div className="w-[36.5%]"></div>
                    </div>
                    <div className="mt-[16px] gap-[12px] flex flex-col">
                        {test_result_data.map(item => (
                            <TestResultItem {...item} key={item.id}></TestResultItem>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};