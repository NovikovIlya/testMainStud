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
import { useGetRoleQuery } from '../../store/api/serviceApi'

const studentKeys = [
    'Schedule',
    'ElectronicBook',
    'Session',
    'Dormitory',
    'myPractices',
    'EducationalCourses',
    'PsychologicalHelp',
    'News',
    'DocumentFlow',
    'VirtualAudience',
    'DigitalDepartments',
    'ManagementScientificProjects',
    'Testing',

];

const employeeKeys = [
    'Practices', // Проверка isSuccessCheck будет выполнена отдельно
    'practiceTeacher',
    'Staff',
    'Vacancies',
    'News'
];

const DropDrag = () => {
	const user = useAppSelector(state => state.auth.user)
	const dispatch = useDispatch()
	const layout = block
	const edit = useAppSelector(state => state.auth.edit)
	const {data:dataCheck,isSuccess:isSuccessCheck, isLoading:isLoadingCheck} = useCheckIsEmployeeQuery()
	const {data:dataGetInfoSubrole,isLoading:isLoadingGetInfoSubrole,isSuccess:isSuccessGetInfoSubrole} = useGetInfoUserQuery()
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [mounted, setMounted] = useState(false)
	const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({lg: []})
	const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);
	const [mainRole] = useLocalStorageState<any>('typeAcc',{  defaultValue: 'STUD',},);
	const {data:dataSubRole,isSuccess:isSuccessSubRole,isLoading:isLoadingSubRole} = useGetRoleQuery(null)
	const [subRole, setSubrole] = useLocalStorageState<any>('subRole',{  defaultValue: ''});
	const [windowSize, setWindowSize] = useState(getWindowSize())

	// получение саброли
	useEffect(()=>{
		if(isSuccessSubRole){
			if(mainRole ==='OTHER'){
			console.log('dataSubRole',dataSubRole)
			setSubrole(dataSubRole ? dataSubRole[0].role : '')
			
			}
		}
	},[isSuccessSubRole,dataSubRole])

	useEffect(() => {
		setMounted(true)
	}, [])

	// useEffect(() => {
	// 	localStorage.setItem('dashboard', JSON.stringify(layout))
	// 	return () => {}
	// }, [layout])

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
			if(mainRole==='STUD'){
				return studentKeys.includes(item.key);

				
			}else if(mainRole==='EMPL'){
				// отображаем Практики для деканата в зависимости от contract
				return ((item.key === 'Practices' && isSuccessCheck) 
				|| employeeKeys.includes(item.key))
			}else{
				return <>Такой роли нет</>
			}
		})
		// .some(obj2 => obj1.i === obj2.key)
	)

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
							.filter(el => el.key === item.i)[0].element
					}
				</div>
			</div>
		)
		})
		.filter((item)=>{
			if(mainRole==='STUD'){
				return studentKeys.includes(item?.key ? item?.key : '');
			}else if(mainRole==='EMPL'){
				return ((item.key === 'Practices' && isSuccessCheck) || employeeKeys.includes(item?.key ? item?.key : ''))
			}else{
				return <>Такой роли не найдено</>
			}
	})
	

	const renderContent = () => {
		if (mainRole === 'ABITUR' || (mainRole === 'OTHER' && subRole==='ABIT') ) {
		  if(isLoadingGetInfoSubrole || isLoadingSubRole) return <><Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/></>
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
			if(isLoadingSubRole) return <><Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/></>
			
			if(subRole==='SCHOOL'){
				return(
					<>
						<Row>
							<Col span={8}>
							<AboutUniversityCard />
							</Col>
						</Row>
					</>
				)
			}
			
			if(subRole==='ATTEND' || subRole==='GUEST'){
				return(
					<>
						<Row>
							<Col span={8}>
							<AboutUniversityCard />
							</Col>
						</Row>
					</>
				)
			}
			if(subRole==='SEEKER'){
				return(
					<>
						<Row>
							<Col span={8}>
							<AboutUniversityCard />
							</Col>
						</Row>
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
