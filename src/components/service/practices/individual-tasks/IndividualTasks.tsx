// import {
//     Button,
//     Col, Popover, Radio,
//     Row,
//     Select,
//     Space,
//     Table,
//     TableColumnsType,
//     Spin
// } from 'antd'
// import {useEffect, useState} from 'react'
// import {useNavigate} from 'react-router-dom'
// import {NameSpecialty, PracticeType, TasksAll} from '../../../../models/Practice'
// import './IndividualTasks.scss'
// import {
//     TitleHeadCell
// } from "../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell";
// import {PointsSvg} from "../../../../assets/svg/PointsSvg";
// import {IndTaskPopoverContent} from "../popover/individualTask/IndTaskPopoverContent";
// import {IndTaskPopoverMain} from "../popover/individualTask/IndTaskPopoverMain";
// import dayjs from "dayjs";
// import {useGetAllTasksQuery, useGetPracticeTypeQuery} from "../../../../store/api/practiceApi/individualTask";
// import {useGetSpecialtyNamesQuery} from "../../../../store/api/practiceApi/roster";
// import {OptionsNameSpecialty} from "../roster/registerContracts/RegisterContracts";
// import { LoadingOutlined } from '@ant-design/icons'
// interface FilterType {
//     value: string
//     label: string,
//     id:any
// }
// export interface CompressedIndividualTask  {
//     id: string
//     key: string
//     specialityName: string
//     practiceType: string
//     dateFilling: string
// }
// export interface FullIndividualTask {
//     id: string
//     key: string
//     specialityName: string
//     practiceType: string
//     dateFilling: string
//     tasks: string[]
// }
// const IndividualTasks = () => {
//     const navigate = useNavigate()
//     const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
//     const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery(null)
//     const [practiceType, setPracticeType] = useState<FilterType[]>()
//     const {data: dataPracticeType, isSuccess: isSuccessPracticeType} = useGetPracticeTypeQuery(null)
//     const {data, isSuccess, isFetching } = useGetAllTasksQuery()
//     const [
//         tableDataCompressed,
//         setTableDataCompressed
//     ] = useState<any>()
//     const [
//         tableDataFull,
//         setTableDataFull
//     ] = useState<FullIndividualTask[]>()
//     const [
//         selectedFieldsCompressed,
//         setSelectedFieldsCompressed
//     ] = useState<CompressedIndividualTask[]>()
//     const [
//         selectedFieldsFull,
//         setSelectedFieldFull
//     ] = useState<FullIndividualTask[]>()
//     const [tableView, setTableView] = useState({
//         compressed: true,
//         full: false
//     })
//     const [filter, setFilter] = useState({
//         practiceType: 'Все',
//         specialityName: 'Все',
//         dateFilling: 'По дате (сначала новые)',
//     })
//     useEffect(() => {
//         if (isSuccessNameSpecialty) {
//             setNameSpecialty(changeListNameSpecialty(dataNameSpecialty))
//         }
//     }, [dataNameSpecialty]);
//     useEffect(() => {
//         if (isSuccessPracticeType) {
//             setPracticeType(changeListPracticeType(dataPracticeType))
//         }
//     }, [dataPracticeType]);
//     function changeListNameSpecialty(list: NameSpecialty[]) {
//         function changeElemNameSpecialty(elem: NameSpecialty) {
//             const newElem: any = {
//                 key:elem.id,
//                 value: elem.value,
//                 label: elem.label,
//             }
//             return newElem
//         }
//         // @ts-ignore
//         const finalList: OptionsNameSpecialty[] = [{value: 'Все', label: 'Все'}]
//         const newList: OptionsNameSpecialty[] = list.map(elem => changeElemNameSpecialty(elem))
//         return finalList.concat(newList)
//     }
//     function changeListDataShort(data: TasksAll) {
//         const newData: CompressedIndividualTask = {
//             id: data.id,
//             key: data.key,
//             specialityName: data.specialityName,
//             practiceType: data.practiceType,
//             dateFilling: data.dateFilling,
//         }
//         return newData
//     }
//     function changeListPracticeType(list: PracticeType[]) {
//         function changeElemPracticeType(elem: PracticeType) {
//             const newElem: any = {
//                 key:elem.id,
//                 value: elem.value,
//                 label: elem.label,
//             }
//             return newElem
//         }
//         // @ts-ignore
//         const finalList: FilterType[] = [{value: 'Все', label: 'Все'}]
//         const newList: FilterType[] = list.map(elem => changeElemPracticeType(elem))
//         return finalList.concat(newList)
//     }
//     function changeListDataAll(data: any) {
//         const newData: any = {
//             id: data.id,
//             key: data.key,
//             specialityName: data.specialityName,
//             practiceType: data.practiceType,
//             dateFilling: data.dateFilling,
//             subdivision: data.subdivisionName,
//             tasks: data.tasks.map((elem:any) => elem.taskDescription)
//         }
//         return newData
//     }
//     function isCompressedTable() {
//         setTableView({
//             compressed: true,
//             full: false
//         })
//     }
//     function isFullTable() {
//         setTableView({
//             compressed: false,
//             full: true
//         })
//     }
//     const optionsSortDate: any = [
//         {value: 'По дате (сначала новые)', label: 'По дате (сначала новые)'},
//         {value: 'По дате (сначала старые)', label: 'По дате (сначала старые)'},
//     ]
//     const columnsCompressed: TableColumnsType<CompressedIndividualTask> = [
//         {
//             title: <TitleHeadCell title={'Шифр и наименование специальности'}/>,
//             dataIndex: 'specialityName',
//             width: '20%',
//             // render: (text, record) =>
//             //     <div className={'flex items-center'}>
//             //         <span className={'underline flex w-[200px]'}>
//             //             {text}
//             //         </span>
//             //         <Button
//             //             type="text"
//             //             icon={<EditSvg/>}
//             //             onClick={() => {
//             //                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
//             //             }}
//             //         />
//             //     </div>
//         },
//         {
//             title: <TitleHeadCell title={'Дата заполнения'}/>,
//             dataIndex: 'dateFilling',
//             width: '20%',
//             render: (text) => dayjs(text).format('DD.MM.YYYY')
//         },
//         {
//             title: <TitleHeadCell title={'Тип практики'}/>,
//             dataIndex: 'practiceType',
//             width: '20%',
//         },
//         {
//             title:
//                 <Popover trigger={'click'}
//                          content={<IndTaskPopoverMain
//                              recordCompressedAll={tableDataCompressed}
//                              recordCompressed={selectedFieldsCompressed}
//                              setRecordCompressed={setTableDataCompressed}
//                          />}
//                 >
//                     <Button
//                     onClick={(e) => { e.stopPropagation()}}
//                         type="text"
//                         className="opacity-50"
//                         icon={<PointsSvg/>}
//                     />
//                 </Popover>,
//             width: 100,
//             align: 'center',
//             render: (record) =>
//                 <Popover
//                     trigger={'click'}
//                     content={<IndTaskPopoverContent recordCompressed={record}
//                                                     tableDataCompressed={tableDataCompressed}
//                                                     setTableDataCompressed={setTableDataCompressed}/>}>
//                     <Button
//                     onClick={(e) => { e.stopPropagation()}}
//                         type="text"
//                         className="opacity-50"
//                         icon={<PointsSvg/>}
//                     />
//                 </Popover>
//         }
//     ]
//     const columnsFull: TableColumnsType<FullIndividualTask> = [
//         {
//             title: <span className={'text-base'}>Подразделение</span>,
//             dataIndex: 'subdivision',
//             width: '20%',
//             // render: (text, record) =>
//             //     <div className={'flex items-center'}>
//             //         <span className={'underline flex w-[200px] font-bold'}>
//             //             {text}
//             //         </span>
//             //         <Button
//             //             type="text"
//             //             icon={<EditSvg/>}
//             //             onClick={() => {
//             //                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
//             //             }}
//             //         />
//             //     </div>
//         },
//         {
//             title: <span className={'text-base'}>Шифр и наименование специальности</span>,
//             dataIndex: 'specialityName',
//             width: '20%',
//             // render: (text, record) =>
//             //     <div className={'flex items-center'}>
//             //         <span className={'underline flex w-[200px] font-bold'}>
//             //             {text}
//             //         </span>
//             //         <Button
//             //             type="text"
//             //             icon={<EditSvg/>}
//             //             onClick={() => {
//             //                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
//             //             }}
//             //         />
//             //     </div>
//         },
//         {
//             title: <span className={'text-base'}>Дата заполнения</span>,
//             dataIndex: 'dateFilling',
//             width: '20%',
//             render: (text) => dayjs(text).format('DD.MM.YYYY')
//             // render: (text, record) =>
//             //     <div className={'flex items-center'}>
//             //         <span className={'underline flex w-[200px] font-bold'}>
//             //             {text}
//             //         </span>
//             //         <Button
//             //             type="text"
//             //             icon={<EditSvg/>}
//             //             onClick={() => {
//             //                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
//             //             }}
//             //         />
//             //     </div>
//         },
//         {
//             title: <span className={'text-base'}>Тип практики</span>,
//             dataIndex: 'practiceType',
//             width: '20%',
//             align: 'left',
//             render: (value) => <span className={''}>{value}</span>
//         },
//         {
//             title: <span className={'text-base'}>Индивидуальные задания</span>,
//             dataIndex: 'tasks',
//             width: '40%',
//             align: 'left',
//             render: (value) => (
//                 <div className={'flex flex-col gap-2'}>
//                     {value.map((elem: string, index: number) => (
//                         <span key={index - 1}>{index + 1}. {elem}</span>
//                     ))}
//                 </div>
//             )
//         },
//         {
//             title:
//                 <Popover trigger={"click"}
//                          content={<IndTaskPopoverMain recordFull={selectedFieldsFull}
//                                                       recordFullAll={tableDataFull}
//                                                       setRecordFull={setTableDataFull}
//                          />}
//                 >
//                     <Button
//                         type="text"
//                         className="opacity-50"
//                         icon={<PointsSvg/>}
//                     />
//                 </Popover>,
//             width: 100,
//             align: 'center',
//             render: (record) =>
//                 <Popover trigger={'click'}
//                          content={<IndTaskPopoverContent recordFull={record}
//                                                          tableDataFull={tableDataFull}
//                                                          setTableDataFull={setTableDataFull}
//                          />}
//                 >
//                     <Button
//                         type="text"
//                         className="opacity-50"
//                         icon={<PointsSvg/>}
//                     />
//                 </Popover>
//         }
//     ]
//     function filterDataCompressed() {
//         function filterPracticeType(elem: CompressedIndividualTask) {
//             if (filter.practiceType === 'Все') {
//                 return elem
//             } else {
//                 return elem.practiceType === filter.practiceType
//             }
//         }
//         function filterNameSpecialty(elem: CompressedIndividualTask) {
//             if (filter.specialityName === 'Все') {
//                 return elem
//             } else {
//                 return elem.specialityName === filter.specialityName
//             }
//         }
//         function sortDateFilling(a: CompressedIndividualTask, b: CompressedIndividualTask) {
//             if (filter.dateFilling === 'По дате (сначала новые)') {
//                 return +new Date(b.dateFilling) - +new Date(a.dateFilling)
//             }
//             if (filter.dateFilling === 'По дате (сначала старые)') {
//                 return +new Date(a.dateFilling) - +new Date(b.dateFilling)
//             }
//             return 0
//         }
//         if (isSuccess) {
//             const dataCompressed: CompressedIndividualTask[] = data.map(elem => changeListDataShort(elem))
//             return dataCompressed
//                 .filter(elem => filterPracticeType(elem))
//                 .filter(elem => filterNameSpecialty(elem))
//                 .sort((a, b) => sortDateFilling(a, b))
//         }
//     }
//     function filterDataFull() {
//         function filterPracticeType(elem: FullIndividualTask) {
//             if (filter.practiceType === 'Все') {
//                 return elem
//             } else {
//                 return elem.practiceType === filter.practiceType
//             }
//         }
//         function filterNameSpecialty(elem: FullIndividualTask) {
//             if (filter.specialityName === 'Все') {
//                 return elem
//             } else {
//                 return elem.specialityName === filter.specialityName
//             }
//         }
//         function sortDateFilling(a: FullIndividualTask, b: FullIndividualTask) {
//             if (filter.dateFilling === 'По дате (сначала новые)') {
//                 return +new Date(b.dateFilling) - +new Date(a.dateFilling)
//             }
//             if (filter.dateFilling === 'По дате (сначала старые)') {
//                 return +new Date(a.dateFilling) - +new Date(b.dateFilling)
//             }
//             return 0
//         }
//         if (isSuccess) {
//             const dataFull: any[] = data.map(elem => changeListDataAll(elem))
//             return dataFull
//                 .filter(elem => filterPracticeType(elem))
//                 .filter(elem => filterNameSpecialty(elem))
//                 .sort((a, b) => sortDateFilling(a, b))
//         }
//     }
//     useEffect(() => {
//         setTableDataCompressed(filterDataCompressed())
//         setTableDataFull(filterDataFull())
//     }, [filter,isSuccess]);
//     // useEffect(() => {
//     //     if (isSuccess) {
//     //         const dataCompressed: CompressedIndividualTask[] = data.map(elem => changeListDataShort(elem))
//     //         setTableDataCompressed(dataCompressed)
//     //         const dataFull: FullIndividualTask[] = data.map(elem => changeListDataAll(elem))
//     //         setTableDataFull(dataFull)
//     //     }
//     // }, [data]);
//     const handleRowClick = (record:any) => {
// 		navigate(`/services/practices/individualTasks/editTask/${record.id}`)
//     };
//     const arraySpec = [
//         { key: 2244612, value: "Все", label: "Все" },
//         ...(data ?
//             data.map((item) => ({
//                 key: item.id,
//                 value: item.specialityName,
//                 label: item.specialityName
//             }))
//         : [])
//     ];
//     const arrayType = [
//         { key: 2244612, value: "Все", label: "Все" },
//         ...(data ?
//             data.map((item) => ({
//                 key: item.id,
//                 value: item.practiceType,
//                 label: item.practiceType
//             }))
//         : [])
//     ];
//     const uniqueSpecialityNames = Array.from(new Set(arraySpec.map(item => item.value)))
//     .map(value => ({ value, label: value }));
//     const uniqueTypes           = Array.from(new Set(arrayType.map(item => item.value)))
//     .map(value => ({ value, label: value }));
//     return (
//         <section className="container animate-fade-in">
//             <Row>
//                 <Col>
// 					<span className="mb-14 text-[28px]">
// 						Индивидуальные задания
// 					</span>
//                 </Col>
//             </Row>
//             <Row gutter={[16, 16]} className="mt-12 overWrite">
//                 <Col span={5} className='overWrite'>
//                     <span>Наименование специальности</span>
//                 </Col>
//                 <Col span={7} className='overWrite'>
//                     <Select
//                         popupMatchSelectWidth={false}
//                         defaultValue="Все"
//                         className="w-full"
//                         style={{ width: '100% !important' }}
//                         options={uniqueSpecialityNames.length > 1 ? uniqueSpecialityNames : []}
//                         onChange={value => {
//                             setFilter({
//                                 ...filter,
//                                 specialityName: value
//                             })
//                         }}
//                     />
//                 </Col>
//                 <Col span={7} offset={5} className='orderHigh overWrite'>
//                     <Space className="w-full flex-row-reverse ">
//                         <Button
//                             type="primary"
//                             className="!rounded-full my-button h-10"
//                             onClick={() => {
//                                 navigate('/services/practices/individualTasks/createTask')
//                             }}
//                         >
//                         </Button>
//                     </Space>
//                 </Col>
//             </Row>
//             <Row gutter={[16, 16]} className="mt-4 overWrite">
//                 <Col span={5} className='overWrite'>
//                     <span>Тип практики</span>
//                 </Col>
//                 <Col span={7} className='overWrite'>
//                     <Select
//                         popupMatchSelectWidth={false}
//                         defaultValue="Все"
//                         className="w-full"
//                         options={uniqueTypes.length > 1 ? uniqueTypes : []}
//                         onChange={value => {
//                             setFilter({
//                                 ...filter,
//                                 practiceType: value
//                             })
//                         }}
//                     />
//                 </Col>
//             </Row>
//             <Row className="mt-12 mb-6 flex items-center">
//                 <Col span={12} flex="50%" className='mobileFirst'>
//                     <Radio.Group defaultValue="compressedView" buttonStyle="solid">
//                         <Radio.Button
//                             onClick={isCompressedTable}
//                             value="compressedView"
//                             className="!rounded-l-full">
//                             Посмотреть в сжатом виде
//                         </Radio.Button>
//                         <Radio.Button
//                             onClick={isFullTable}
//                             value="tableView"
//                             className="!rounded-r-full">
//                             Посмотреть данные в таблице
//                         </Radio.Button>
//                     </Radio.Group>
//                 </Col>
//                 <Col span={8} offset={4} className='mobileFirst'>
//                     <div className={'flex gap-2 items-center'}>
//                         <span className={'mr-2'}>Сортировка</span>
//                         <Select
//                             popupMatchSelectWidth={false}
//                             value={filter.dateFilling}
//                             className="w-full"
//                             options={optionsSortDate}
//                             onChange={value => {
//                                 setFilter({
//                                     ...filter,
//                                     dateFilling: value
//                                 })
//                             }}
//                         />
//                     </div>
//                 </Col>
//             </Row>
//             {!tableDataCompressed || isFetching ? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />  :
//             <>
//             {
//                 tableView.compressed
//                 &&
//                 <div className={'individualTasks mb-4'}>
//                     <Table
//                         onRow={(record) => ({
//                             onClick: (e) => {
//                                 // @ts-ignore
//                                 if (e.target.closest('.ant-table-selection-column')) {
//                                     return
//                                 }
//                                 handleRowClick(record)},
//                         })}
//                         // @ts-ignore
//                         keyExtractor={record => record.id}
//                         columns={columnsCompressed}
//                         dataSource={tableDataCompressed}
//                         pagination={false}
//                         rowClassName={() => 'animate-fade-in'}
//                         rowSelection={{
//                             type: 'checkbox',
//                             onSelect: (record, selected, selectedRows, nativeEvent) => {
//                                 setSelectedFieldsCompressed(selectedRows)
//                             },
//                             onSelectAll: ( selected, selectedRows, changeRows) => {
//                                 setSelectedFieldsCompressed(selectedRows)
//                             }
//                         }}
//                     />
//                 </div>
//             }
//             {
//                 tableView.full
//                 &&
//                 <Table
//                     onRow={(record) => ({
//                         onClick: (e) => {
//                             // @ts-ignore
//                             if (e.target.closest('.ant-table-selection-column')) {
//                                 return
//                             }
//                             handleRowClick(record)},
//                     })}
//                     className={'mt-5 mb-4'}
//                     columns={columnsFull}
//                     dataSource={tableDataFull}
//                     pagination={tableDataFull && tableDataFull?.length<10?false:{
//                         pageSize: 10
//                     }}
//                     rowClassName={() => 'animate-fade-in'}
//                     rowSelection={{
//                         type: 'checkbox',
//                         onSelect: (record, selected, selectedRows, nativeEvent) => {
//                             setSelectedFieldFull(selectedRows)
//                         },
//                         onSelectAll: ( selected, selectedRows, changeRows) => {
//                             setSelectedFieldFull(selectedRows)
//                         }
//                     }}
//                 />
//             }
//             </>}
//         </section>
//     )
// }
// export default IndividualTasks
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Col, ConfigProvider, Popover, Radio, Row, Select, Space, Spin, Table, type TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PointsSvg } from '../../../../assets/svg/PointsSvg'
import type { NameSpecialty, PracticeType, TasksAll } from '../../../../models/Practice'
import { useGetAllTasksQuery, useGetPracticeTypeQuery } from '../../../../store/api/practiceApi/individualTask'
import { useGetSpecialtyNamesQuery } from '../../../../store/api/practiceApi/roster'
import { TitleHeadCell } from '../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell'
import { IndTaskPopoverContent } from '../popover/individualTask/IndTaskPopoverContent'
import { IndTaskPopoverMain } from '../popover/individualTask/IndTaskPopoverMain'
import type { OptionsNameSpecialty } from '../roster/registerContracts/RegisterContracts'

import './IndividualTasks.scss'

interface FilterType {
	value: string
	label: string
	id: any
}

export interface CompressedIndividualTask {
	id: string
	key: string
	specialityName: string
	practiceType: string
	dateFilling: string
}

export interface FullIndividualTask {
	id: string
	key: string
	specialityName: string
	practiceType: string
	dateFilling: string
	tasks: string[]
}

const IndividualTasks = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
	const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesQuery(null)
	const [practiceType, setPracticeType] = useState<FilterType[]>()
	const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetPracticeTypeQuery(null)
	const { data, isSuccess, isFetching } = useGetAllTasksQuery()
	const [tableDataCompressed, setTableDataCompressed] = useState<any>()

	const [tableDataFull, setTableDataFull] = useState<FullIndividualTask[]>()

	const [selectedFieldsCompressed, setSelectedFieldsCompressed] = useState<CompressedIndividualTask[]>()

	const [selectedFieldsFull, setSelectedFieldFull] = useState<FullIndividualTask[]>()

	const [tableView, setTableView] = useState({
		compressed: true,
		full: false
	})
	const [filter, setFilter] = useState({
		practiceType: t('all'),
		specialityName: t('all'),
		dateFilling: t('newestFirst')
	})

	useEffect(() => {
		if (isSuccessNameSpecialty) {
			setNameSpecialty(changeListNameSpecialty(dataNameSpecialty))
		}
	}, [dataNameSpecialty])

	useEffect(() => {
		if (isSuccessPracticeType) {
			setPracticeType(changeListPracticeType(dataPracticeType))
		}
	}, [dataPracticeType])

	function changeListNameSpecialty(list: NameSpecialty[]) {
		function changeElemNameSpecialty(elem: NameSpecialty) {
			const newElem: any = {
				key: elem.id,
				value: elem.value,
				label: elem.label
			}
			return newElem
		}
		// @ts-ignore
		const finalList: OptionsNameSpecialty[] = [{ value: t('all'), label: t('all') }]
		const newList: OptionsNameSpecialty[] = list.map(elem => changeElemNameSpecialty(elem))
		return finalList.concat(newList)
	}

	function changeListDataShort(data: TasksAll) {
		const newData: CompressedIndividualTask = {
			id: data.id,
			key: data.key,
			specialityName: data.specialityName,
			practiceType: data.practiceType,
			dateFilling: data.dateFilling
		}
		return newData
	}

	function changeListPracticeType(list: PracticeType[]) {
		function changeElemPracticeType(elem: PracticeType) {
			const newElem: any = {
				key: elem.id,
				value: elem.value,
				label: elem.label
			}
			return newElem
		}
		// @ts-ignore
		const finalList: FilterType[] = [{ value: t('all'), label: t('all') }]
		const newList: FilterType[] = list.map(elem => changeElemPracticeType(elem))
		return finalList.concat(newList)
	}

	function changeListDataAll(data: any) {
		const newData: any = {
			id: data.id,
			key: data.key,
			specialityName: data.specialityName,
			practiceType: data.practiceType,
			dateFilling: data.dateFilling,
			subdivision: data.subdivisionName,
			tasks: data.tasks.map((elem: any) => elem.taskDescription)
		}
		return newData
	}

	function isCompressedTable() {
		setTableView({
			compressed: true,
			full: false
		})
	}
	function isFullTable() {
		setTableView({
			compressed: false,
			full: true
		})
	}

	const optionsSortDate: any = [
		{ value: t('newestFirst'), label: t('newestFirst') },
		{ value: t('oldestFirst'), label: t('oldestFirst') }
	]
	const columnsCompressed: TableColumnsType<CompressedIndividualTask> = [
		{
			title: <TitleHeadCell title={t('specialityName')} />,
			dataIndex: 'specialityName',
			width: '20%'
			// render: (text, record) =>
			//     <div className={'flex items-center'}>
			//         <span className={'underline flex w-[200px]'}>
			//             {text}
			//         </span>
			//         <Button
			//             type="text"
			//             icon={<EditSvg/>}
			//             onClick={() => {
			//                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
			//             }}
			//         />
			//     </div>
		},
		{
			title: <TitleHeadCell title={t('dateFilling')} />,
			dataIndex: 'dateFilling',
			width: '20%',
			render: text => dayjs(text).format('DD.MM.YYYY')
		},
		{
			title: <TitleHeadCell title={t('practiceType')} />,
			dataIndex: 'practiceType',
			width: '20%'
		},
		{
			title: (
				<Popover
					trigger={'click'}
					content={
						<IndTaskPopoverMain
							recordCompressedAll={tableDataCompressed}
							recordCompressed={selectedFieldsCompressed}
							setRecordCompressed={setTableDataCompressed}
						/>
					}
				>
					<Button
						onClick={e => {
							e.stopPropagation()
						}}
						type="text"
						className="opacity-50"
						icon={<PointsSvg />}
					/>
				</Popover>
			),
			width: 100,
			align: 'center',
			render: record => (
				<Popover
					trigger={'click'}
					content={
						<IndTaskPopoverContent
							recordCompressed={record}
							tableDataCompressed={tableDataCompressed}
							setTableDataCompressed={setTableDataCompressed}
						/>
					}
				>
					<Button
						onClick={e => {
							e.stopPropagation()
						}}
						type="text"
						className="opacity-50"
						icon={<PointsSvg />}
					/>
				</Popover>
			)
		}
	]
	const columnsFull: TableColumnsType<FullIndividualTask> = [
		{
			title: <span className={'text-base'}>{t('subdivision')}</span>,
			dataIndex: 'subdivision',
			width: '20%'
			// render: (text, record) =>
			//     <div className={'flex items-center'}>
			//         <span className={'underline flex w-[200px] font-bold'}>
			//             {text}
			//         </span>
			//         <Button
			//             type="text"
			//             icon={<EditSvg/>}
			//             onClick={() => {
			//                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
			//             }}
			//         />
			//     </div>
		},
		{
			title: <span className={'text-base'}>{t('specialityName')}</span>,
			dataIndex: 'specialityName',
			width: '20%'
			// render: (text, record) =>
			//     <div className={'flex items-center'}>
			//         <span className={'underline flex w-[200px] font-bold'}>
			//             {text}
			//         </span>
			//         <Button
			//             type="text"
			//             icon={<EditSvg/>}
			//             onClick={() => {
			//                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
			//             }}
			//         />
			//     </div>
		},
		{
			title: <span className={'text-base'}>{t('dateFilling')}</span>,
			dataIndex: 'dateFilling',
			width: '20%',
			render: text => dayjs(text).format('DD.MM.YYYY')
			// render: (text, record) =>
			//     <div className={'flex items-center'}>
			//         <span className={'underline flex w-[200px] font-bold'}>
			//             {text}
			//         </span>
			//         <Button
			//             type="text"
			//             icon={<EditSvg/>}
			//             onClick={() => {
			//                 navigate(`/services/practices/individualTasks/editTask/${record.id}`)
			//             }}
			//         />
			//     </div>
		},
		{
			title: <span className={'text-base'}>{t('practiceType')}</span>,
			dataIndex: 'practiceType',
			width: '20%',
			align: 'left',
			render: value => <span className={''}>{value}</span>
		},
		{
			title: <span className={'text-base'}>{t('tasks')}</span>,
			dataIndex: 'tasks',
			width: '40%',
			align: 'left',
			render: value => (
				<div className={'flex flex-col gap-2'}>
					{value.map((elem: string, index: number) => (
						<span key={index - 1}>
							{index + 1}. {elem}
						</span>
					))}
				</div>
			)
		},
		{
			title: (
				<Popover
					trigger={'click'}
					content={
						<IndTaskPopoverMain
							recordFull={selectedFieldsFull}
							recordFullAll={tableDataFull}
							setRecordFull={setTableDataFull}
						/>
					}
				>
					<Button type="text" className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			),
			width: 100,
			align: 'center',
			render: record => (
				<Popover
					trigger={'click'}
					content={
						<IndTaskPopoverContent
							recordFull={record}
							tableDataFull={tableDataFull}
							setTableDataFull={setTableDataFull}
						/>
					}
				>
					<Button type="text" className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			)
		}
	]
	function filterDataCompressed() {
		function filterPracticeType(elem: CompressedIndividualTask) {
			if (filter.practiceType === t('all')) {
				return elem
			} else {
				return elem.practiceType === filter.practiceType
			}
		}
		function filterNameSpecialty(elem: CompressedIndividualTask) {
			if (filter.specialityName === t('all')) {
				return elem
			} else {
				return elem.specialityName === filter.specialityName
			}
		}
		function sortDateFilling(a: CompressedIndividualTask, b: CompressedIndividualTask) {
			if (filter.dateFilling === t('newestFirst')) {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === t('oldestFirst')) {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}

		if (isSuccess) {
			const dataCompressed: CompressedIndividualTask[] = data.map(elem => changeListDataShort(elem))
			return dataCompressed
				.filter(elem => filterPracticeType(elem))
				.filter(elem => filterNameSpecialty(elem))
				.sort((a, b) => sortDateFilling(a, b))
		}
	}
	function filterDataFull() {
		function filterPracticeType(elem: FullIndividualTask) {
			if (filter.practiceType === t('all')) {
				return elem
			} else {
				return elem.practiceType === filter.practiceType
			}
		}
		function filterNameSpecialty(elem: FullIndividualTask) {
			if (filter.specialityName === t('all')) {
				return elem
			} else {
				return elem.specialityName === filter.specialityName
			}
		}
		function sortDateFilling(a: FullIndividualTask, b: FullIndividualTask) {
			if (filter.dateFilling === t('newestFirst')) {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === t('oldestFirst')) {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}

		if (isSuccess) {
			const dataFull: any[] = data.map(elem => changeListDataAll(elem))
			return dataFull
				.filter(elem => filterPracticeType(elem))
				.filter(elem => filterNameSpecialty(elem))
				.sort((a, b) => sortDateFilling(a, b))
		}
	}

	useEffect(() => {
		setTableDataCompressed(filterDataCompressed())
		setTableDataFull(filterDataFull())
	}, [filter, isSuccess])

	// useEffect(() => {
	//     if (isSuccess) {
	//         const dataCompressed: CompressedIndividualTask[] = data.map(elem => changeListDataShort(elem))
	//         setTableDataCompressed(dataCompressed)
	//         const dataFull: FullIndividualTask[] = data.map(elem => changeListDataAll(elem))
	//         setTableDataFull(dataFull)
	//     }
	// }, [data]);

	const handleRowClick = (record: any) => {
		navigate(`/services/practices/individualTasks/editTask/${record.id}`)
	}

	const arraySpec = [
		{ key: 2244612, value: t('all'), label: t('all') },
		...(data
			? data.map(item => ({
					key: item.id,
					value: item.specialityName,
					label: item.specialityName
			  }))
			: [])
	]
	const arrayType = [
		{ key: 2244612, value: t('all'), label: t('all') },
		...(data
			? data.map(item => ({
					key: item.id,
					value: item.practiceType,
					label: item.practiceType
			  }))
			: [])
	]

	const uniqueSpecialityNames = Array.from(new Set(arraySpec.map(item => item.value))).map(value => ({
		value,
		label: value
	}))
	const uniqueTypes = Array.from(new Set(arrayType.map(item => item.value))).map(value => ({ value, label: value }))

	return (
		<section className="container animate-fade-in">
			<Row>
				<Col>
					<span className="mb-14 text-[28px]">{t('individualTasks')}</span>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-12 overWrite">
				<Col span={5} className="overWrite">
					<span>{t('specialityName')}</span>
				</Col>
				<Col span={7} className="overWrite">
					<Select
						popupMatchSelectWidth={false}
						className="w-full"
						style={{ width: '100% !important' }}
						options={uniqueSpecialityNames.length > 1 ? uniqueSpecialityNames : []}
						onChange={value => {
							setFilter({
								...filter,
								specialityName: value
							})
						}}
					/>
				</Col>
				<Col span={7} offset={5} className="orderHigh overWrite">
					<Space className="w-full flex-row-reverse ">
						<Button
							type="primary"
							className="!rounded-full  h-10"
							onClick={() => {
								navigate('/services/practices/individualTasks/createTask')
							}}
						>
							{t('createTask')}
						</Button>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4 overWrite">
				<Col span={5} className="overWrite">
					<span>{t('practiceType')}</span>
				</Col>
				<Col span={7} className="overWrite">
					<Select
						popupMatchSelectWidth={false}
						className="w-full"
						options={uniqueTypes.length > 1 ? uniqueTypes : []}
						onChange={value => {
							setFilter({
								...filter,
								practiceType: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row className="mt-12 mb-6 flex items-center">
				<Col span={12} flex="50%" className="mobileFirst">
					<Radio.Group defaultValue="compressedView" buttonStyle="solid">
						<Radio.Button onClick={isCompressedTable} value="compressedView" className="!rounded-l-full">
							{t('compressedView')}
						</Radio.Button>
						<Radio.Button onClick={isFullTable} value="tableView" className="!rounded-r-full">
							{t('fullView')}
						</Radio.Button>
					</Radio.Group>
				</Col>
				<Col span={8} offset={4} className="mobileFirst">
					<div className={'flex gap-2 items-center'}>
						<span className={'mr-2'}>{t('sortDate')}</span>
						<Select
							popupMatchSelectWidth={false}
							value={filter.dateFilling}
							className="w-full"
							options={optionsSortDate}
							onChange={value => {
								setFilter({
									...filter,
									dateFilling: value
								})
							}}
						/>
					</div>
				</Col>
			</Row>
			{isFetching ? (
				<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
			) : (
				<>
					{tableView.compressed && (
						<div className={'individualTasks mb-4'}>
							<Table
								onRow={record => ({
									onClick: e => {
										// @ts-ignore
										if (e.target.closest('.ant-table-selection-column')) {
											return
										}
										handleRowClick(record)
									}
								})}
								// @ts-ignore
								keyExtractor={record => record.id}
								columns={columnsCompressed}
								dataSource={tableDataCompressed}
								pagination={false}
								rowClassName={() => 'animate-fade-in'}
								rowSelection={{
									type: 'checkbox',
									onSelect: (record, selected, selectedRows, nativeEvent) => {
										setSelectedFieldsCompressed(selectedRows)
									},
									onSelectAll: (selected, selectedRows, changeRows) => {
										setSelectedFieldsCompressed(selectedRows)
									}
								}}
							/>
						</div>
					)}
					{tableView.full && (
						<ConfigProvider
							theme={{
								components: {
									Table: {
										headerBg: 'rgb(218, 231, 251)'
									}
								}
							}}
						>
							<Table
								onRow={record => ({
									onClick: e => {
										// @ts-ignore
										if (e.target.closest('.ant-table-selection-column')) {
											return
										}
										handleRowClick(record)
									}
								})}
								className={'mt-5 mb-4'}
								columns={columnsFull}
								dataSource={tableDataFull}
								pagination={
									tableDataFull && tableDataFull?.length < 10
										? false
										: {
												pageSize: 10
										  }
								}
								rowClassName={() => 'animate-fade-in'}
								rowSelection={{
									type: 'checkbox',
									onSelect: (record, selected, selectedRows, nativeEvent) => {
										setSelectedFieldFull(selectedRows)
									},
									onSelectAll: (selected, selectedRows, changeRows) => {
										setSelectedFieldFull(selectedRows)
									}
								}}
							/>
						</ConfigProvider>
					)}
				</>
			)}
		</section>
	)
}

export default IndividualTasks
