import type { MenuProps } from 'antd'
import { Button, Menu, Tour } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PracticesSvg } from '../../../assets/svg/PracticesSvg'
import './Practices.sass'
import { Tasks } from './individual-tasks/Tasks'
import { Practical } from './practical/Practical'
import { Roster } from './roster/Roster'
import { Schedule } from './forming-schedule/Schedule'
import { Header } from '../../layout/Header'
import { useTranslation } from 'react-i18next'
import { Representation } from './Representation/Representation'
import { PracticeOrder } from './practice-order/PracticeOrder'
import { Appendix } from './appendix/Appendix'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Finally } from './finally/Finally'
import useWindowOrientation from '../../../utils/hooks/useDeviceOrientation'
import { isMobileDevice } from '../../../utils/hooks/useIsMobile'

type MenuItem = Required<MenuProps>['items'][number]

const rootSubmenuKeys = ['sub1', 'sub2', 'sub22']

export const NavPractices = () => {
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const [current, setCurrent] = useState('registerContracts')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const ref1 = useRef<HTMLButtonElement | null>(null)
  const ref2 = useRef<HTMLButtonElement | null>(null)
  const ref3 = useRef<HTMLButtonElement | null>(null)

  const refArray: any = [ref1, ref2, ref3]
  const [open, setOpen] = useState<boolean>(false)
  const orientation = useWindowOrientation()
  const isMobile = false

  const items: any = [
    {
      key: 'sub1',
      label: t('spravochnik'),
      icon: <PracticesSvg />,
      children: [
        { key: 'registerContracts', label: t('registerContracts') },
        { key: 'individualTasks', label: t('individualTasks') },
        { key: 'practical.ts', label: t('practical.ts') }
      ]
    },
    {
      key: 'sub2',
      label: t('formingDocuments'),
      icon: <PracticesSvg />,
      children: [
        { key: 'formingSchedule', label: t('formingSchedule') },
        { key: 'representation', label: t('representation') },
        { key: 'practiceOrder', label: t('practiceOrder') },
        { key: 'appendix', label: t('appendix') }
      ]
    },
    {
      key: 'sub22',
      label: t('finalCheck'),
      icon: <PracticesSvg />,
      children: [{ key: 'finally', label: t('finally') }]
    },
    // {
    //   key: 'sub3',
    //   label: (
    //     <Button
    //       className='opacity-70 mt-1 items-center'
    //       onClick={() => {
    //         if (!ref1.current?.closest('li')?.classList.contains('ant-menu-submenu-open')) {
    //           ref1.current?.click()
    //         }
    //         if (!ref2.current?.closest('li')?.classList.contains('ant-menu-submenu-open')) {
    //           ref2.current?.click()
    //         }
    //         if (!ref3.current?.closest('li')?.classList.contains('ant-menu-submenu-open')) {
    //           ref3.current?.click()
    //         }
    //         setOpen(true)
    //       }}
    //     >
    //       {t('takeTutorial')}
    //     </Button>
    //   ),
    //   icon: <QuestionCircleOutlined className='invisible absolute top-1/2 -translate-y-1/2 right-4' />
    // }
  ]

  const steps: any = [
    {
      title: '',
      description: t('moduleDescription'),
      cover: (
        <img
          style={{ width: '300px', height: '200px' }}
          alt="tour.png"
          src="https://govoritnotariat.com/upload/iblock/a4f/a4f8276b6d077d137da443ba27faa3dc.jpg"
        />
      )
    },
    {
      title: t('spravochnik'),
      description: t('spravochnikDescription'),
      cover: (
        <img
          style={{ width: '200px', height: '150px' }}
          alt="tour.png"
          src="https://i.ibb.co/T4MsPmz/c139a117-e447-4b7f-a3d0-0d69da42c23d.png"
        />
      ),
      target: () => ref1.current,
      placement: 'bottom'
    },
    {
      title: t('registerContracts'),
      description: t('registerContractsDescription'),
      target: () => document.querySelectorAll('.ant-menu-item')[0],
      placement: 'right'
    },
    {
      title: t('individualTasks'),
      description: t('individualTasksDescription'),
      target: () => document.querySelectorAll('.ant-menu-item')[1],
      placement: 'right'
    },
    {
      title: t('practical.ts'),
      description: t('practicalDescription'),
      target: () => document.querySelectorAll('.ant-menu-item')[2],
      placement: 'right'
    },
    {
      title: t('formingDocuments'),
      description: t('formingDocumentsDescription'),
      cover: (
        <img
          style={{ width: '200px', height: '150px' }}
          alt="tour.png"
          src="https://i.ibb.co/qNH92GJ/7adcff7c-43a9-4fb1-b426-795d735abaac.png"
        />
      ),
      target: () => ref2.current,
      placement: 'right'
    },
    {
      title: t('formingSchedule'),
      description: t('formingScheduleDescription'),
      target: () => document.querySelectorAll('.ant-menu-item')[3],
      placement: 'right'
    },
    {
      title: t('representation'),
      description: t('representationDescription'),
      target: () => document.querySelectorAll('.ant-menu-item')[4],
      placement: 'right'
    },
    {
      title: t('practiceOrder'),
      description: t('practiceOrderDescription'),
      target: () => document.querySelectorAll('.ant-menu-item')[5],
      placement: 'right'
    },
    {
      title: t('appendix'),
      description: t('appendixDescription'),
      target: () => document.querySelectorAll('.ant-menu-item')[6],
      placement: 'right'
    },
    {
      title: t('finalCheck'),
      description: t('finalCheckDescription'),
      target: () => ref3.current,
      placement: 'right'
    }
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'sub3') {
      return
    }
    navigate('/services/practices/' + e.key)
    setCurrent(e.key)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <>
      <Header type={'service'} service={t('Practices')} />
      <Menu
        defaultOpenKeys={rootSubmenuKeys}
        selectedKeys={[current]}
        defaultActiveFirst
        mode="inline"
        onClick={onClick}
        onOpenChange={onOpenChange}
        className="min-w-[230px] max-w-[230px] flex flex-col gap-7 mt-28"
        items={items.map((item:any, index:any) => ({
          key: item.key,
          icon: item.icon,
          children: item.children,
          label: (
            <div ref={refArray[index]}>
              {item.label}
            </div>
          )
        }))}
      />
      {isMobile && orientation === 'portrait' ? (
        <div className='flex justify-center items-center text-center p-4'>
          {t('rotateDeviceMessage')}
        </div>
      ) : (
        <div className="bg-[#F5F8FB] overflow-hidden min-h-[840px] w-full pt-14 px-14 xl:mt-20 mt-20">
          {current === 'registerContracts' && <Roster />}
          {current === 'individualTasks' && <Tasks />}
          {current === 'practical.ts' && <Practical />}
          {current === 'formingSchedule' && <Schedule />}
          {current === 'representation' && <Representation />}
          {current === 'practiceOrder' && <PracticeOrder />}
          {current === 'appendix' && <Appendix />}
          {current === 'finally' && <Finally />}
          {/* <Tour open={open} onClose={() => setOpen(false)} steps={steps} /> */}
        </div>
      )}
    </>
  )
}