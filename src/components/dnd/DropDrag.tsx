import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useDispatch } from 'react-redux'
import 'react-resizable/css/styles.css'

import { useAppSelector } from '../../store'
import { changeLayout, removeCard } from '../../store/reducers/LayoutsSlice'

import { jsxElements } from './defaultElement'
import { Apply } from '../apply/Apply'
import { AboutUniversityCard } from '../aboutUniversity/AboutUniversityCard'
import { Button, Col, Row, Spin } from 'antd'
import { useLocalStorageState } from 'ahooks'
import { block } from './constant'
import { Link } from 'react-router-dom'
import { useCheckIsEmployeeQuery } from '../../store/api/practiceApi/contracts'
import { useGetInfoUserQuery } from '../../store/api/formApi'


const DropDrag = () => {
	const user = useAppSelector(state => state.auth.user)
	const dispatch = useDispatch()
	const layout = block
	const mainRole = user?.roles[0].type
	// const subRole = useAppSelector(state => state.auth.subRole)
	const edit = useAppSelector(state => state.auth.edit)
	const {data:dataCheck,isSuccess:isSuccessCheck, isLoading:isLoadingCheck} = useCheckIsEmployeeQuery()
	const {data:dataGetInfoSubrole,isLoading:isLoadingGetInfoSubrole,isSuccess:isSuccessGetInfoSubrole} = useGetInfoUserQuery()
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [mounted, setMounted] = useState(false)
	const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({lg: []})
	const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);
	const [message, setMessage] = useLocalStorageState<any>(
		'typeAcc',
		{
		  defaultValue: 'STUD',
		},
	);
	const [subRole, setSubrole] = useLocalStorageState<any>('subRole',{  defaultValue: ''});
	const [windowSize, setWindowSize] = useState(getWindowSize())
	
	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		localStorage.setItem('dashboard', JSON.stringify(layout))
		return () => {}
	}, [layout])

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize())
		}

		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	const onBreakpointChange = (breakpoint: any) => {
		setCurrentBreakpoint(breakpoint)
		setToolbox({
			...toolbox,
			[breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
		})
	}

	const onLayoutChange = (layout: any, layouts: any) => {
		dispatch(changeLayout(layouts))
	}


	const layoutValid = layout.lg.filter(obj1 =>jsxElements
		.filter((item)=>{
			if(message==='STUD'){
				return item.index==='Schedule' ||
					   item.index==='ElectronicBook' ||
					   item.index==='Session' ||
					   item.index==='Dormitory' ||
					   item.index==='myPractices' ||
					   item.index==='EducationalCourses' ||
					   item.index==='PsychologicalHelp' ||
					   item.index==='News' ||
					   item.index==='DocumentFlow' ||
					   item.index==='VirtualAudience' ||
					   item.index==='DigitalDepartments' ||
					   item.index==='ManagementScientificProjects' 
	
	
			}if(message==='EMPL'){
				console.log('item',item)
				return item.index==='Schedule' ||
					   item.index==='Practices' ||
					   item.index==='practiceTeacher' ||
					   item.index==='Staff' ||
					   item.index==='Vacancies' ||
					   item.index==='News' 
			}
		})
		.some(obj2 => obj1.i === obj2.index))

	const generateDOM = layoutValid
		.map(item => {
			return (
			<div
				key={item.i}
				className="bg-white/70 backdrop-blur-sm rounded-[20px] shadow-md "
			>
				<div className="w-full h-full">
					{/* {edit && item.i !== 'Schedule' && (
						<div
							className="absolute top-2 cursor-pointer right-2"
							onClick={() => onRemoveItem(item.i)}
						>
							<DeleteOutlined className=" mt-2 mr-2 opacity-50" />
						</div>
					)} */}
					{
						jsxElements
							.filter(el => el.index === item.i)[0].element
					}
				</div>
			</div>
		)
		})
		.filter((item)=>{
			if(message==='STUD'){
				return  item.key==='Schedule' ||
						item.key==='ElectronicBook' ||
						item.key==='Session' ||
						item.key==='Dormitory' ||
						item.key==='myPractices' ||
						item.key==='EducationalCourses' ||
						item.key==='PsychologicalHelp' ||
						item.key==='News' ||
						item.key==='DocumentFlow' ||
						item.key==='VirtualAudience' ||
						item.key==='DigitalDepartments' ||
						item.key==='ManagementScientificProjects' 


			}else if(message==='EMPL'){
				return  item.key==='Schedule' ||
						(item.key==='Practices' && isSuccessCheck)||
						item.key==='practiceTeacher' ||
						item.key==='Staff' ||
						item.key==='Vacancies' ||
						item.key==='News' 
			}else{
				return <>Такой роли не найдено</>
			}
	})
	

	const renderContent = () => {
		if (mainRole === 'ABITUR' || (mainRole === 'OTHER' && subRole==='ABIT')) {
		  if(isLoadingGetInfoSubrole) return <><Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/></>
		  return (
			<>
			  <Apply />
			  <Row>
				<Col span={8}>
				  <AboutUniversityCard />
				</Col>
			  </Row>
			</>
		  );
		}
		if(mainRole === 'OTHER'){
			if(isLoadingGetInfoSubrole) return <><Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/></>
			
			if(subRole==='SCHOOL'){
				return(
					<>
						<span>Я ШКОЛЬНИК</span>
					</>
				)
			}
			if(subRole==='GUEST'){
				return(
					<>
						<span>Я Гость</span>
					</>
				)
			}
			if(subRole==='ATTEND'){
				return(
					<>
						<span>Я слушатель</span>
					</>
				)
			}
			if(subRole==='SEEKER'){
				return(
					<>
						<span>Я соискатель</span>
					</>
				)
			}
			if(subRole===''){
				return(
					<>
						<Link to='/infoUser'><Button>Вернуться к выбору роли</Button></Link>
					</>
				)
			}
		}
		

		if(isLoadingCheck)return <><Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/></>

		return (
		
		  <ResponsiveReactGridLayout
			className="layout"
			cols={{ lg: 3, md: 2, sm: 2, xs: 2, xxs: 1 }}
			rowHeight={windowSize.innerWidth < 768 ? 210 : 320}
			containerPadding={[0, 0]}
			margin={[20, 20]}
			layouts={layout}
			measureBeforeMount={true}
			useCSSTransforms={mounted}
			onLayoutChange={onLayoutChange}
			onBreakpointChange={onBreakpointChange}
			isDraggable={edit}
			isResizable={false}
			compactType="vertical"
			verticalCompact={true}
			preventCollision={true}
		  >
			{generateDOM}
		  </ResponsiveReactGridLayout>
		
		);
	};

	return (
		<div className="mt-[40px] w-[min(1600px, 100%)] mb-[100px]">
			{renderContent()}
	    </div>
	)
}

function getWindowSize() {
	const { innerWidth, innerHeight } = window
	return { innerWidth, innerHeight }
}

export default DropDrag
