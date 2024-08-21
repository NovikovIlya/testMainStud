import {
  Col, Modal,
  Row,
  Select, Spin, Table,
  Typography
} from 'antd'

import {
  FilterType
} from '../../../../models/representation'

import { EditableCell } from './EditableCell'
import { useGetPracticesAllQuery, useGetSubdivisionForPracticeQuery } from '../../../../store/api/practiceApi/individualTask'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetAllSubmissionsQuery } from '../../../../store/api/practiceApi/representation'
import { useGetSpecialtyNamesForPractiseQuery } from '../../../../store/api/practiceApi/roster'
import { findSubdivisions } from '../../../../utils/findSubdivisions'
import { useEffect, useState } from 'react'
import { processingOfDivisions } from '../../../../utils/processingOfDivisions'
import { findSubdivisionsExport } from '../../../../utils/findSubdivisionsExport'

const filterSpecialization: FilterType[] = [
	{
		value: 'Все',
		label: 'Все'
	},
	{
		value: '1',
		label: '1'
	},
	{
		value: '2',
		label: '2'
	},
	{
		value: '3',
		label: '3'
	},
	{
		value: '4',
		label: '4'
	},
	{
		value: '5',
		label: '5'
	},
	{
		value: '6',
		label: '6'
	}
]

const PracticeModal = ({selectedPractice,isModalOpenOne,handleOkOne,handleCancelOne,handleRowClick,tableRef}: any) => {
	const [subdivisionId, setSubdivisionId] = useState(null)
	const {data:dataAllSubmissions} = useGetAllSubmissionsQuery(selectedPractice,{skip:!selectedPractice})
	const {data:dataAllPractise,isLoading} = useGetPracticesAllQuery(null)
	const {data:dataAllSubdivision} = useGetSubdivisionForPracticeQuery()
	const {data:dataAllSpecialty} = useGetSpecialtyNamesForPractiseQuery(subdivisionId,{skip:!subdivisionId})
	const [tableData, setTableData] = useState<any>(dataAllPractise)
	const [filter, setFilter] = useState<any>({
		type: '',
		spec: '',
		courseNumber: 'Все',
		level: 'Все',
		form: '',
		dateFilling: 'По дате (сначала новые)',
		selectKind: 'Все',
		specialtyName: 'Все',
		subdivision: 'Все',
		academicYear: 'Все',
		groupNumber: 'Все'
	})
 	const columnsRepresentation = [
	{
		key: 'subdivision',
		dataIndex: 'subdivision',
		title: 'Подразделение',
		name: 'Подразделение',
		className: 'text-xs !p-2',
		// ...getColumnSearchProps('name')
	},
	{
		key: 'specialtyName',
		dataIndex: 'specialtyName',
		title: 'Шифр и иаименование документа',
		name: 'Шифр и иаименование документа',
		className: 'text-xs !p-2',
		// ...getColumnSearchProps('name')
	},
	{
		key: 'academicYear',
		dataIndex: 'academicYear',
		title: 'Учебный год',
		className: 'text-xs !p-2'
	},

	{
		key: 'groupNumber',
		dataIndex: 'groupNumber',
		title: 'Номер группы',
		className: 'text-xs !p-2'
	},
	// {
	// 	key: 'level',
	// 	dataIndex: 'level',
	// 	title: 'Уровень образования',
	// 	className: 'text-xs !p-2',
	// 	editable: true
	// },
	{
		key: 'course',
		dataIndex: 'courseNumber',
		title: 'Курс',
		className: 'text-xs !p-2',
		editable: true
	}

	// {
	//   title: '',
	//   key: 'action',
	//   render: (_:any, record:any) => (
	//     <Space size="middle">
	//       <Button onClick={()=>hanldeSelectedPractise(record.id)}>Выбрать </Button>
	//     </Space>
	//   ),
	// },
	]
	function filterDataFull() {
		function filterCourse(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.courseNumber === filter.courseNumber
			}
		}
	function filterSubdivision(elem: any) {
			console.log('filter.subdivision',filter.subdivision)
			console.log('elem.subdivision',elem.subdivision)
			console.log('filter.subdivision.spli',filter.subdivision.split(' - ')[1])
			if (filter.subdivision === 'Все') {
				return elem
			} else {
				const x = filter.subdivision.includes(' - ') ? filter.subdivision.split(' - ')[1] : filter.subdivision
				return elem.subdivision === x
			}
		}
		function filterKind(elem: any) {
			if (filter.selectKind === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.selectKind === filter.selectKind
			}
		}
	function filterAcademicYeary(elem: any) {
			if (filter.academicYear === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.academicYear === filter.academicYear
			}
		}
	function filterNumber(elem: any) {
			if (filter.groupNumber === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.groupNumber === filter.groupNumber
			}
		}
		function filterspecialtyName(elem: any) {
			if (filter.specialtyName === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.specialtyName === filter.specialtyName
			}
		}
	function filtersLevel(elem: any) {
			if (filter.level === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.level === filter.level
			}
		}

		function sortDateFilling(a: any, b: any) {
			if (filter.dateFilling === 'По дате (сначала новые)') {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === 'По дате (сначала старые)') {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}

		return dataAllPractise
			? dataAllPractise
					.filter((elem: any) => filterSubdivision(elem))
					.filter((elem: any) => filterCourse(elem))
					.filter((elem: any) => filterspecialtyName(elem))
		 
			: []
	}
	// useEffect(() => {
	// 	function filterDataFull() {
	// 		function filterCourse(elem: any) {
	// 			if (filter.courseNumber === 'Все') {
	// 				return elem
	// 			} else {
	// 				return elem.courseNumber === filter.courseNumber
	// 			}
	// 		}
	// 	function filterSubdivision(elem: any) {
	// 			if (filter.courseNumber === 'Все') {
	// 				return elem
	// 			} else {
	// 				return elem.courseNumber === filter.courseNumber
	// 			}
	// 		}
	// 		function filterKind(elem: any) {
	// 			if (filter.selectKind === 'Все') {
	// 				return elem
	// 			} else {
	// 				// @ts-ignore
	// 				return elem.selectKind === filter.selectKind
	// 			}
	// 		}
	// 	function filterAcademicYeary(elem: any) {
	// 			if (filter.academicYear === 'Все') {
	// 				return elem
	// 			} else {
	// 				// @ts-ignore
	// 				return elem.academicYear === filter.academicYear
	// 			}
	// 		}
	// 	function filterNumber(elem: any) {
	// 			if (filter.groupNumber === 'Все') {
	// 				return elem
	// 			} else {
	// 				// @ts-ignore
	// 				return elem.groupNumber === filter.groupNumber
	// 			}
	// 		}
	// 		function filterspecialtyName(elem: any) {
	// 			if (filter.specialtyName === 'Все') {
	// 				return elem
	// 			} else {
	// 				// @ts-ignore
	// 				return elem.specialtyName === filter.specialtyName
	// 			}
	// 		}
	// 	function filtersLevel(elem: any) {
	// 			if (filter.level === 'Все') {
	// 				return elem
	// 			} else {
	// 				// @ts-ignore
	// 				return elem.level === filter.level
	// 			}
	// 		}
	
	// 		function sortDateFilling(a: any, b: any) {
	// 			if (filter.dateFilling === 'По дате (сначала новые)') {
	// 				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
	// 			}
	// 			if (filter.dateFilling === 'По дате (сначала старые)') {
	// 				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
	// 			}
	// 			return 0
	// 		}
	
	// 		return dataAllPractise
	// 			? dataAllPractise
	// 					.filter((elem: any) => filterSubdivision(elem))
	// 					.filter((elem: any) => filterCourse(elem))
	// 					.filter((elem: any) => filterspecialtyName(elem))
			 
	// 			: []
	// 	}
	// 	// if (isSuccessPractiseAll) {
	// 	setTableData(filterDataFull())
		
	// 	// @ts-ignore

	// 	// }
	// }, [dataAllPractise, filter])
	console.log('tableData',tableData)
	const filteredData = filterDataFull()?.filter((record: any) => {
		return record.id !== selectedPractice
	});

	console.log('filteredData',filteredData)

  	return (
		<Modal
			footer={null}
			width={'100%'}
			title="Выберите практику"
			open={isModalOpenOne}
			onOk={handleOkOne}
			onCancel={handleCancelOne}
		>
			<Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Подразделение</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={dataAllSubdivision?.length > 0 ? processingOfDivisions(dataAllSubdivision) : []}
						onChange={value => {
							const x = findSubdivisionsExport((dataAllSubdivision), value )
							if('responses' in x){
								setSubdivisionId(x.responses[0].id)
							}else{setSubdivisionId(x.id)}
							
						
							setFilter({
								...filter,
								subdivision: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Шифр и наимеование документа</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						disabled={!subdivisionId}
						showSearch
						optionFilterProp="label"
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								// @ts-ignore
								.toLowerCase()
								// @ts-ignore
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={dataAllSpecialty}
						onChange={value => {
							setFilter({
								...filter,
								specialtyName: value
							})
						}}
					/>
				</Col>
			</Row>

			{/* <Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Учебный год</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								academicYear: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Номер группы</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								groupNumber: value
							})
						}}
					/>
				</Col>
			</Row> */}
			{/* <Row gutter={[8, 16]} className="mt-4  w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Уровень образования</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								level: value
							})
						}}
					/>
				</Col>
			</Row> */}
			<Row gutter={[8, 16]} className="mt-4 mb-12 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Курс</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						disabled={!subdivisionId}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								courseNumber: value
							})
						}}
					/>
				</Col>
			</Row>
			{isLoading ? <Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/> : 
			<Table
				onRow={record => ({
					onClick: () => handleRowClick(record)
				})}
				ref={tableRef}
				components={{
					body: {
						cell: EditableCell
					}
				}}
				bordered
				dataSource={filteredData}
				columns={columnsRepresentation}
				// rowClassName={record => selectedPractice===record.key ? "hide" : ''}
				pagination={dataAllPractise?.length < 5 ? false : {
					pageSize: 3,
				}}
				rowKey="id"
			/>}
		</Modal>
	)
}

export default PracticeModal
