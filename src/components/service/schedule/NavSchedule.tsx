import { useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'


import CalendarSvg from '../../../assets/svg/CalendarSvg'
import { Header } from '../../layout/Header'
import { Schedule } from './Schedule'
import { Menu } from 'antd'

const navList = [
  {
    id: '/services/schedule/schedule',
    icon: <CalendarSvg />,
    name: 'Мое расписание'
  }
]

export const NavSchedule = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigate = (url: string) => {
    navigate(url)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleList = navList.map(({ icon, name, id }, index) => {
    return (
      <li
        key={index}
        className={clsx(
          'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer transition-colors duration-200',
          id === pathname && 'bg-[#F5F8FB]'
        )}
        onClick={() => handleNavigate(id)}
      >
        <div className="flex items-center gap-[10px]">
          <div className="w-5 h-5">{icon}</div>
          <p className="text-base">{name}</p>
        </div>
      </li>
    )
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="service" service={t('ScheduleService')} />

      <div className="flex flex-col md:flex-row w-full mt-20">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-24 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200 border-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
        	 {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar Navigation */}
        {/* <div
          className={clsx(
            'fixed md:relative z-40 bg-white transition-all duration-300 ease-in-out',
            'w-[230px] h-[calc(100vh-80px)]',
            'shadow-lg md:shadow-none',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          )}
        >
          <ul className="pt-14 flex flex-col gap-4">{handleList}</ul>
        </div> */}

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="bg-[#F5F8FB] w-full min-h-[calc(100vh-80px)] p-4 md:p-6 ">
          {pathname === navList[0].id && <Schedule />}
        </div>
      </div>
    </div>
  )
}