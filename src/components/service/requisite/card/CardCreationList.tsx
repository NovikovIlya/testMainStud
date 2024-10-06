import { useGetPersonnelStagesQuery } from '../../../../store/api/serviceApi'
import { CardCreationListItem } from './CardCreationListItem'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'


export const CardCreationList = () => {

	const { data: card_creation_list = [], isLoading : loading } = useGetPersonnelStagesQuery();

	const ColumnFieldHeaderComponent = () => {
		return (
			<div className="flex flex-row mt-[40px]">
				<span className="ml-[1.5%] w-[38.5%] text-[14px] text-[#626364] font-normal">Соискатель</span>
				<span className="w-[20%] mr-[20%] text-[14px] text-[#626364] font-normal">Должность</span>
				<div className="w-[20%]"></div>
			</div>
		)
	}
	const ContentComponent = () => {
		return(
			<div className="flex flex-col mt-[16px] pb-[50px] gap-[12px]">
				{card_creation_list.map(item => (
					<CardCreationListItem {...item} key={item.respondId}></CardCreationListItem>
				))}
			</div>
		)
	}
	if (loading) {
		return (
			<>
				<div className="w-screen h-screen flex items-center">
					<div className="text-center ml-auto mt-[0%] mr-[50%]">
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
		<div id="wrapper" className="flex flex-col bg-[#F5F8FB] px-[53px] pt-[120px] w-full">
			<h1 className="text-[28px] font-normal text-[#000000]">Заявки на создание карт</h1>
			<ColumnFieldHeaderComponent></ColumnFieldHeaderComponent>
			<ContentComponent></ContentComponent>
		</div>
	)
}